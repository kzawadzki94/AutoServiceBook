using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AutoServiceBook.Models
{
    public class Vehicle
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long VehicleId { get; set; }

        [Required(ErrorMessage = "The OwnerId is required.")]
        [ForeignKey("Id")]
        public string OwnerId { get; set; }

        public AppUser Owner { get; set; }

        [Required(ErrorMessage = "The vehicle type is required.")]
        public VehicleType Type { get; set; }

        [Required(ErrorMessage = "The licence plate is required.")]
        [MinLength(2, ErrorMessage = "The licence plate must be at least 2 characters long.")]
        public string LicencePlate { get; set; }

        [Required(ErrorMessage = "The make is required.")]
        [MinLength(2, ErrorMessage = "The make must be at least 2 characters long.")]
        public string Make { get; set; }

        [Required(ErrorMessage = "The model is required.")]
        [MinLength(2, ErrorMessage = "The model must be at least 2 characters long.")]
        public string Model { get; set; }

        [Required(ErrorMessage = "The year is required.")]
        [Range(1900, 3000, ErrorMessage = "The year value must be between 1900 and 3000")]
        public int? Year { get; set; }

        [Required(ErrorMessage = "The fuel type is required.")]
        public FuelType FuelType { get; set; }

        public string Vin { get; set; }

        public int EngineDisplacement { get; set; }

        public int EngineHorsepower { get; set; }

        public ulong Mileage { get; set; }

        [DataType(DataType.Date)]
        public DateTime? RegisterDate { get; set; }

        [DataType(DataType.Date)]
        public DateTime? InsuranceExpireDate { get; set; }

        [DataType(DataType.Date)]
        public DateTime? NextServiceDate { get; set; }

        public string InsuranceNumber { get; set; }

        public ICollection<Expense> Expenses { get; set; }
    }
}