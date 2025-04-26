import React, { useEffect, useState } from 'react';
import { getTasks, deleteTask } from '../api/api';
import TaskForm from './TaskForm';
import EditTaskForm from './EditTaskForm';
import { FaClipboardList, FaFolder, FaPlus, FaEdit, FaTrashAlt, FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';
import './TaskTable.css';

function TaskTable() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [sortKey, setSortKey] = useState('dueDate');
  const [sortDirection, setSortDirection] = useState('asc');
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
    let direction = 'asc';
    if (key === sortKey && sortDirection === 'asc') {
      direction = 'desc';
    }
    setSortKey(key);
    setSortDirection(direction);

    const sorted = [...tasks].sort((a, b) => {
      const valA = a[key];
      const valB = b[key];

      if (valA < valB) {
        return direction === 'asc' ? -1 : 1;
      }
      if (valA > valB) {
        return direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
    setTasks(sorted);
  };

  const paginatedTasks = tasks.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const totalPages = Math.ceil(tasks.length / pageSize);

  const renderSortIcon = (columnKey) => {
    if (sortKey !== columnKey) {
      return <FaSort />;
    }
    if (sortDirection === 'asc') {
      return <FaSortUp />;
    }
    return <FaSortDown />;
  };

  return (
    <div className="task-table-container">
      <div className="header-container">
        <h1 className="main-title"><FaClipboardList /> Task Manager</h1>
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
            <h2><FaFolder color='#F8D775'/> My Tasks</h2>
            <button className="add-btn" onClick={() => setShowForm(true)}><FaPlus /> Add Task</button>
          </div>

          {tasks.length === 0 ? (
            <p className="no-tasks">No tasks found. Click "Add Task" to create one.</p>
          ) : (
            <>
              <table className="task-table">
                <thead>
                  <tr>
                    <th onClick={() => handleSort('title')}>Title {renderSortIcon('title')}</th>
                    <th onClick={() => handleSort('description')}>Description {renderSortIcon('description')}</th>
                    <th onClick={() => handleSort('dueDate')}>Due Date {renderSortIcon('dueDate')}</th>
                    <th onClick={() => handleSort('statusId')}>Status {renderSortIcon('statusId')}</th>
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
                        <button className="edit-btn" onClick={() => setEditingTask(task)}> <FaEdit /> Edit</button>
                        <button className="delete-btn" onClick={() => handleDelete(task.taskId)}><FaTrashAlt /> Delete</button>
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
