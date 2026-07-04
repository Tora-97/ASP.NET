using CMS.Backend.Models;
using CMS.Data;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace CMS.Backend.Controllers
{
    [ApiExplorerSettings(IgnoreApi = true)]
    public class CartController : Controller
    {
        private readonly ApplicationDbContext _context;
        private const string CART_KEY = "UserCart";

        public CartController(ApplicationDbContext context) => _context = context;
        // Hàm phụ trợ: Lấy danh sách giỏ hàng hiện tại từ Session ra
        private List<CartItem> GetCartItems()
        {
            var sessionData = HttpContext.Session.GetString(CART_KEY);
            return sessionData == null ? new List<CartItem>() : JsonSerializer.Deserialize<List<CartItem>>(sessionData);
        }

        // Hàm phụ trợ: Lưu danh sách giỏ hàng ngược lại vào Session
        private void SaveCart(List<CartItem> cart)
        {
            HttpContext.Session.SetString(CART_KEY, JsonSerializer.Serialize(cart));
        }

        // 1. TRANG HIỂN THỊ GIỎ HÀNG
        // URL: /Cart
        public IActionResult Index()
        {
            var cart = GetCartItems();
            return View(cart);
        }

        // 2. CHỨC NĂNG THÊM SẢN PHẨM VÀO GIỎ
        // URL: /Cart/AddToCart?productId=5
        public IActionResult AddToCart(int productId, int quantity = 1)
        {
            var product = _context.Products.Find(productId);
            if (product == null) return NotFound();

            var cart = GetCartItems();
            var existingItem = cart.FirstOrDefault(i => i.ProductId == productId);

            if (existingItem != null)
            {
                existingItem.Quantity += quantity; // Nếu có rồi thì tăng số lượng
            }
            else
            {
                cart.Add(new CartItem
                {
                    ProductId = product.Id,
                    ProductName = product.Name,
                    ImageUrl = product.ImageUrl,
                    Price = product.Price,
                    Quantity = quantity
                });
            }

            SaveCart(cart);
            return RedirectToAction(nameof(Index));
        }

        // 3. CẬP NHẬT SỐ LƯỢNG TRỰC TIẾP TẠI TRANG GIỎ HÀNG
        [HttpPost]
        public IActionResult UpdateQuantity(int productId, int quantity)
        {
            var cart = GetCartItems();
            var item = cart.FirstOrDefault(i => i.ProductId == productId);

            if (item != null)
            {
                if (quantity <= 0) cart.Remove(item); // Nếu hạ số lượng về 0 thì xóa luôn món
                else item.Quantity = quantity;
            }

            SaveCart(cart);
            return RedirectToAction(nameof(Index));
        }

        // 4. XÓA MÓN KHỎI GIỎ HÀNG
        // URL: /Cart/RemoveItem/5
        public IActionResult RemoveItem(int productId)
        {
            var cart = GetCartItems();
            var item = cart.FirstOrDefault(i => i.ProductId == productId);
            if (item != null) cart.Remove(item);

            SaveCart(cart);
            return RedirectToAction(nameof(Index));
        }
    }
}