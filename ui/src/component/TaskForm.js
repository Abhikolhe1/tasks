// TaskForm.js

import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';

const TaskForm = ({ addTask }) => {
  const [task, setTask] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!task.trim()) return;
    try {
 
      const response = await axios.post('http://localhost:3001/tasks', { task: task });
      
      addTask(response.data);
    } catch (error) {
      console.error('Error creating task:', error);
    }
    // addTask(task);
    setTask('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box display="flex" alignItems="center" mb={2}>
        <TextField
          label="Create some task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          style={{ marginRight: '10px' }}  
        />
        <Button type="submit" variant="contained" color="primary" startIcon={<AddIcon />} style={{backgroundColor: '#FFCE33'}} >
          Add Task
        </Button>
      </Box>
    </form>
  );
};

export default TaskForm;