using CMS.Data.Entities; // Quan trọng: Phải có dòng này để dùng lớp Post
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
// Thay tên 'YourDbContext' bằng tên DbContext thực tế trong dự án CMS.Data của bạn (ví dụ: CMSContext, AppDbContext,...)
using CMS.Data;

namespace CMS.Backend.Controllers
{
    public class PostController : Controller
    {
        // 1. Khai báo biến readonly để lưu trữ DbContext
        private readonly ApplicationDbContext _context;

        // 2. Tạo Constructor để Inject (tiêm) DbContext từ DI Container vào Controller
        public PostController(ApplicationDbContext context)
        {
            _context = context;
        }

        // Hàm Index: Hiển thị danh sách bài viết theo mã danh mục
        public IActionResult Index(int? id)
        {
            // 1. Khởi tạo câu truy vấn nâng cao (Chưa kích hoạt tải dữ liệu)
            var query = _context.Posts
                                .Include(p => p.Category)
                                .OrderByDescending(p => p.CreatedDate);

            // 2. Nếu người dùng có truyền id => Tiến hành lọc theo Chuyên mục
            if (id != null)
            {
                // Ép kiểu ép query chỉ lấy theo CategoryId
                var postsFiltered = query.Where(p => p.CategoryId == id).ToList();
                return View(postsFiltered);
            }

            // 3. Nếu id == null => Lấy toàn bộ bài viết hiển thị ra trang chủ
            var allPosts = query.ToList();
            return View(allPosts);
        }

        // Hàm Details: Hiển thị chi tiết một bài viết
        public IActionResult Details(int id)
        {
            // 1. Truy vấn bài viết theo ID
            // Sử dụng .Include(p => p.Category) để lấy kèm thông tin Danh mục (Join bảng)
            var post = _context.Posts
                .Include(p => p.Category)
                .FirstOrDefault(p => p.Id == id);

            // 2. Kiểm tra nếu không tìm thấy bài viết (tránh lỗi màn hình trắng)
            if (post == null)
            {
                return NotFound(); // Trả về trang lỗi 404
            }

            // 3. Truyền dữ liệu sang View
            return View(post);
        }
    
    }
}


// Hàm Details: Hiển thị chi tiết một bài viết (Bổ sung  khá giỏi)
/* public IActionResult Details(int id)
        {
            // Giả lập tìm bài viết trong Database bằng Id
            // Trong thực tế tuần sau sẽ là: _context.Posts.Find(id);
            var post = new Post
            {
                Id = id,
                Title = "Nội dung chi tiết bài viết số " + id,
                Content = "Đây là nội dung đầy đủ của bài viết mà bạn vừa click vào. Ở đây  có thể viết dài hơn để thấy sự khác biệt với trang danh sách.",
                ImageUrl = "https://via.placeholder.com/600x300", // Ảnh to hơn
                CreatedDate = DateTime.Now
            };

            if (post == null) return NotFound();

            return View(post);
        }
    }
}
*/