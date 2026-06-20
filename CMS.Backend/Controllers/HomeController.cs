using CMS.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace CMS.Backend.Controllers
{
    public class HomeController : Controller
    {
        private readonly ApplicationDbContext _context;

        public HomeController(ApplicationDbContext context)
        {
            _context = context;
        }

        public IActionResult Index()
        {
            // 1. Lấy danh sách danh mục sản phẩm để làm bộ lọc
            var productCategories = _context.CategoriesProducts
                .OrderBy(c => c.Name)
                .ToList();

            // 2. Lấy danh sách danh mục bài viết
            var postCategories = _context.Categories
                .OrderBy(c => c.Name)
                .ToList();

            // 3. Lấy 4 sản phẩm mới nhất
            var latestProducts = _context.Products
                .Include(p => p.CategoryProduct)
                .OrderByDescending(p => p.Id)
                .Take(4)
                .ToList();

            // 4. Lấy 3 bài viết mới nhất
            var latestPosts = _context.Posts
                .Include(p => p.Category)
                .OrderByDescending(p => p.Id)
                .Take(3)
                .ToList();

            // Đẩy tất cả dữ liệu qua ViewBag để View bốc tách
            ViewBag.ProductCategories = productCategories;
            ViewBag.PostCategories = postCategories;
            ViewBag.LatestProducts = latestProducts;
            ViewBag.LatestPosts = latestPosts;

            return View();
        }
    }
}