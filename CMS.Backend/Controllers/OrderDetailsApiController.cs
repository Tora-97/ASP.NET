using Microsoft.AspNetCore.Mvc;
using CMS.Data;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using Microsoft.AspNetCore.Authorization;

namespace CMS.Backend.Controllers
{
    [Route("api/order-details")]
    [ApiController]
    [AllowAnonymous]
    public class OrderDetailsApiController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public OrderDetailsApiController(ApplicationDbContext context)
        {
            _context = context;
        }

        // ==========================================
        // API LẤY CHI TIẾT CÁC MÓN TRONG ĐƠN HÀNG QUA ORDERID
        // URL: GET https://localhost:7076/api/order-details/by-order/5
        // ==========================================
        [HttpGet("by-order/{orderId}")]
        public IActionResult GetByOrder(int orderId)
        {
            var data = _context.OrderDetails
                .Include(d => d.Product)
                .Where(d => d.OrderId == orderId)
                .Select(d => new {
                    d.Id,
                    d.OrderId,
                    d.ProductId,
                    ProductName = d.Product != null ? d.Product.Name : "Sản phẩm đã xóa",
                    ProductImage = d.Product != null ? d.Product.ImageUrl : "", // Lấy thêm ảnh sản phẩm nếu cần
                    d.Quantity,
                    UnitPrice = d.UnitPrice, // ĐÃ SỬA: Dùng đúng thuộc tính d.UnitPrice
                    SubTotal = d.Quantity * d.UnitPrice // Thành tiền món = Số lượng * Đơn giá lúc mua
                })
                .ToList();

            return Ok(data);
        }
    }
}