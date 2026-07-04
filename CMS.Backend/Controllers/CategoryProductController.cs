using CMS.Data;
using CMS.Data.Entities;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace CMS.Backend.Controllers
{
    [ApiExplorerSettings(IgnoreApi = true)]
    // Trang quản lý danh mục sản phẩm bên Admin
    public class CategoryProductController : Controller
    {
        private readonly ApplicationDbContext _context;

        public CategoryProductController(ApplicationDbContext context)
        {
            _context = context;
        }

        // 1. TRANG DANH SÁCH DANH MỤC
        // URL: /CategoryProduct
        public IActionResult Index()
        {
            var categories = _context.CategoriesProducts.OrderBy(c => c.Id).ToList();
            return View(categories);
        }

        // 2. TRANG TẠO MỚI DANH MỤC (GET)
        public IActionResult Create()
        {
            return View();
        }

        // XỬ LÝ TẠO MỚI (POST)
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Create(CategoryProduct model)
        {
            if (ModelState.IsValid)
            {
                _context.CategoriesProducts.Add(model);
                _context.SaveChanges();
                return RedirectToAction(nameof(Index));
            }
            return View(model);
        }

        // 3. TRANG SỬA DANH MỤC (GET)
        // URL: /CategoryProduct/Edit/5
        public IActionResult Edit(int id)
        {
            var category = _context.CategoriesProducts.Find(id);
            if (category == null) return NotFound();

            return View(category);
        }

        // XỬ LÝ CẬP NHẬT (POST)
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Edit(CategoryProduct model)
        {
            if (ModelState.IsValid)
            {
                _context.CategoriesProducts.Update(model);
                _context.SaveChanges();
                return RedirectToAction(nameof(Index));
            }
            return View(model);
        }

        // 4. XỬ LÝ XÓA NHANH
        // URL: /CategoryProduct/Delete/5
        public IActionResult Delete(int id)
        {
            var category = _context.CategoriesProducts.Find(id);
            if (category == null) return NotFound();

            // Kiểm tra bẫy logic: Nếu danh mục có chứa sản phẩm thì không cho xóa để tránh lỗi khóa ngoại
            var hasProducts = _context.Products.Any(p => p.CategoryProductId == id);
            if (hasProducts)
            {
                TempData["Error"] = "Không thể xóa! Danh mục này đang có sản phẩm liên kết.";
                return RedirectToAction(nameof(Index));
            }

            _context.CategoriesProducts.Remove(category);
            _context.SaveChanges();
            return RedirectToAction(nameof(Index));
        }
    }
}