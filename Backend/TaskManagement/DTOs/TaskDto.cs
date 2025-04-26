using System;
using TaskManagement.Models;

namespace TaskManagement.DTOs
{
    public class TaskDto
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime DueDate { get; set; }
        public TaskManagement.Models.TaskStatus Status { get; set; }

    }
}