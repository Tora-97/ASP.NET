using CMS.Data;
using CMS.Data.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace CMS.Backend.Controllers
{
    [Route("api/products")]
    [ApiController]
    [AllowAnonymous] // Cho phép gọi công khai lấy danh sách sản phẩm lên Swagger
    public class ProductsApiController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ProductsApiController(ApplicationDbContext context)
        {
            _context = context;
        }

        // ==========================================
        // API LẤY TOÀN BỘ SẢN PHẨM KHỚP 100% MODEL MỚI
        // URL: GET https://localhost:7076/api/products/get-all
        // ==========================================
        [HttpGet("get-all")]
        public IActionResult GetAll()
        {
            var data = _context.Products
                .Include(p => p.CategoryProduct) // ĐÃ SỬA: Nhúng đúng bảng CategoryProduct
                .OrderByDescending(p => p.Id)
                .Select(p => new {
                    p.Id,
                    p.Name,
                    p.Price,
                    ImageUrl = p.ImageUrl ?? "",
                    Description = p.Description ?? "",
                    // ĐÃ SỬA: Gọi đúng thuộc tính p.CategoryProduct để lấy tên danh mục
                    CategoryName = p.CategoryProduct != null ? p.CategoryProduct.Name : "Chưa phân loại"
                }).ToList();

            return Ok(data);
        }

        // ==========================================
        // API LẤY CHI TIẾT 1 SẢN PHẨM THEO ID
        // URL: GET https://localhost:7076/api/products/detail/{id}
        // ==========================================
        [HttpGet("detail/{id}")]
        public IActionResult GetDetail(int id)
        {
            var data = _context.Products
                .Include(p => p.CategoryProduct) // ĐÃ SỬA: Nhúng đúng bảng CategoryProduct
                .FirstOrDefault(p => p.Id == id);

            if (data == null)
            {
                return NotFound(new { message = "Không tìm thấy sản phẩm yêu cầu" });
            }

            return Ok(new
            {
                data.Id,
                data.Name,
                data.Price,
                ImageUrl = data.ImageUrl ?? "",
                Description = data.Description ?? "",
                CategoryName = data.CategoryProduct != null ? data.CategoryProduct.Name : "Chưa phân loại"
            });
        }
        // 3. API: THÊM SẢN PHẨM MỚI (POST)
        // URL: POST https://localhost:7076/api/products/create-api
        // ==========================================================
        [HttpPost("create-api")]
        public IActionResult Create([FromBody] Product model)
        {
            if (model == null) return BadRequest(new { message = "Dữ liệu không hợp lệ" });

            _context.Products.Add(model);
            _context.SaveChanges();
            return Ok(new { message = "Thêm sản phẩm thành công", data = model });
        }

        // 4. API: CẬP NHẬT SẢN PHẨM (PUT)
        // URL: PUT https://localhost:7076/api/products/update-api/{id}
        // ==========================================================
        [HttpPut("update-api/{id}")]
        public IActionResult Update(int id, [FromBody] Product model)
        {
            if (id != model.Id) return BadRequest(new { message = "ID sản phẩm không khớp" });

            var oldProduct = _context.Products.AsNoTracking().FirstOrDefault(p => p.Id == id);
            if (oldProduct == null) return NotFound(new { message = "Sản phẩm không tồn tại" });

            if (string.IsNullOrEmpty(model.ImageUrl)) model.ImageUrl = oldProduct.ImageUrl;

            _context.Products.Update(model);
            _context.SaveChanges();
            return Ok(new { message = "Cập nhật sản phẩm thành công" });
        }

        // 5. API: XÓA SẢN PHẨM (DELETE)
        // URL: DELETE https://localhost:7076/api/products/delete-api/{id}
        // ==========================================================
        [HttpDelete("delete-api/{id}")]
        public IActionResult Delete(int id)
        {
            var product = _context.Products.Find(id);
            if (product == null) return NotFound(new { message = "Không tìm thấy sản phẩm" });

            _context.Products.Remove(product);
            _context.SaveChanges();
            return Ok(new { message = "Xóa sản phẩm thành công" });
        }
    }
}