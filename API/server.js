const express = require('express');
const mongoose = require('mongoose');
const Tasks = require('./tasks/todoSchema');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors({ methods: ['GET', 'POST', 'PUT', 'DELETE'] }));

// Get all tasks
app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Tasks.find({});
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new task
app.post('/tasks', async (req, res) => {
  try {
    const newTask = req.body;
    newTask.completed = false;
    const task = await Tasks.create(newTask);
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a task
app.put('/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTask = req.body;
    const task = await Tasks.findByIdAndUpdate(id, updatedTask, { new: true });
    if (!task) {
      return res.status(404).json({ message: `Cannot find any task with ID ${id}` });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a task
app.delete('/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTask = await Tasks.findByIdAndDelete(id);
    if (!deletedTask) {
      return res.status(404).json({ message: `Cannot find any task with ID ${id}` });
    }
    res.status(200).json({ message: 'Task deleted successfully', success: true, deletedTask });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

mongoose.connect('mongodb+srv://kolheabhishek123:test123@todo.kbiyszf.mongodb.net/?retryWrites=true&w=majority&appName=Todo')
  .then(() => {
    app.listen(3001, () => {
      console.log(`Node API app is running on port 3001`);
    });
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.log(error);
  });

module.exports = app;
