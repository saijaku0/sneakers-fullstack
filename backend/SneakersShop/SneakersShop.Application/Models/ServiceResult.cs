namespace SneakersShop.Application.Models
{
    public class ServiceResult<T>
    {
        public bool Success { get; set; }
        public string ErrorMessage { get; set; } = string.Empty;
        public T Data { get; set; }
        public bool IsConcurrencyError { get; set; }

        public static ServiceResult<T> Ok(T data)                                                       => new() 
            { Success = true, Data = data };
        public static ServiceResult<T> Fail(string errorMessage, bool isConcurrencyError = false)       => new() 
            { Success = false, ErrorMessage = errorMessage, IsConcurrencyError = isConcurrencyError };
        public static ServiceResult<T> Conflict(string errorMessage, bool isConcurrencyError = false)   => new() 
            { Success = false, ErrorMessage = errorMessage, IsConcurrencyError = isConcurrencyError };

    }
}
