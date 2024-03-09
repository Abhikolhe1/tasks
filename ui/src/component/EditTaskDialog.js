// EditTaskDialog.js
import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';

const EditTaskDialog = ({ open, onClose, onSave, initialText, addTask }) => {
  const [editedText, setEditedText] = useState(initialText);
  const [task, setTask] = useState('');

  const handleChange = (event) => {
    setEditedText(event.target.value);
  };

  const handleSave = (event) => {
    event.preventDefault();
    onSave(editedText);
    onClose();
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!task.trim()) return;
    try {
      const response = await axios.post('http://localhost:3001/tasks', { task: task });
      addTask(response.data);
    } catch (error) {
      console.error('Error creating task:', error);
    }
    addTask(task);
    setTask('');
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Task</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSave} onSave={handleSubmit}>
          <TextField
            autoFocus
            margin="dense"
            label="Task"
            fullWidth
            value={editedText}
            onChange={handleChange}
            
          />
          <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="submit" color="primary">
              Save
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditTaskDialog;
