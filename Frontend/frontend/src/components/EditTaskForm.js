import React, { useState } from 'react';
import { updateTask } from '../api/api';
import './TaskForm.css'; 

function EditTaskForm({ task, onTaskUpdated, onClose }) {
  const [formData, setFormData] = useState(task);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateTask(task.taskId, formData);
      onTaskUpdated();
      onClose();
    } catch (error) {
      alert('Failed to update task');
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h2>Edit Task</h2>
      <div className="form-group">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          placeholder="Title"
        />
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          placeholder="Description"
        />
        <input
          type="date"
          name="dueDate"
          value={formData.dueDate.split('T')[0]}
          onChange={handleChange}
          required
        />
        <select name="statusId" value={formData.statusId} onChange={handleChange}>
          <option value="Pending">Pending</option>
          <option value="InProgress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

      </div>
      <div className="form-actions">
        <button type="submit" className="submit-btn">Update</button>
        <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
      </div>
    </form>
  );
}

export default EditTaskForm;
