using System.Collections.Generic;
using System.Threading.Tasks;
using TaskManagement.DTOs;
using TaskManagement.Interfaces;
using TaskManagement.Models;

namespace TaskManagement.Services
{
    public class TaskService : ITaskService
    {
        private readonly ITaskRepository _repo;

        public TaskService(ITaskRepository repo) => _repo = repo;

        public async Task<IEnumerable<TaskItem>> GetAllTasksAsync() => await _repo.GetAllTasksAsync();

        public async Task<TaskItem?> GetTaskByIdAsync(int id) => await _repo.GetTaskByIdAsync(id);

        public async Task<bool> CreateTaskAsync(TaskDto dto)
        {
            var task = new TaskItem
            {
                Title = dto.Title,
                Description = dto.Description,
                DueDate = dto.DueDate,
                StatusId = (Models.TaskStatus)dto.Status
            };

            await _repo.AddTaskAsync(task);
            return await _repo.SaveChangesAsync();
        }

        public async Task<bool> UpdateTaskAsync(int id, TaskDto dto)
        {
            var task = await _repo.GetTaskByIdAsync(id);
            if (task == null) return false;

            task.Title = dto.Title;
            task.Description = dto.Description;
            task.DueDate = dto.DueDate;
            task.StatusId = (Models.TaskStatus)dto.Status;

            await _repo.UpdateTaskAsync(task);
            return await _repo.SaveChangesAsync();
        }

        public async Task<bool> DeleteTaskAsync(int id)
        {
            var task = await _repo.GetTaskByIdAsync(id);
            if (task == null) return false;

            await _repo.DeleteTaskAsync(task);
            return await _repo.SaveChangesAsync();
        }
    }
}