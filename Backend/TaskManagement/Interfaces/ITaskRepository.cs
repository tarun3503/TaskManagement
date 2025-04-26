using System.Collections.Generic;
using System.Threading.Tasks;
using TaskManagement.Models;

namespace TaskManagement.Interfaces
{
    public interface ITaskRepository
    {
        Task<IEnumerable<TaskItem>> GetAllTasksAsync();
        Task<TaskItem> GetTaskByIdAsync(int id);
        Task AddTaskAsync(TaskItem task);
        Task UpdateTaskAsync(TaskItem task);
        Task DeleteTaskAsync(TaskItem task);
        Task<bool> SaveChangesAsync();
    }
}