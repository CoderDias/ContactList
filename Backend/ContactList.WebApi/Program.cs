using ContactList.Domain.Services;
using ContactList.Infraestructure.Database;
using ContactList.Infraestructure.Repositories;
using Microsoft.EntityFrameworkCore;
using System;

namespace ContactList.WebApi
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.AddDbContext<AppDbContext>(options =>
                options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"))
            );

            // Add scoped services
            builder.Services.AddScoped<IContactRepository, ContactRepository>();

            // Add services to the container.
            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            // Configure CORS to be able to interact with frontend.
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("Origins", policy =>
                {
                    policy
                    .WithOrigins("http://localhost:4200")
                    .AllowAnyHeader()
                    .AllowAnyMethod();
                });
            });

            // Build WebApplication
            var app = builder.Build();

            // Apply Migrations
            using (var scope = app.Services.CreateScope())
            {
                var services = scope.ServiceProvider;

                var context = services.GetRequiredService<AppDbContext>();
                if (context.Database.GetPendingMigrations().Any())
                {
                    context.Database.Migrate();
                }
            }

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            // Use CORS
            app.UseCors("Origins");

            // Seed data
            app.UseSeedDataMiddleware();

            app.UseAuthorization();
            app.MapControllers();
            app.Run();
        }
    }
}
