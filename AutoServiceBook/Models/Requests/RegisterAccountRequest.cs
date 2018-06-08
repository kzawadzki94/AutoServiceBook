using System.ComponentModel.DataAnnotations;

namespace AutoServiceBook.Models.Requests
{
    public class RegisterAccountRequest
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }
    }
}