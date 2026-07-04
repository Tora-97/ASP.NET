using CMS.Data;
using CMS.Data.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace CMS.Backend.Controllers
{
    [ApiExplorerSettings(IgnoreApi = true)]
    [Authorize(Roles = "Admin")]
    public class OrderController : Controller
    {
        private readonly ApplicationDbContext _context;

        public OrderController(ApplicationDbContext context) => _context = context;

        public IActionResult Index()
        {
            var orders = _context.Orders.Include(o => o.Customer).OrderByDescending(o => o.OrderDate).ToList();
            return View(orders);
        }

        [HttpPost]
        public IActionResult UpdateStatus(int id, int status)
        {
            var order = _context.Orders.Find(id);
            if (order != null)
            {
                order.Status = status;
                _context.SaveChanges();
            }
            return RedirectToAction(nameof(Index));
        }
        [HttpPost("checkout")]
        public IActionResult Checkout([FromBody] Order order)
        {
            using var transaction = _context.Database.BeginTransaction();
            try
            {
                foreach (var item in order.OrderDetails)
                {
                    var product = _context.Products.Find(item.ProductId);

                    // 1. Kiểm tra sản phẩm có tồn tại không
                    if (product == null)
                    {
                        return BadRequest(new { message = "Sản phẩm trong giỏ hàng không tồn tại!" });
                    }

                    // 2. KIỂM TRA TỒN KHO: Nếu số lượng đặt > số lượng trong kho
                    if (product.StockQuantity < item.Quantity)
                    {
                        // Trả về lỗi kèm theo số lượng thực tế còn lại
                        return BadRequest(new { message = $"Rất tiếc! Sản phẩm '{product.Name}' hiện chỉ còn {product.StockQuantity} chiếc. Vui lòng giảm số lượng." });
                    }

                    // 3. Trừ tồn kho nếu hợp lệ
                    product.StockQuantity -= item.Quantity;
                }

                _context.Orders.Add(order);
                _context.SaveChanges();
                transaction.Commit(); // Chốt đơn

                return Ok(new { message = "Đặt hàng thành công!" });
            }
            catch
            {
                transaction.Rollback(); // Hoàn tác nếu có lỗi
                return StatusCode(500, new { message = "Lỗi hệ thống khi thanh toán." });
            }
        }
    }
}