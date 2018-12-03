using Microsoft.AspNetCore.Identity;
using System.Collections;
using System.Collections.Generic;

namespace AutoServiceBook.Models
{
    public class AppUser : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public ICollection<Vehicle> Vehicles { get; set; }
    }
}