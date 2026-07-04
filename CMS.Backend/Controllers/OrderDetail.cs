using CMS.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace CMS.Backend.Controllers
{
    [ApiExplorerSettings(IgnoreApi = true)]
    [Authorize]
    public class OrderDetailController : Controller
    {
        private readonly ApplicationDbContext _context;

        public OrderDetailController(ApplicationDbContext context) => _context = context;

        // URL: /OrderDetail/Index/{orderId}
        public IActionResult Index(int? orderId)
        {
            var query = _context.OrderDetails.Include(d => d.Product).AsQueryable();

            if (orderId.HasValue)
            {
                query = query.Where(d => d.OrderId == orderId);
            }

            return View(query.ToList());
        }
    }
}