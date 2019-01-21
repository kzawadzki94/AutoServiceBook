using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;

namespace AutoServiceBook.Migrations
{
    public partial class Vehicles : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Vehicles",
                columns: table => new
                {
                    CarId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    OwnerId = table.Column<string>(nullable: false),
                    Type = table.Column<int>(nullable: false),
                    LicencePlate = table.Column<string>(nullable: false),
                    Make = table.Column<string>(nullable: false),
                    Model = table.Column<string>(nullable: false),
                    Year = table.Column<int>(nullable: false),
                    Vin = table.Column<string>(nullable: true),
                    EngineDisplacement = table.Column<int>(nullable: false),
                    Mileage = table.Column<long>(nullable: false),
                    RegisterDate = table.Column<DateTime>(nullable: false),
                    InsuranceExpireDate = table.Column<DateTime>(nullable: false),
                    NextServiceDate = table.Column<DateTime>(nullable: false),
                    InsuranceNumber = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Vehicles", x => x.CarId);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Vehicles");
        }
    }
}