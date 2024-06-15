import React, { useState, useEffect } from "react";
import axios from "axios";
import Tasks from "../components/tasks";

const Home = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState([]);

  const getTasks = async () => {
    const res = await axios.get("http://localhost:5000/v1/tasks");

    console.log("Tasks Length ====> ", res.data.length);

    setTasks(res.data);
  }

  const addTask = async () => {
    if (title.length > 1 && description.length > 1) {
      const res = await axios.post("http://localhost:5000/v1/tasks", {
        title,
        description,
      });

      if (res.status === 201) {
        setTitle("");
        setDescription("");
        getTasks();
      } else {
        console.log("Error Creating Task ", res.data);
      }
    }
  };

  const deleteTask = async (id) => {
    setTasks(tasks.filter((task) => task._id !== id));
    const res = await axios.delete(`http://localhost:5000/v1/tasks/${id}`);
    if (res.status === 200) {
        getTasks()
    } else {
      console.log("Error Deleting Task ", res.data);
    }
  };

  const updateTask = async (id,status) => {
    console.log('ID :: ', id)
    console.log('STATUS :: ', status)
    const res = await axios.patch(
      `http://localhost:5000/v1/tasks/${id}`,{status});
    if (res.status === 200) {
      getTasks();
    } else {
      console.log("Error Updating Task ", res.data);
    }
}

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div>
      <h2 className="center">Add Tasks</h2>
      <div className="task-add">
        <input
          type="text"
          value={title}
          name="title"
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        <textarea
          type="text"
          value={description}
          name="description"
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        ></textarea>
        {/* <input type='text' value={description} name='descriptino' onChange={(e) => setDescription(e.target.value)} placeholder='Description'/> */}
        <button onClick={addTask}>Add</button>
      </div>

      <Tasks tasks={tasks} deleteTask={deleteTask} updateTask={updateTask} />
    </div>
  );
};

export default Home;
