using System.ComponentModel.DataAnnotations;

namespace AutoServiceBook.Models.Requests
{
    public class SignInRequest
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }
    }
}