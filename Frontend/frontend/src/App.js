import React from 'react';
import TaskTable from './components/TaskTable';
import './styles/App.css';

function App() {
  return (
    <div className="app-container">
      <h1>Task Manager</h1>
      <TaskTable />
    </div>
  );
}

export default App;