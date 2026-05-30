using CMS.Data; // Đảm bảo có dòng này để trình biên dịch nhận diện ApplicationDbContext
using CMS.Data.Entities; // Phải có dòng này để dùng lớp User
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace CMS.Backend.Controllers
{
    [Authorize(Roles = "Admin")] // Chỉ tài khoản có Role là Admin mới được phép vào
    public class UserController : Controller
    {
        // 1. KHAI BÁO biến kết nối cơ sở dữ liệu
        private readonly ApplicationDbContext _context;

        // 2. TẠO CONSTRUCTOR để "tiêm" kết nối từ hệ thống vào Controller
        public UserController(ApplicationDbContext context)
        {
            _context = context;
        }

        // Hàm Index: Hiển thị danh sách thành viên quản trị từ Database thật
        public IActionResult Index()
        {
            // Thay vì dùng dữ liệu giả, lấy trực tiếp từ SQL Server:
            var users = _context.Users.ToList();

            // Trả về View kèm theo danh sách người dùng
            return View(users);
        }

        // GET: Hiển thị giao diện Form thêm mới người dùng (Nên bổ sung nếu chưa có)
        [HttpGet]
        public IActionResult Create()
        {
            return View();
        }

        // POST: Đón dữ liệu từ Form gửi lên để lưu vào SQL
        [HttpPost]
        public IActionResult Create(User model)
        {
            // Kiểm tra xem tên đăng nhập đã tồn tại chưa
            var checkExist = _context.Users.Any(u => u.Username == model.Username);
            if (checkExist)
            {
                ModelState.AddModelError("Username", "Tên đăng nhập này đã có người dùng!");
                return View(model);
            }

            // Lưu User mới vào Database
            _context.Users.Add(model);
            _context.SaveChanges();

            return RedirectToAction("Index");
        }

        // GET: Lấy thông tin người dùng hiện tại lên Form Sửa
        [HttpGet]
        public IActionResult Edit(int id)
        {
            var user = _context.Users.Find(id);
            if (user == null) return NotFound();

            return View(user);
        }

        // POST: Thực hiện lưu thay đổi sau khi Sửa
        [HttpPost]
        public IActionResult Edit(User model, string NewPassword)
        {
            // 1. Tìm User gốc trong Database để lấy lại mật khẩu cũ nếu cần
            var existingUser = _context.Users.AsNoTracking().FirstOrDefault(u => u.Id == model.Id);

            if (existingUser == null) return NotFound();

            // 2. Xử lý mật khẩu: Nếu nhập mới thì lấy cái mới, nếu trống thì lấy cái cũ
            if (!string.IsNullOrEmpty(NewPassword))
            {
                model.PasswordHash = NewPassword; // Sau này sẽ mã hóa tại đây
            }
            else
            {
                model.PasswordHash = existingUser.PasswordHash;
            }

            // 3. Cập nhật vào Database
            _context.Users.Update(model);
            _context.SaveChanges();

            return RedirectToAction("Index");
        }

        // GET/POST: Xóa người dùng theo ID
        public IActionResult Delete(int id)
        {
            var user = _context.Users.Find(id);
            if (user != null)
            {
                _context.Users.Remove(user);
                _context.SaveChanges();
            }
            return RedirectToAction("Index");
        }
    }
}