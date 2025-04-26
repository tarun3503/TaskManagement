import React, { useEffect, useState } from 'react';
import { getTasks, deleteTask } from '../api/api';
import TaskForm from './TaskForm';
import EditTaskForm from './EditTaskForm';
import './TaskTable.css';

function TaskTable() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [sortKey, setSortKey] = useState('DueDate');
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 5;

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const res = await getTasks();
      setTasks(res.data);
    } catch (error) {
      alert('Failed to fetch tasks');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    try {
      await deleteTask(id);
      loadTasks();
    } catch (error) {
      alert('Delete failed');
    }
  };

  const handleSort = (key) => {
    setSortKey(key);
    const sorted = [...tasks].sort((a, b) => a[key] > b[key] ? 1 : -1);
    setTasks(sorted);
  };

  const paginatedTasks = tasks.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const totalPages = Math.ceil(tasks.length / pageSize);

  return (
    <div className="task-table-container">
      <div className="header-container">
        <h1 className="main-title">📋 Task Manager</h1>
      </div>

      {/* Showing Add Form */}
      {showForm && (
        <TaskForm onTaskAdded={loadTasks} onClose={() => setShowForm(false)} />
      )}
      {/* Showing Edit Form */}
      {editingTask && (
        <EditTaskForm task={editingTask} onTaskUpdated={loadTasks} onClose={() => setEditingTask(null)} />
      )}

      {!showForm && !editingTask && (
        <>
          <div className="sub-header">
            <h2>🗂️ My Tasks</h2>
            <button className="add-btn" onClick={() => setShowForm(true)}>➕ Add Task</button>
          </div>

          {tasks.length === 0 ? (
            <p className="no-tasks">No tasks found. Click "Add Task" to create one.</p>
          ) : (
            <>
              <table className="task-table">
                <thead>
                  <tr>
                    <th onClick={() => handleSort('title')}>Title ⬍</th>
                    <th onClick={() => handleSort('description')}>Description ⬍</th>
                    <th onClick={() => handleSort('dueDate')}>Due Date ⬍</th>
                    <th onClick={() => handleSort('status')}>Status ⬍</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedTasks.map((task) => (
                    <tr key={task.taskId}>
                      <td>{task.title}</td>
                      <td>{task.description}</td>
                      <td>{new Date(task.dueDate).toLocaleDateString()}</td>
                      <td>{task.statusId}</td> 
                      <td>
                        <button className="edit-btn" onClick={() => setEditingTask(task)}> ✏️ Edit</button>
                        <button className="delete-btn" onClick={() => handleDelete(task.taskId)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="pagination">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    className={i + 1 === currentPage ? 'active' : ''}
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default TaskTable;
