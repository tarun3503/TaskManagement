using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using TaskManagement.DTOs;
using TaskManagement.Interfaces;

namespace TaskManagement.Controllers
{
    [ApiController]
    [Route("api/Task")]
    public class TasksController : ControllerBase
    {
        private readonly ITaskService _service;

        public TasksController(ITaskService service) => _service = service;

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var tasks = await _service.GetAllTasksAsync();
                return Ok(tasks);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] TaskDto dto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            try
            {
                var result = await _service.CreateTaskAsync(dto);
                return result ? Ok("Task created successfully.") : StatusCode(500, "Failed to create task.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, TaskDto dto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            try
            {
                var result = await _service.UpdateTaskAsync(id, dto);
                return result ? Ok("Task updated successfully.") : NotFound("Task not found.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var result = await _service.DeleteTaskAsync(id);
                return result ? Ok("Task deleted successfully.") : NotFound("Task not found.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}