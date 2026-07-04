using Microsoft.AspNetCore.Mvc;
using CMS.Data;
using System.Linq;

namespace CMS.Backend.Controllers.Api
{
    // ĐÃ SỬA: Đổi Route chuẩn theo tên bảng
    [Route("api/categoriesproducts")]
    [ApiController]
    public class CategoriesProductsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CategoriesProductsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            // ĐÃ SỬA: Gọi đúng tên bảng CategoriesProducts
            // (Đảm bảo trong ApplicationDbContext.cs bạn cũng khai báo public DbSet<CategoryProduct> CategoriesProducts { get; set; })
            var categories = _context.CategoriesProducts.ToList();
            return Ok(categories);
        }
    }
}