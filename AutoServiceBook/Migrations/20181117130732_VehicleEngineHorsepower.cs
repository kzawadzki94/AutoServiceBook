﻿using Microsoft.EntityFrameworkCore.Migrations;

namespace AutoServiceBook.Migrations
{
    public partial class VehicleEngineHorsepower : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "EngineHorsepower",
                table: "Vehicles",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EngineHorsepower",
                table: "Vehicles");
        }
    }
}