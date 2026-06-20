using CMS.Data;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// ====================================================================
// 1. CẤU HÌNH CÁC DỊCH VỤ (SERVICES CONTAINER)
// ====================================================================

builder.Services.AddControllersWithViews();

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(options =>
    {
        options.LoginPath = "/Account/Login";
        options.AccessDeniedPath = "/Account/AccessDenied";
    });

// CẤU HÌNH SWAGGER THÔNG MINH - SỬA LỖI RENDER DEFINITION
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new Microsoft.OpenApi.OpenApiInfo
    {
        Title = "ThaiCMS API Quản Trị",
        Version = "v1"
    });

    c.DocInclusionPredicate((docName, apiDesc) => { return true; });
    c.CustomSchemaIds(type => type.ToString());
});
builder.Services.AddSession(options => {
    options.IdleTimeout = TimeSpan.FromMinutes(30); // Giỏ hàng tự hủy sau 30 phút rời web
    options.Cookie.HttpOnly = true;
    options.Cookie.IsEssential = true;
});
builder.Services.AddHttpContextAccessor();
builder.Services.AddSwaggerGenNewtonsoftSupport();
var app = builder.Build();

// ====================================================================
// 2. CẤU HÌNH ĐƯỜNG ỐNG XỬ LÝ REQUEST (HTTP REQUEST PIPELINE)
// ====================================================================

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();
app.UseSession();
// BẬT MIDDLEWARE SWAGGER
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "ThaiCMS API v1");
    c.RoutePrefix = "swagger"; // Mở web tự động chạy thẳng vào Swagger
});

app.UseAuthentication();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();