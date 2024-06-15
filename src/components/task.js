import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';

const Task = ({ task, deleteTask, updateTask }) => {

    

  const handleCheckboxChange = (e) => {
    updateTask(task._id, e.target.checked ? 'completed' : 'active' );
  };

  const handleDeleteTask = () => {
    deleteTask(task._id);
  };

  return (
    <div className="task-spacing task">
      <div className={task.status === 'completed' ? 'stroke' : ''}>
        <h5>{task.title}</h5>
        <p>{task.description}</p>
      </div>
      <div className='task-controls'>
        <input
          type="checkbox"
          checked={task.status === 'completed'}
          onChange={handleCheckboxChange} />
        <FaTrashAlt onClick={handleDeleteTask} style={{ cursor: 'pointer', height: '30px', width : '30px'}} /> 
      </div>
    </div>
  );
};

export default Task;
