using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace SneakersShop.API.Attributes
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
    public class ApiKeyAuthAttribute : Attribute, IAuthorizationFilter
    {
        public void OnAuthorization(AuthorizationFilterContext context)
        {
            var isApiKeyValid = context.HttpContext.Items["IsApiKeyValid"] as bool?;
            if (isApiKeyValid != true)
            {
                context.Result = new UnauthorizedResult();
            }
        }
    }
}
