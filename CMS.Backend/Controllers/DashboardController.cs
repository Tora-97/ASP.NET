using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CMS.Backend.Controllers
{
    [Authorize(Roles = "Admin")] // Bật lại dòng này khi bạn đã vào được trang
    public class DashboardController : Controller
    {
        public IActionResult Index()
        {
            var userName = User.Identity.Name;
            ViewBag.AdminName = userName;

            return View();
        }
    }
}