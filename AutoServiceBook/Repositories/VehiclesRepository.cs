using AutoServiceBook.Data;
using AutoServiceBook.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AutoServiceBook.Repositories
{
    public class VehiclesRepository : IRepository<Vehicle>
    {
        private readonly AppDbContext _context;
        public VehiclesRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task AddAsync(Vehicle entity)
        {
            _context.Vehicles.Add(entity);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int key)
        {
            var vehicle = await GetByIdAsync(key);

            if (vehicle == null)
                throw new InvalidOperationException($"Vehicle with a key {key} not found!");

            _context.Vehicles.Remove(vehicle);
            await _context.SaveChangesAsync();
        }

        public IEnumerable<Vehicle> GetAll()
            => _context.Vehicles;

        public async Task<Vehicle> GetByIdAsync(int key)
        {
            var vehicle = await _context.Vehicles.FindAsync(key);
            return vehicle;
        }

        public async Task<bool> UpdateAsync(Vehicle entity)
        {
            _context.Entry(entity).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!vehicleExists(entity.CarId))
                    return false;
                else
                    throw;
            }
            return true;
        }

        private bool vehicleExists(int id)
            => _context.Vehicles.Any(e => e.CarId == id);
    }
}
