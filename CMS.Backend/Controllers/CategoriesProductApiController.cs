using CMS.Data;
using CMS.Data.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Threading.Tasks;
namespace CMS.Backend.Controllers
{
    [Route("api/product-categories")]
    [ApiController]
    [AllowAnonymous]
    public class CategoriesProductApiController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CategoriesProductApiController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("get-all")]
        public IActionResult GetAll()
        {
            var data = _context.CategoriesProducts
                .OrderBy(c => c.Id)
                .Select(c => new {
                    c.Id,
                    c.Name,
                    c.Description
                }).ToList();
            return Ok(data);
        }
        // 3. API ĐĂNG KÝ TÀI KHOẢN
        // URL: POST https://localhost:7076/api/customers/register
        // ==========================================
        [HttpPost("register")]
        public IActionResult Register([FromBody] Customer customer)
        {
            // Kiểm tra xem Email đã tồn tại trong CSDL chưa
            var emailExists = _context.Customers.Any(c => c.Email == customer.Email);
            if (emailExists)
            {
                return BadRequest(new { message = "Email này đã được sử dụng. Vui lòng chọn Email khác!" });
            }

            // Thêm khách hàng mới
            _context.Customers.Add(customer);
            _context.SaveChanges();

            return Ok(new { message = "Đăng ký tài khoản thành công!" });
        }

        // ==========================================
        // 4. API ĐĂNG NHẬP
        // URL: POST https://localhost:7076/api/customers/login
        // ==========================================
        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest request)
        {
            // Tìm user khớp cả Email và Password
            var user = _context.Customers.FirstOrDefault(c => c.Email == request.Email && c.Password == request.Password);

            if (user == null)
            {
                return BadRequest(new { message = "Email hoặc mật khẩu không chính xác!" });
            }

            // Trả về thông tin user (Tuyệt đối KHÔNG trả về Password)
            return Ok(new
            {
                message = "Đăng nhập thành công!",
                user = new
                {
                    user.Id,
                    user.FullName,
                    user.Email,
                    Phone = user.Phone ?? "",
                    Address = user.Address ?? ""
                }
            });
        }

        // Tạo thêm một Class DTO nhỏ ở cuối file để hứng dữ liệu Đăng nhập
        public class LoginRequest
        {
            public string Email { get; set; }
            public string Password { get; set; }
        }
    }
}