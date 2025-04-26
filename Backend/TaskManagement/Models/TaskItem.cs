using System;
using System.ComponentModel.DataAnnotations;

namespace TaskManagement.Models
{
    public enum TaskStatus { Pending, InProgress, Completed }

    public class TaskItem
    {
        [Key]
        public int TaskId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime DueDate { get; set; }
        public TaskStatus StatusId { get; set; }
    }
}