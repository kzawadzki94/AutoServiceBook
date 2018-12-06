using AutoServiceBook.Data;
using AutoServiceBook.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AutoServiceBook.Repositories
{
    public class ExpensesRepository : IRepository<Expense>
    {
        private readonly AppDbContext _context;
        private readonly IRepository<Vehicle> _vehicleRepo;

        public ExpensesRepository(AppDbContext context, IRepository<Vehicle> vehicleRepo)
        {
            _context = context;
            _vehicleRepo = vehicleRepo;
        }

        public async Task AddAsync(Expense entity)
        {
            _context.Expenses.Add(entity);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(long key)
        {
            var expense = await GetByIdAsync(key);

            if (expense == null)
                throw new InvalidOperationException($"Expense with a key {key} not found!");

            _context.Expenses.Remove(expense);
            await _context.SaveChangesAsync();
        }

        public IEnumerable<Expense> GetAll()
            => _context.Expenses;

        public async Task<Expense> GetByIdAsync(long key)
        {
            var expense = await _context.Expenses.FindAsync(key);
            return expense;
        }

        public async Task<Expense> GetByIdWithoutTrackingAsync(long key)
        {
            var expenses = await _context.Expenses.AsNoTracking().ToListAsync();
            var expense = expenses.Find(e => e.ExpenseId == key);
            return expense;
        }

        public async Task<bool> UpdateAsync(Expense entity)
        {
            _context.Entry(entity).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!expenseExists(entity.ExpenseId))
                    return false;
                else
                    throw;
            }
            return true;
        }

        private bool expenseExists(long id)
            => _context.Expenses.Any(e => e.ExpenseId == id);
    }
}