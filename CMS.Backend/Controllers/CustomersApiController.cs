using Microsoft.AspNetCore.Mvc;
using CMS.Data;
using System.Linq;
using Microsoft.AspNetCore.Authorization;

namespace CMS.Backend.Controllers
{
    [Route("api/customers")]
    [ApiController]
    [AllowAnonymous] // Cho phép ReactJS hoặc Swagger gọi công khai lấy danh sách khách hàng
    public class CustomersApiController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CustomersApiController(ApplicationDbContext context)
        {
            _context = context;
        }

        // ==========================================
        // 1. API LẤY TOÀN BỘ DANH SÁCH KHÁCH HÀNG
        // URL: GET https://localhost:7076/api/customers/get-all
        // ==========================================
        [HttpGet("get-all")]
        public IActionResult GetAll()
        {
            var data = _context.Customers
                .OrderByDescending(c => c.Id)
                .Select(c => new {
                    c.Id,
                    FullName = c.FullName, // ĐÃ SỬA: Gọi đúng thuộc tính c.FullName theo Model của bạn
                    c.Email,
                    Phone = c.Phone ?? "", // Bọc lót nếu trống thì trả về chuỗi rỗng thay vì null
                    Address = c.Address ?? ""
                    // Tuyệt đối không Select trường Password để đảm bảo an toàn an ninh dữ liệu
                })
                .ToList();

            return Ok(data);
        }

        // ==========================================
        // 2. API LẤY CHI TIẾT 1 KHÁCH HÀNG THEO ID
        // URL: GET https://localhost:7076/api/customers/detail/{id}
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
                FullName = customer.FullName, // ĐÃ SỬA: Đồng bộ đúng customer.FullName
                customer.Email,
                Phone = customer.Phone ?? "",
                Address = customer.Address ?? ""
            });
        }
    }
}