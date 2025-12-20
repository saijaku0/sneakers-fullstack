using SneakersShop.Application.Interfaces;

namespace SneakersShop.Infrastructure.Services
{
    public class EmailService : IEmailService
    {
        public async Task SendEmailAsync(string to, string subject, string body)
        {
            // Here you would implement the actual email sending logic,
            // for example using SMTP or a third-party email service API.
            // For demonstration purposes, we'll just simulate an async operation.
            await Task.Delay(500); // Simulate some delay
            Console.WriteLine($"Email sent to {to} with subject '{subject}' and body:\n{body}");
        }
    }
}
