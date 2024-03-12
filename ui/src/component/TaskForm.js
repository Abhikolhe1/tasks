// TaskForm.js

import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
// import AddIcon from '@mui/icons-material/Add';
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
          sx={{ marginRight: '10px',width: '100%',paddingRight: '50px' }}  
        />
        <Button sx={{fontSize: '2rem',position: 'absolute',marginLeft:'400px'}}>
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M17 13h-4v4h-2v-4H7v-2h4V7h2v4h4m-5-9A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2"></path></svg>
        </Button>
        {/* <Button type="submit" variant="contained" color="primary" startIcon={<AddIcon />} style={{backgroundColor: '#FFCE33'}} >
          Add Task
        </Button> */}
      </Box>
    </form>
  );
};

export default TaskForm;