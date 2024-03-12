import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TaskForm from './component/TaskForm';
import TaskList from './component/TaskList';
import axios from 'axios';

const pageStyles = {
  backgroundColor: '#D0A2DA',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const boxStyles = {
  backgroundColor: '#fff',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  padding: '30px',
  maxWidth: '500px',
  margin: 'auto',
  marginTop: '50px',
};

const API_BASE_URL = 'http://localhost:3001/tasks';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [tabValue, setTabValue] = useState(0);

  console.log('Tasks before fetch:', tasks);




  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(API_BASE_URL);
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

 

    const PostTask = async (newTaskText) => {
      try {
        const response = await axios.post('http://localhost:3001/tasks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text: newTaskText }),
        });
    
        if (!response.ok) {
          throw new Error('Failed to add task');
        }
        const data = await response.json();
        setTasks((prevTasks) => [...prevTasks, data]);
      } catch (error) {
        console.error(error);
      }
    }
  
    

    fetchTasks();
    PostTask();
    
    
  }, [tasks.id]);

  const saveTasksToMockFile = (updatedTasks) => {
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const addTask = (newTask) => {
    const updatedTasks = [...tasks, { _id: Date.now(), text: newTask, completed: false }];
    setTasks(updatedTasks);
    saveTasksToMockFile(updatedTasks);
  };

  const toggleTaskCompletion = async(taskId) => {
    console.log('Toggle Task Completion called with taskId:', taskId);
    try {
      const response = await axios.put(`http://localhost:3001/tasks/${taskId}`, {
        completed: !tasks.find((task) => task._id === taskId).completed,
      });
      if (response.status === 200) {
        const updatedTasks = tasks.map((task) =>
          task._id === taskId ? { ...task, completed: !task.completed } : task
        );

        setTasks(updatedTasks);
        saveTasksToMockFile(updatedTasks);
      } else {
        console.error('Failed to update task:', response.data);
      }
    } catch (error) {
      console.error('Error toggling task completion:', error);
    }   
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task._id !== taskId);
    setTasks(updatedTasks);
    saveTasksToMockFile(updatedTasks);
  };
  

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <div style={pageStyles}>
      <Box style={boxStyles}>
        <Typography variant="h4" align="center" mb={3}>
          My To-Do List App
        </Typography>
        <TaskForm addTask={addTask} />
        <Tabs value={tabValue} onChange={handleChangeTab} aria-label="task count tabs">
          <Tab label="All Tasks" />
          <Tab label="Completed Tasks" />
          <Tab label="Incomplete Tasks" />
        </Tabs>
        <div>
          {tabValue === 0 && (
            <Typography variant="h6" style={{ marginTop: '20px' }}>
              Total Tasks: {tasks.length}
            </Typography>
          )}
          {tabValue === 1 && (
            <Typography variant="h6" style={{ marginTop: '20px' }}>
              Completed Tasks: {tasks.filter((task) => task.completed).length}
            </Typography>
          )}
          {tabValue === 2 && (
            <Typography variant="h6" style={{ marginTop: '20px' }}>
              Incomplete Tasks: {tasks.filter((task) => !task.completed).length}
            </Typography>
          )}
        </div>

        <TaskList
          tasks={
            tabValue === 0
              ? tasks
              : tabValue === 1
              ? tasks.filter((task) => task.completed)
              : tasks.filter((task) => !task.completed)
          }
          setTasks={setTasks}
          toggleTaskCompletion={toggleTaskCompletion}
          deleteTask={deleteTask}
        />
      </Box>
    </div>
  );
};

export default App;