using CMS.Data;
using CMS.Data.Entities;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using Microsoft.AspNetCore.Authorization; // QUAN TRỌNG: Thêm thư viện này để dùng [Authorize]

namespace CMS.Backend.Controllers
{
    [ApiExplorerSettings(IgnoreApi = true)]
    [Authorize] // BẮT BUỘC ĐĂNG NHẬP: Người lạ truy cập vào bất kỳ trang nào trong này sẽ bị đá về Login
    public class CategoryController : Controller
    {
        private readonly ApplicationDbContext _context;

        // "Tiêm" kết nối vào Controller
        public CategoryController(ApplicationDbContext context)
        {
            _context = context;
        }

        // ==========================================
        // Hàm hiển thị danh sách (Index)
        // Đường dẫn: https://localhost:7076/Category
        // ==========================================
        public IActionResult Index()
        {
            // Lấy toàn bộ danh sách danh mục từ SQL Server
            var categories = _context.Categories.ToList();

            // QUAN TRỌNG: Phải truyền biến 'categories' vào View để file Index.cshtml nhận dữ liệu
            return View(categories);
        }

        // 1. Hàm GET: Dùng để hiển thị giao diện Form cho nhập
        [HttpGet]
        public IActionResult Create()
        {
            return View();
        }

        // 2. Hàm POST: Dùng để đón dữ liệu từ Form gửi lên và lưu vào SQL
        [HttpPost]
        public IActionResult Create(Category model)
        {
            if (!ModelState.IsValid)
            {
                return View(model); // Chỉ truyền lại đúng đối tượng đang nhập dở
            }
            _context.Categories.Add(model);
            _context.SaveChanges();
            return RedirectToAction(nameof(Index));
        }
        [Authorize(Roles = "Admin")] // Chỉ tài khoản có Role là "Admin" mới được chạy hàm này
        public IActionResult Delete(int id)
        {
            // Bước 1: Tìm đối tượng danh mục trong Database bằng Id
            var category = _context.Categories.Find(id);

            // Kiểm tra nếu tìm thấy thì mới xóa
            if (category != null)
            {
                // Bước 2: Lệnh xóa khỏi bộ nhớ tạm (Tracking)
                _context.Categories.Remove(category);

                // Bước 3: Chốt phiên làm việc, xóa thực sự trong SQL Server
                _context.SaveChanges();
            }

            // Sau khi xóa xong, quay lại trang danh sách để cập nhật giao diện
            return RedirectToAction("Index");
        }

        // 1. Hàm GET: Tìm đúng 1 danh mục theo ID để đổ lên form sửa
        [HttpGet]
        public IActionResult Edit(int id)
        {
            // ĐÚNG: Dùng .Find(id) để chỉ lôi ra ĐÚNG 1 đối tượng có Id trùng khớp
            var category = _context.Categories.Find(id);

            if (category == null)
            {
                return NotFound(); // Trả về 404 nếu không tìm thấy dữ liệu dưới DB
            }

            return View(category); // Đổ đúng 1 đối tượng duy nhất sang View Edit.cshtml
        }

        // 2. Hàm POST: Nhận lại đúng 1 đối tượng chứa dữ liệu mới từ Form để lưu xuống SQL
        [HttpPost]
        public IActionResult Edit(Category model)
        {
            if (ModelState.IsValid)
            {
                _context.Categories.Update(model);
                _context.SaveChanges();
                return RedirectToAction("Index"); // Lưu xong quay về trang danh sách
            }
            return View(model);
        }

    }
}