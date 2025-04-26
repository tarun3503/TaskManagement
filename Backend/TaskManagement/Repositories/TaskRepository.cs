using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TaskManagement.Data;
using TaskManagement.Interfaces;
using TaskManagement.Models;

namespace TaskManagement.Repositories
{
    public class TaskRepository : ITaskRepository
    {
        private readonly AppDbContext _context;

        public TaskRepository(AppDbContext context) => _context = context;

        public async Task<IEnumerable<TaskItem>> GetAllTasksAsync() =>
            await _context.TaskItem.ToListAsync();

        public async Task<TaskItem> GetTaskByIdAsync(int id) =>
            await _context.TaskItem.FindAsync(id);

        public async Task AddTaskAsync(TaskItem task) => await _context.TaskItem.AddAsync(task);

        public Task UpdateTaskAsync(TaskItem task)
        {
            _context.TaskItem.Update(task);
            return Task.CompletedTask;
        }

        public Task DeleteTaskAsync(TaskItem task)
        {
            _context.TaskItem.Remove(task);
            return Task.CompletedTask;
        }

        public async Task<bool> SaveChangesAsync() => await _context.SaveChangesAsync() > 0;
    }
}