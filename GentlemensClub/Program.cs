using System.Text;
using GentlemensClub.Data;
using GentlemensClub.Services;
using GentlemensClub.Services.Interfaces;
using GentlemensClub.Services.Interfaces.Finance.Bank;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using GentlemensClub.Services.Interfaces.Finance.Stock;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Net.Http.Headers;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();

builder.Services.AddAuthentication(options =>
    {
        options.DefaultAuthenticateScheme = "JWT_OR_COOKIE";
        options.DefaultChallengeScheme = "JWT_OR_COOKIE";
        options.DefaultSignInScheme = "JWT_OR_COOKIE";
    })
    .AddCookie("LoginCookieAuth", options =>
    {
        options.Cookie.Name = "LoginCookieAuth";
    })
    .AddJwtBearer("Bearer", options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters()
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey =
                new SymmetricSecurityKey(Encoding.ASCII.GetBytes(builder.Configuration.GetValue<string>("SecretKey"))),
            ValidateLifetime = true,
            ValidateAudience = false,
            ValidateIssuer = false,
            ClockSkew = TimeSpan.Zero,
        };
    })
    .AddPolicyScheme("JWT_OR_COOKIE", "JWT_OR_COOKIE", options =>
    {
        // Runs on each request
        options.ForwardDefaultSelector = context =>
        {
            // Filter by authentication type
            string authorization = context.Request.Headers[HeaderNames.Authorization];
            if (!string.IsNullOrEmpty(authorization) && authorization.StartsWith("Bearer "))
                return "Bearer";

            // Otherwise always check for cookie auth
            return "LoginCookieAuth";
        };
    });


builder.Services.AddDbContext<GentlemensClubContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("GentlemensClubConnectionString") ??
                         throw new InvalidOperationException("Connection string not found!")));
builder.Services.AddScoped<IBankService, BankService>();
builder.Services.AddScoped<IAccountService, AccountService>();

builder.Services.AddSingleton<IStockApiService>(x => new ApiHandlerStockService(builder.Configuration));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;

    var context = services.GetRequiredService<GentlemensClubContext>();

    DbInitializer.Initialize(context);
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
