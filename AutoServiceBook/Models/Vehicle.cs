using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AutoServiceBook.Models
{
    public class Vehicle
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long VehicleId { get; set; }

        [Required]
        public string OwnerId { get; set; }

        [Required]
        public VehicleType Type { get; set; }

        [Required]
        public string LicencePlate { get; set; }

        [Required]
        public string Make { get; set; }

        [Required]
        public string Model { get; set; }

        [Required]
        public int Year { get; set; }

        [Required]
        public FuelType FuelType { get; set; }

        public string Vin { get; set; }

        public int EngineDisplacement { get; set; }

        public int EngineHorsepower { get; set; }

        public long Mileage { get; set; }

        [DataType(DataType.Date)]
        public DateTime RegisterDate { get; set; }

        [DataType(DataType.Date)]
        public DateTime InsuranceExpireDate { get; set; }

        [DataType(DataType.Date)]
        public DateTime NextServiceDate { get; set; }

        public string InsuranceNumber { get; set; }
    }
}
