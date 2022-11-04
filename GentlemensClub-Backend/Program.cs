using System.Text;
using GentlemensClub.Data;
using GentlemensClub.Services;
using GentlemensClub.Services.Interfaces;
using GentlemensClub.Services.Interfaces.Finance.Bank;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using GentlemensClub.Services.Interfaces.Finance.Stock;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using GentlemensClub.Services.Interfaces.Restaurant;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultSignInScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer("Bearer", options =>
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
});

builder.Services.AddDbContext<GentlemensClubContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("GentlemensClubConnectionString") ??
                      throw new InvalidOperationException("Connection string not found!")));
builder.Services.AddScoped<IBankService, BankService>();
builder.Services.AddScoped<IAccountService, AccountService>();
builder.Services.AddScoped<IRestaurantService, RestaurantService>();
builder.Services.AddScoped<IContactService, ContactService>();
builder.Services.AddScoped<IStockDatabaseService, DatabaseStockService>();

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