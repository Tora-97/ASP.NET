using CMS.Data;
using CMS.Data.Entities;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using BCrypt.Net;
[ApiExplorerSettings(IgnoreApi = true)]
public class AccountController : Controller
{
    private readonly ApplicationDbContext _context;

    public AccountController(ApplicationDbContext context) => _context = context;

    [HttpGet]
    public IActionResult Login() => View();

    [HttpPost]
    [ValidateAntiForgeryToken] // Tiêu chí bảo mật
    public async Task<IActionResult> Login(string username, string password)
    {
        var user = _context.Users.FirstOrDefault(u => u.Username == username);

        if (user == null)
        {
            ViewBag.Error = "Tài khoản không tồn tại!";
            return View();
        }

        try
        {
            // Kiểm tra mật khẩu bằng BCrypt
            bool isValid = BCrypt.Net.BCrypt.Verify(password, user.PasswordHash);

            if (isValid)
            {
                // 1. Tạo danh sách Claims
                var claims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, user.FullName),
                    new Claim(ClaimTypes.NameIdentifier, user.Username),
                    new Claim(ClaimTypes.Role, user.Role)
                };

                // 2. Tạo Identity và Principal
                var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
                var authProperties = new AuthenticationProperties { IsPersistent = true }; // Ghi nhớ đăng nhập

                // 3. Đăng nhập hệ thống (SignIn)
                await HttpContext.SignInAsync(
                    CookieAuthenticationDefaults.AuthenticationScheme,
                    new ClaimsPrincipal(claimsIdentity),
                    authProperties);

                return RedirectToAction("Index", "Dashboard");
            }
            else
            {
                ViewBag.Error = "Mật khẩu không đúng!";
            }
        }
        catch (Exception ex)
        {
            ViewBag.Error = "Lỗi hệ thống: " + ex.Message;
        }
        return View();
    }
    [HttpGet]
    public IActionResult Register() => View();

    [HttpPost]
    [ValidateAntiForgeryToken]
    public IActionResult Register(User model)
    {
        // Kiểm tra trùng lặp (Tiêu chí 34)
        if (_context.Users.Any(u => u.Username == model.Username))
        {
            ViewBag.Error = "Tên đăng nhập đã tồn tại!";
            return View();
        }

        // Băm mật khẩu (Tiêu chí 33)
        model.PasswordHash = BCrypt.Net.BCrypt.HashPassword(model.PasswordHash);
        model.Role = "Admin"; // Mặc định là Admin cho lần đầu

        _context.Users.Add(model);
        _context.SaveChanges();
        return RedirectToAction("Login");
    }
    public async Task<IActionResult> Logout()
    {
        await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
        HttpContext.Session.Clear();
        return RedirectToAction("Login");
    }
    // Hàm này chạy một lần duy nhất để tạo tài khoản Admin
    public IActionResult SeedAdmin()
    {
        // Kiểm tra xem đã có user nào chưa
        if (!_context.Users.Any())
        {
            var admin = new User
            {
                Username = "admin",
                FullName = "Quản trị viên Hệ thống",
                Role = "Admin",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("123456")
            };

            _context.Users.Add(admin);
            _context.SaveChanges();
            return Content("Tài khoản admin/123456 đã được tạo thành công!");
        }

        // BỔ SUNG: Phải có return khi bảng đã có dữ liệu
        return Content("Hệ thống đã có tài khoản, không cần tạo thêm!");
    }
}