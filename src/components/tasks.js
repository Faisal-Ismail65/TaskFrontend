import React from 'react'
import Task from './task'

const Tasks = ({tasks, deleteTask, updateTask}) => {
    


  return (
    <div>
        <div>
            <h2>Tasks</h2>
            {tasks.map(task => <Task key={task._id} task={task} deleteTask={deleteTask} updateTask={updateTask}/>)}
        </div>
    </div>
  )
}

export default Tasks