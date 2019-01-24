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

        public async Task DeleteAsync(long key)
        {
            var vehicle = await GetByIdAsync(key);

            if (vehicle == null)
                throw new InvalidOperationException($"Vehicle with a key {key} not found!");

            _context.Vehicles.Remove(vehicle);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Vehicle>> GetAllAsync()
            => await _context.Vehicles.ToListAsync();

        public async Task<Vehicle> GetByIdAsync(long key)
        {
            var vehicle = await _context.Vehicles.FindAsync(key);
            return vehicle;
        }

        public async Task<Vehicle> GetByIdWithoutTrackingAsync(long key)
        {
            var vehicles = await _context.Vehicles.AsNoTracking().ToListAsync();
            var vehicle = vehicles.Find(v => v.VehicleId == key);
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
                if (!vehicleExists(entity.VehicleId))
                    return false;
                else
                    throw;
            }
            return true;
        }

        private bool vehicleExists(long id)
            => _context.Vehicles.Any(e => e.VehicleId == id);
    }
}