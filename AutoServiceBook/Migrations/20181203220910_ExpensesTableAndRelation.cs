using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace AutoServiceBook.Migrations
{
    public partial class ExpensesTableAndRelation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<decimal>(
                name: "Mileage",
                table: "Vehicles",
                nullable: false,
                oldClrType: typeof(long));

            migrationBuilder.CreateTable(
                name: "Expenses",
                columns: table => new
                {
                    ExpenseId = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    VehicleId = table.Column<long>(nullable: false),
                    Type = table.Column<int>(nullable: false),
                    Count = table.Column<long>(nullable: false),
                    Price = table.Column<decimal>(nullable: false),
                    Details = table.Column<string>(nullable: true),
                    Date = table.Column<DateTime>(nullable: true),
                    Mileage = table.Column<decimal>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Expenses", x => x.ExpenseId);
                    table.ForeignKey(
                        name: "FK_Expenses_Vehicles_VehicleId",
                        column: x => x.VehicleId,
                        principalTable: "Vehicles",
                        principalColumn: "VehicleId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Expenses_VehicleId",
                table: "Expenses",
                column: "VehicleId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Expenses");

            migrationBuilder.AlterColumn<long>(
                name: "Mileage",
                table: "Vehicles",
                nullable: false,
                oldClrType: typeof(decimal));
        }
    }
}
