using CMS.Data;
using CMS.Data.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace CMS.Backend.Controllers
{
    [Route("api/posts")] // Đường dẫn gốc của API: https://localhost:7076/api/posts
    [ApiController]
    [AllowAnonymous] // Cho phép Swagger và ReactJS gọi dữ liệu công khai không bị chặn Login
    public class PostsApiController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public PostsApiController(ApplicationDbContext context)
        {
            _context = context;
        }

        // ==========================================
        // 1. API LẤY TOÀN BỘ DANH SÁCH BÀI VIẾT
        // URL gọi: GET https://localhost:7076/api/posts/get-all-api
        // ==========================================
        [HttpGet("get-all-api")] // QUAN TRỌNG: Phải ghi rõ HttpGet và định danh rõ ràng
        public IActionResult GetAllApi()
        {
            var posts = _context.Posts
                .Include(p => p.Category)
                .OrderByDescending(p => p.Id)
                .Select(p => new {
                    p.Id,
                    p.Title,
                    p.ImageUrl,
                    p.Content,
                    CreatedDate = p.CreatedDate.ToString("dd/MM/yyyy"),
                    CategoryName = p.Category != null ? p.Category.Name : "Chưa phân loại"
                })
                .ToList();

            return Ok(posts);
        }

        // ==========================================
        // 2. API LẤY CHI TIẾT MỘT BÀI VIẾT THEO ID
        // URL gọi: GET https://localhost:7076/api/posts/detail-api/{id}
        // ==========================================
        [HttpGet("detail-api/{id}")] // QUAN TRỌNG: Phải có HttpGet kèm tham số truyền vào
        public IActionResult GetDetailApi(int id)
        {
            var post = _context.Posts
                .Include(p => p.Category)
                .FirstOrDefault(p => p.Id == id);

            if (post == null)
            {
                return NotFound(new { message = "Không tìm thấy bài viết tương ứng dưới CSDL" });
            }

            return Ok(post);
        }
        // 3. API: THÊM BÀI VIẾT MỚI (POST)
        // URL: POST https://localhost:7076/api/posts/create-api
        // ==========================================================
        [HttpPost("create-api")]
        public IActionResult CreateApi([FromBody] Post model)
        {
            if (model == null) return BadRequest(new { message = "Dữ liệu không hợp lệ" });

            if (string.IsNullOrEmpty(model.Content))
            {
                model.Content = "Chưa có nội dung cho bài viết này.";
            }
            model.ImageUrl ??= "";

            _context.Posts.Add(model);
            _context.SaveChanges();

            return CreatedAtAction(nameof(GetDetailApi), new { id = model.Id }, model);
        }

        // 4. API: CẬP NHẬT BÀI VIẾT (PUT)
        // URL: PUT https://localhost:7076/api/posts/update-api/{id}
        // ==========================================================
        [HttpPut("update-api/{id}")]
        public IActionResult UpdateApi(int id, [FromBody] Post model)
        {
            if (id != model.Id) return BadRequest(new { message = "Mã ID không trùng khớp" });

            var oldPost = _context.Posts.AsNoTracking().FirstOrDefault(p => p.Id == id);
            if (oldPost == null) return NotFound(new { message = "Không tìm thấy bài viết" });

            // Bọc lót dữ liệu rỗng
            if (string.IsNullOrEmpty(model.Content)) model.Content = oldPost.Content;
            if (string.IsNullOrEmpty(model.ImageUrl)) model.ImageUrl = oldPost.ImageUrl;

            _context.Posts.Update(model);
            _context.SaveChanges();

            return Ok(new { message = "Cập nhật bài viết thành công", data = model });
        }

        // 5. API: XÓA BÀI VIẾT (DELETE)
        // URL: DELETE https://localhost:7076/api/posts/delete-api/{id}
        // ==========================================================
        [HttpDelete("delete-api/{id}")]
        public IActionResult DeleteApi(int id)
        {
            var post = _context.Posts.Find(id);
            if (post == null) return NotFound(new { message = "Không tìm thấy bài viết cần xóa" });

            _context.Posts.Remove(post);
            _context.SaveChanges();

            return Ok(new { message = "Xóa bài viết thành công" });
        }   
    }
}