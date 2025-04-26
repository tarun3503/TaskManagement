import React, { useState } from 'react';
import { addTask } from '../api/api';
import './TaskForm.css';

function TaskForm({ onTaskAdded, onClose }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    status: 'InProgress'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description) {
      alert('Title and Description are required.');
      return;
    }

    try {
      await addTask(formData);
      onTaskAdded();  // refresh task list
      onClose();      // close the form
    } catch (error) {
      alert('Failed to add task');
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h2>Add Task</h2>
      <div className="form-group">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
          required
        />
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="Pending">Pending</option>
          <option value="InProgress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
      <div className="form-actions">
        <button type="submit" className="submit-btn">Add</button>
        <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
      </div>
    </form>
  );
}

export default TaskForm;
