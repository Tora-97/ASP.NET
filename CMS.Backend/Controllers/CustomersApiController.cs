using Microsoft.AspNetCore.Mvc;
using CMS.Data;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using CMS.Data.Entities; // Thêm dòng này để gọi được Model Customer

namespace CMS.Backend.Controllers
{
    [Route("api/customers")]
    [ApiController]
    [AllowAnonymous] // Cho phép ReactJS gọi công khai
    public class CustomersApiController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CustomersApiController(ApplicationDbContext context)
        {
            _context = context;
        }

        // ==========================================
        // 1. API LẤY TOÀN BỘ DANH SÁCH KHÁCH HÀNG
        // ==========================================
        [HttpGet("get-all")]
        public IActionResult GetAll()
        {
            var data = _context.Customers
                .OrderByDescending(c => c.Id)
                .Select(c => new {
                    c.Id,
                    FullName = c.FullName,
                    c.Email,
                    Phone = c.Phone ?? "",
                    Address = c.Address ?? ""
                })
                .ToList();

            return Ok(data);
        }

        // ==========================================
        // 2. API LẤY CHI TIẾT 1 KHÁCH HÀNG
        // ==========================================
        [HttpGet("detail/{id}")]
        public IActionResult GetDetail(int id)
        {
            var customer = _context.Customers.Find(id);

            if (customer == null)
            {
                return NotFound(new { message = "Không tìm thấy thông tin khách hàng yêu cầu" });
            }

            return Ok(new
            {
                customer.Id,
                FullName = customer.FullName,
                customer.Email,
                Phone = customer.Phone ?? "",
                Address = customer.Address ?? ""
            });
        }

        // ==========================================
        // 3. API ĐĂNG KÝ TÀI KHOẢN
        // ==========================================
        [HttpPost("register")]
        public IActionResult Register([FromBody] Customer customer)
        {
            // Kiểm tra xem Email đã tồn tại chưa
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
    }

    // Class phụ để hứng dữ liệu Đăng nhập từ React
    public class LoginRequest
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}