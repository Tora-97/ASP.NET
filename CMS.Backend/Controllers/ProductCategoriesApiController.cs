using Microsoft.AspNetCore.Mvc;
using CMS.Data;
using System.Linq;
using Microsoft.AspNetCore.Authorization;

namespace CMS.Backend.Controllers
{
    [Route("api/product-categories")]
    [ApiController]
    [AllowAnonymous]
    public class CategoriesProductsApiController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CategoriesProductsApiController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("get-all")]
        public IActionResult GetAll()
        {
            var data = _context.CategoriesProducts
                .OrderBy(c => c.Id)
                .Select(c => new {
                    c.Id,
                    c.Name,
                    c.Description
                }).ToList();
            return Ok(data);
        }
    }
}