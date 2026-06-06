using CMS.Data;
using CMS.Data.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using System;
using System.IO;
using System.Linq;
using Microsoft.AspNetCore.Authorization;

namespace CMS.Backend.Controllers
{
    [Authorize] // Bắt buộc đăng nhập mới được sờ vào quản lý bài viết
    public class PostController : Controller
    {
        private readonly ApplicationDbContext _context;

        public PostController(ApplicationDbContext context)
        {
            _context = context;
        }

        // ==========================================
        // 1. Hàm GET: Hiển thị danh sách bài viết
        // URL thô: https://localhost:7076/Post
        // ==========================================
        [HttpGet]
        public IActionResult Index(int? id)
        {
            var query = _context.Posts
                                .Include(p => p.Category)
                                .OrderByDescending(p => p.Id); // Sắp xếp bài mới lên đầu

            if (id != null)
            {
                var postsFiltered = query.Where(p => p.CategoryId == id).ToList();
                return View(postsFiltered);
            }

            var allPosts = query.ToList();
            return View(allPosts); // Trả về danh sách bài viết cho Views/Post/Index.cshtml
        }

        // ==========================================
        // 2. Hàm GET: Hiển thị giao diện Form tạo mới
        // URL thô: https://localhost:7076/Post/Create
        // ==========================================
        [HttpGet]
        public IActionResult Create()
        {
            // Bốc danh sách chuyên mục nạp vào ViewBag để ô Chọn (Select) hiển thị tên danh mục
            ViewBag.CategoryList = new SelectList(_context.Categories, "Id", "Name");
            return View();
        }

        // --- HÀM XỬ LÝ TẠO MỚI (POST) ---
        [HttpPost]
        public IActionResult Create(Post model, IFormFile uploadImage)
        {
            // BẪY LỖI 1: Nếu người dùng để trống khung nội dung, tự động gán giá trị mặc định để không lỗi SQL
            if (string.IsNullOrEmpty(model.Content))
            {
                model.Content = "Chưa có nội dung cho bài viết này.";
            }

            // Kiểm tra xem người dùng có bấm chọn file ảnh từ thiết bị không
            if (uploadImage != null && uploadImage.Length > 0)
            {
                // Định nghĩa thư mục lưu ảnh: wwwroot/uploads
                string folder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads");
                if (!Directory.Exists(folder)) Directory.CreateDirectory(folder);

                // Tạo tên file ngẫu nhiên (GUID) để không bao giờ bị trùng, ghi đè tên ảnh
                string fileName = Guid.NewGuid().ToString() + Path.GetExtension(uploadImage.FileName);
                string filePath = Path.Combine(folder, fileName);

                // Lưu trực tiếp file ảnh vật lý vào ổ cứng thư mục wwwroot
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    uploadImage.CopyTo(stream);
                }

                // Gán đường dẫn ảo để lưu vào cột ImageUrl dưới SQL Server
                model.ImageUrl = "/uploads/" + fileName;
            }
            else
            {
                // Nếu không chọn ảnh, gán chuỗi rỗng thay vì NULL để tránh lỗi DB tùy cấu hình
                model.ImageUrl = "";
            }

            _context.Posts.Add(model);
            _context.SaveChanges();
            return RedirectToAction("Index");
        }

        // ==========================================
        // 3. Hàm GET: Tìm dữ liệu cũ đổ lên Form sửa
        // URL thô: https://localhost:7076/Post/Edit/{id}
        // ==========================================
        [HttpGet]
        public IActionResult Edit(int id)
        {
            var post = _context.Posts.Find(id);
            if (post == null) return NotFound();

            // Giữ lại lựa chọn danh mục cũ của bài viết này
            ViewBag.CategoryList = new SelectList(_context.Categories, "Id", "Name", post.CategoryId);
            return View(post);
        }

        // --- HÀM XỬ LÝ CHỈNH SỬA (POST) ---
        [HttpPost]
        public IActionResult Edit(Post model, IFormFile uploadImage)
        {
            // Lấy dữ liệu bài viết hiện tại trong database để đối chiếu
            var oldPostData = _context.Posts.AsNoTracking().FirstOrDefault(p => p.Id == model.Id);

            // BẪY LỖI 2: Nếu ô nhập nội dung sửa bị rỗng (hoặc thiếu trên form)
            if (string.IsNullOrEmpty(model.Content) && oldPostData != null)
            {
                // Khôi phục lại nội dung cũ đã lưu trong database
                model.Content = oldPostData.Content;
            }

            if (uploadImage != null && uploadImage.Length > 0)
            {
                // TRƯỜNG HỢP 1: Người dùng chọn ẢNH MỚI từ thiết bị -> Upload đè lên
                string folder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads");
                if (!Directory.Exists(folder)) Directory.CreateDirectory(folder);

                string fileName = Guid.NewGuid().ToString() + Path.GetExtension(uploadImage.FileName);
                string filePath = Path.Combine(folder, fileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    uploadImage.CopyTo(stream);
                }

                model.ImageUrl = "/uploads/" + fileName; // Lấy đường dẫn ảnh mới
            }
            else
            {
                // TRƯỜNG HỢP 2: Người dùng KHÔNG chọn ảnh mới -> Giữ nguyên ảnh cũ dưới DB
                if (oldPostData != null)
                {
                    model.ImageUrl = oldPostData.ImageUrl; // Đổ lại đường dẫn ảnh cũ vào model
                }
            }

            _context.Posts.Update(model);
            _context.SaveChanges(); // Đã bọc lót an toàn, lưu thành công 100%
            return RedirectToAction("Index");
        }

        // ==========================================
        // 4. Hàm xử lý XÓA bài viết theo ID
        // ==========================================
        [Authorize(Roles = "Admin")] // Chỉ admin mới có nút xóa bài
        public IActionResult Delete(int id)
        {
            var post = _context.Posts.Find(id);
            if (post != null)
            {
                _context.Posts.Remove(post);
                _context.SaveChanges();
            }
            return RedirectToAction("Index");
        }

        // ==========================================
        // 5. Hàm GET: Hiển thị chi tiết bài viết theo ID
        // URL thô: https://localhost:7076/Post/Details/{id}
        // ==========================================
        [HttpGet]
        public IActionResult Details(int id)
        {
            // Lấy bài viết kèm theo thông tin Danh mục của bài viết đó
            var post = _context.Posts
                               .Include(p => p.Category)
                               .FirstOrDefault(p => p.Id == id);

            if (post == null)
            {
                return NotFound(); // Trả về trang 404 nếu không tìm thấy ID bài viết
            }

            return View(post); // Trả về file giao diện Views/Post/Details.cshtml
        }
    }
}