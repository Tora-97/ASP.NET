using CMS.Data;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi;

// QUAN TRỌNG: Thêm thư viện này để hệ thống nhận diện cấu hình Swagger
var builder = WebApplication.CreateBuilder(args);

// ====================================================================
// 1. CẤU HÌNH CÁC DỊCH VỤ (SERVICES CONTAINER)
// ====================================================================

// Kích hoạt dịch vụ Controller kèm theo View (ASP.NET Core MVC)
builder.Services.AddControllersWithViews();

// Cấu hình kết nối cơ sở dữ liệu SQL Server qua ConnectionString
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Cấu hình dịch vụ xác thực danh tính bằng Cookie (Bẻ gãy vòng lặp Login)
builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(options =>
    {
        options.LoginPath = "/Account/Login";               // Đường dẫn nếu chưa đăng nhập sẽ bị đá về
        options.AccessDeniedPath = "/Account/AccessDenied"; // Đường dẫn nếu vào vùng cấm quyền Admin
    });

// Kích hoạt bộ quét tìm kiếm Endpoint và cấu hình sinh tài liệu tự động cho Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "ThaiCMS API Quản Trị", Version = "v1" });
});

var app = builder.Build();

// ====================================================================
// 2. CẤU HÌNH ĐƯỜNG ỐNG XỬ LÝ REQUEST (HTTP REQUEST PIPELINE)
// ====================================================================

// Cấu hình trang báo lỗi khi chạy môi trường Production thực tế
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection(); // Ép buộc trình duyệt sử dụng giao thức bảo mật HTTPS
app.UseStaticFiles();      // Cho phép đọc file tĩnh ở wwwroot (CSS, JS, hình ảnh trong thư mục uploads)

app.UseRouting();          // Bật cơ chế định tuyến phân luồng URL

// --------------------------------------------------------------------
// BẬT SWAGGER: Để phía ngoài khối "If Development" để luôn test được API tự do
// --------------------------------------------------------------------
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "ThaiCMS API v1");
    // Nếu muốn mở web lên chạy thẳng vào giao diện Swagger, bỏ comment dòng dưới:
    // c.RoutePrefix = "swagger"; 
});

// THỨ TỰ BẮT BUỘC: Phải kiểm tra Danh tính (Authentication) trước khi phân Quyền (Authorization)
app.UseAuthentication();
app.UseAuthorization();

// Cấu hình tuyến đường mặc định của hệ thống MVC Admin
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run(); // Khởi chạy ứng dụng Web