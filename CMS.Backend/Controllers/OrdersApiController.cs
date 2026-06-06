using CMS.Data;
using CMS.Data.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace CMS.Backend.Controllers
{
    [Route("api/orders")]
    [ApiController]
    [AllowAnonymous]
    public class OrdersApiController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public OrdersApiController(ApplicationDbContext context)
        {
            _context = context;
        }

        // ==========================================
        // API LẤY TOÀN BỘ ĐƠN HÀNG KÈM TỔNG TIỀN
        // URL: GET https://localhost:7076/api/orders/get-all
        // ==========================================
        [HttpGet("get-all")]
        public IActionResult GetAll()
        {
            var data = _context.Orders
                .Include(o => o.Customer)
                .Include(o => o.OrderDetails) // Nhúng thêm chi tiết để tính tổng tiền
                .OrderByDescending(o => o.Id)
                .Select(o => new {
                    o.Id,
                    OrderDate = o.OrderDate.ToString("dd/MM/yyyy HH:mm:ss"),
                    o.CustomerId,
                    o.Status,
                    Notes = o.Notes ?? "", // ĐÃ SỬA: Dùng đúng thuộc tính o.Notes
                    CustomerName = o.Customer != null ? o.Customer.FullName : "Khách vãng lai",
                    // Tự động tính tổng tiền đơn hàng = Tổng (Số lượng * Đơn giá) từng món
                    TotalAmount = o.OrderDetails != null ? o.OrderDetails.Sum(d => d.Quantity * d.UnitPrice) : 0
                })
                .ToList();

            return Ok(data);
        }

        // ==========================================
        // API LẤY CHI TIẾT 1 ĐƠN HÀNG
        // URL: GET https://localhost:7076/api/orders/detail/{id}
        // ==========================================
        [HttpGet("detail/{id}")]
        public IActionResult GetDetail(int id)
        {
            var order = _context.Orders
                .Include(o => o.Customer)
                .Include(o => o.OrderDetails)
                .FirstOrDefault(o => o.Id == id);

            if (order == null)
            {
                return NotFound(new { message = "Không tìm thấy đơn hàng yêu cầu" });
            }

            return Ok(new
            {
                order.Id,
                OrderDate = order.OrderDate.ToString("dd/MM/yyyy HH:mm:ss"),
                order.CustomerId,
                order.Status,
                Notes = order.Notes ?? "", // ĐÃ SỬA: Dùng đúng thuộc tính order.Notes
                CustomerName = order.Customer != null ? order.Customer.FullName : "Khách vãng lai",
                TotalAmount = order.OrderDetails != null ? order.OrderDetails.Sum(d => d.Quantity * d.UnitPrice) : 0
            });
        }
        // 3. API: ĐẶT HÀNG MỚI NÂNG CAO (POST - LƯU LUÔN CHI TIẾT ĐƠN)
        // URL: POST https://localhost:7076/api/orders/create-checkout
        // ==========================================================
        [HttpPost("create-checkout")]
        public IActionResult Checkout([FromBody] Order model)
        {
            if (model == null) return BadRequest(new { message = "Đơn hàng rỗng" });

            model.OrderDate = DateTime.Now;
            model.Status = 0; // Mặc định: Chờ duyệt

            // Bắt đầu một Transaction để đảm bảo an toàn: lỗi 1 file là hủy toàn bộ
            using (var transaction = _context.Database.BeginTransaction())
            {
                try
                {
                    // Bước 1: Lưu thông tin đơn hàng tổng trước để SQL sinh ra OrderId
                    _context.Orders.Add(model);
                    _context.SaveChanges();

                    // Bước 2: Kiểm tra và duyệt lưu danh sách món chi tiết đi kèm
                    if (model.OrderDetails != null && model.OrderDetails.Count > 0)
                    {
                        foreach (var detail in model.OrderDetails)
                        {
                            detail.OrderId = model.Id; // Gán mã OrderId vừa sinh tự động ở trên
                            _context.OrderDetails.Add(detail);
                        }
                        _context.SaveChanges();
                    }

                    transaction.Commit(); // Chốt phiên thành công hoàn toàn
                    return Ok(new { message = "Đặt hàng thành công", orderId = model.Id });
                }
                catch (Exception ex)
                {
                    transaction.Rollback(); // Hoàn tác hủy bỏ nếu có lỗi xảy ra
                    return StatusCode(500, new { message = "Lỗi hệ thống khi lưu hóa đơn", error = ex.Message });
                }
            }
        }

        // 4. API: CẬP NHẬT TRẠNG THÁI ĐƠN HÀNG (PUT)
        // URL: PUT https://localhost:7076/api/orders/update-status/{id}
        // ==========================================================
        [HttpPut("update-status/{id}")]
        public IActionResult UpdateStatus(int id, [FromBody] int newStatus)
        {
            var order = _context.Orders.Find(id);
            if (order == null) return NotFound(new { message = "Không tìm thấy hóa đơn" });

            order.Status = newStatus; // Cập nhật trạng thái (0: Chờ, 1: Giao, 2: Xong)
            _context.SaveChanges();

            return Ok(new { message = "Cập nhật trạng thái đơn hàng thành công" });
        }
    }
}