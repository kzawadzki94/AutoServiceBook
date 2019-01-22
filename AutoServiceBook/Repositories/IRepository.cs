using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AutoServiceBook.Repositories
{
    public interface IRepository<T> where T : class
    {
        Task AddAsync(T entity);

        Task DeleteAsync(long key);

        Task<IEnumerable<T>> GetAllAsync();

        Task<T> GetByIdAsync(long key);

        Task<T> GetByIdWithoutTrackingAsync(long key);

        Task<bool> UpdateAsync(T entity);
    }
}