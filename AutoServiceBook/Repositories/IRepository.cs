using System.Collections.Generic;
using System.Threading.Tasks;

namespace AutoServiceBook.Repositories
{
    public interface IRepository<T> where T : class
    {
        Task AddAsync(T entity);

        Task DeleteAsync(long key);

        IEnumerable<T> GetAll();

        Task<T> GetByIdAsync(long key);

        Task<bool> UpdateAsync(T entity);
    }
}