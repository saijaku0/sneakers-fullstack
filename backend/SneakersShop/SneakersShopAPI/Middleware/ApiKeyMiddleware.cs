using SneakersShop.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace SneakersShop.API.Middleware
{
    public class ApiKeyMiddleware(RequestDelegate next)
    {
        private readonly RequestDelegate _next = next;

        public async Task InvokeAsync(HttpContext context, IServiceProvider serviceProvider)
        {
            string? authHeader = context.Request.Headers["Authorization"];

            if (string.IsNullOrEmpty(authHeader) || !authHeader.StartsWith("Bearer ", StringComparison.OrdinalIgnoreCase))
            {
                await _next(context);
                return;
            }
            
            var extractedApiKey = authHeader.Substring("Bearer ".Length).Trim();

            if (!extractedApiKey.StartsWith("sk_"))
            {
                await _next(context);
                return;
            }

            using (var scope = serviceProvider.CreateScope())
            {
                var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

                var apiKey = await dbContext.ApiKeys
                    .FirstOrDefaultAsync(k => k.Key == extractedApiKey && k.IsActive);

                if (apiKey != null)
                {
                    context.Items["IsApiKeyValid"] = true;
                    context.Items["ApiClientName"] = apiKey.OwnerName;
                }
            }

            await _next(context);
        }
    }
}
