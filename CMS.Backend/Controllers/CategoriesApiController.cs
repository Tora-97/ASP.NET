using Microsoft.AspNetCore.Mvc;
using CMS.Data;
using CMS.Data.Entities;
using System.Linq;
using Microsoft.AspNetCore.Authorization;

namespace CMS.Backend.Controllers
{
    [Route("api/categories")] // Đường dẫn gốc trên Swagger: https://localhost:7076/api/categories
    [ApiController]
    [AllowAnonymous] // Cho phép gọi công khai dữ liệu không bị chặn quyền Login của Admin
    public class CategoriesApiController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CategoriesApiController(ApplicationDbContext context)
        {
            _context = context;
        }

        // ==========================================
        // 1. API: LẤY TOÀN BỘ DANH SÁCH DANH MỤC (GET)
        // URL: GET https://localhost:7076/api/categories/get-all
        // ==========================================
        [HttpGet("get-all")]
        public IActionResult GetAllCategoriesApi()
        {
            var categories = _context.Categories
                .OrderBy(c => c.Id)
                .Select(c => new {
                    c.Id,
                    c.Name,
                    c.Description
                }).ToList();

            return Ok(categories);
        }

        // ==========================================
        // 2. API: LẤY CHI TIẾT 1 DANH MỤC THEO ID (GET)
        // URL: GET https://localhost:7076/api/categories/detail/{id}
        // ==========================================
        [HttpGet("detail/{id}")]
        public IActionResult GetDetail(int id)
        {
            var category = _context.Categories.Find(id);
            if (category == null)
            {
                return NotFound(new { message = "Không tìm thấy danh mục yêu cầu" });
            }

            return Ok(new
            {
                category.Id,
                category.Name,
                category.Description
            });
        }

        // ==========================================
        // 3. API: THÊM DANH MỤC MỚI (POST)
        // URL: POST https://localhost:7076/api/categories/create-api
        // ==========================================
        [HttpPost("create-api")]
        public IActionResult Create([FromBody] Category model)
        {
            if (model == null) return BadRequest(new { message = "Dữ liệu gửi lên không hợp lệ" });

            if (string.IsNullOrEmpty(model.Name))
            {
                return BadRequest(new { message = "Tên danh mục không được để trống" });
            }

            _context.Categories.Add(model);
            _context.SaveChanges();

            return Ok(new { message = "Thêm danh mục thành công", data = model });
        }

        // ==========================================
        // 4. API: CẬP NHẬT DANH MỤC (PUT)
        // URL: PUT https://localhost:7076/api/categories/update-api/{id}
        // ==========================================
        [HttpPut("update-api/{id}")]
        public IActionResult Update(int id, [FromBody] Category model)
        {
            if (id != model.Id) return BadRequest(new { message = "Mã ID không trùng khớp" });

            var category = _context.Categories.Find(id);
            if (category == null) return NotFound(new { message = "Danh mục không tồn tại dưới CSDL" });

            // Cập nhật thông tin mới
            category.Name = model.Name;
            category.Description = model.Description;

            _context.Categories.Update(category);
            _context.SaveChanges();

            return Ok(new { message = "Cập nhật danh mục thành công", data = category });
        }

        // ==========================================
        // 5. API: XÓA DANH MỤC (DELETE)
        // URL: DELETE https://localhost:7076/api/categories/delete-api/{id}
        // ==========================================
        [HttpDelete("delete-api/{id}")]
        public IActionResult Delete(int id)
        {
            var category = _context.Categories.Find(id);
            if (category == null) return NotFound(new { message = "Không tìm thấy danh mục cần xóa" });

            // BẪY LOGIC AN TOÀN: Kiểm tra xem danh mục này có chứa bài viết nào không
            // Nếu có bài viết thuộc danh mục này, không cho xóa để tránh crash khóa ngoại SQL
            var hasPosts = _context.Posts.Any(p => p.CategoryId == id);
            if (hasPosts)
            {
                return BadRequest(new { message = "Không thể xóa! Danh mục này đang chứa bài viết." });
            }

            _context.Categories.Remove(category);
            _context.SaveChanges();

            return Ok(new { message = "Xóa danh mục thành công" });
        }
    }
}