using System.Collections.Generic;
using System.Threading.Tasks;
using TaskManagement.DTOs;
using TaskManagement.Models;

namespace TaskManagement.Interfaces
{
    public interface ITaskService
    {
        Task<IEnumerable<TaskItem>> GetAllTasksAsync();
        Task<TaskItem?> GetTaskByIdAsync(int id);
        Task<bool> CreateTaskAsync(TaskDto dto);
        Task<bool> UpdateTaskAsync(int id, TaskDto dto);
        Task<bool> DeleteTaskAsync(int id);
    }
}