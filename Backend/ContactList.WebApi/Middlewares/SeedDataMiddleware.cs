using ContactList.Infraestructure.Database;

public class SeedDataMiddleware
{
    private readonly RequestDelegate _next;

    public SeedDataMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task Invoke(HttpContext context, IServiceProvider serviceProvider)
    {
        // Seed data
        SeedData.Initialize(serviceProvider);

        await _next(context);
    }
}

public static class MiddlewareExtensions
{
    public static IApplicationBuilder UseSeedDataMiddleware(this IApplicationBuilder builder)
    {
        return builder.UseMiddleware<SeedDataMiddleware>();
    }
}