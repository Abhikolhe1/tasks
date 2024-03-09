// import React, { useState } from 'react';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import IconButton from '@mui/material/IconButton';
// import TextField from '@mui/material/TextField';
// import Checkbox from '@mui/material/Checkbox';
// import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';
// import axios from 'axios';

// const TaskList = ({ tasks, setTasks, toggleTaskCompletion, deleteTask }) => {
//   const [editedTask, setEditedTask] = useState(null);

//   const handleEditTask = (taskId) => {
//     const taskToEdit = tasks.find((task) => task._id === taskId);
//     setEditedTask(taskToEdit);
//   };

//   const handleSaveEditedTask = async (editedText, taskId) => {
//     try {
//       if (!taskId) {
//         // If taskId is not defined, it means it's a new task
//         const response = await axios.post('/tasks', { task: editedText, completed: false });

//         if (response.status === 201) {
//           // Successful creation of a new task
//           setTasks((prevTasks) => [...prevTasks, response.data]);
//         } else {
//           console.error('Failed to create task:', response.data);
//         }
//       } else {
//         // Updating an existing task
//         const response = await axios.put(`/tasks/${taskId}`, { text: editedText });

//         if (response.status === 200) {
//           const updatedTasks = tasks.map((task) =>
//             task._id === taskId ? { ...task, text: editedText } : task
//           );

//           setTasks(updatedTasks);
//           setEditedTask(null);
//         } else {
//           console.error('Failed to update task:', response.data);
//         }
//       }
//     } catch (error) {
//       console.error('Error saving task:', error);
//     }
//   };

//   return (
//     <List>
//       {tasks.map((task) => (
//         <ListItem key={task._id}>
//           <Checkbox
//             checked={task.completed}
//             onChange={() => toggleTaskCompletion(task._id)}
//           />

//           {editedTask && editedTask._id === task._id ? (
//             <TextField
//               variant="outlined"
//               value={editedTask.text}
//               onChange={(e) => setEditedTask({ ...editedTask, text: e.target.value })}
//               onBlur={() => handleSaveEditedTask(editedTask.text, editedTask._id)}
//             />
//           ) : (
//             <div>
//               <TextField
//                 variant="outlined"
//                 value={task.task}
//                 defaultValue={task.text}
//                 InputProps={{ readOnly: true }}
//               />
//               <IconButton onClick={() => handleEditTask(task._id)}>
//                 <EditIcon style={{ color: '#4CAF50' }} />
//               </IconButton>
//               <IconButton onClick={() => deleteTask(task._id)}>
//                 <DeleteIcon style={{ color: '#FF5722' }} />
//               </IconButton>
//             </div>
//           )}
//         </ListItem>
//       ))}
//     </List>
//   );
// };

// export default TaskList;

import React, { useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';

const TaskList = ({ tasks, setTasks, toggleTaskCompletion, deleteTask }) => {
  const [editedTask, setEditedTask] = useState(null);

  const handleEditTask = (taskId) => {
    const taskToEdit = tasks.find((task) => task._id === taskId);
    setEditedTask(taskToEdit);
  };

  const handleSaveEditedTask = async (editedText, taskId) => {
    try {
      const response = await axios.put(`/tasks/${taskId}`, { text: editedText });

      if (response.status === 200) {
        const updatedTasks = tasks.map((task) =>
          task._id === taskId ? { ...task, text: editedText } : task
        );

        setTasks(updatedTasks);
        setEditedTask(null);
      } else {
        console.error('Failed to update task:', response.data);
      }
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  return (
    <List>
      {tasks.map((task) => (
        <ListItem key={task._id}>
          <Checkbox
            checked={task.completed}
            onChange={() => toggleTaskCompletion(task._id)}
          />

          {editedTask && editedTask._id === task._id ? (
            <TextField
              variant="outlined"
              value={editedTask.task}
              onChange={(e) => setEditedTask({ ...editedTask, task: e.target.value })}
              onBlur={() => handleSaveEditedTask(editedTask.task, editedTask._id)}
            />
          ) : (
            <div>
              <TextField
                variant="outlined"
                value={task.task}
                InputProps={{ readOnly: true }}
              />
              <IconButton onClick={() => handleEditTask(task._id)}>
                <EditIcon style={{ color: '#4CAF50' }} />
              </IconButton>
              <IconButton onClick={() => deleteTask(task._id)}>
                <DeleteIcon style={{ color: '#FF5722' }} />
              </IconButton>
            </div>
          )}
        </ListItem>
      ))}
    </List>
  );
};

export default TaskList;
