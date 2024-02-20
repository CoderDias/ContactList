using ContactList.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace ContactList.Infraestructure.Database
{
    public static class SeedData
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            using var context = new AppDbContext(serviceProvider.GetRequiredService<DbContextOptions<AppDbContext>>());

            if (context.Set<Contact>().Any())
            {
                return;
            }

            context.Set<Contact>().AddRange(
                new Contact { Name = "John Doe", Email = "john@doe.com", Phone = "+5547988883333" },
                new Contact { Name = "Sara Smith", Email = "sara@smith.com", Phone = "+5547988883333" },
                new Contact { Name = "John Smith", Email = "john@smith.com", Phone = "+5547988883333" }
            );

            context.SaveChanges();
        }
    }
}
