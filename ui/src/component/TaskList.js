// import React, { useState } from 'react';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import IconButton from '@mui/material/IconButton';
// import TextField from '@mui/material/TextField';
// import Checkbox from '@mui/material/Checkbox';
// import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';
// import SaveIcon from '@mui/icons-material/Save'; // Added save icon
// import axios from 'axios';
// import { Grid, Typography } from '@mui/material';


// const TaskList = ({ tasks, setTasks, toggleTaskCompletion}) => {
//   const [editedTask, setEditedTask] = useState({ id: null, text: '' }); // Edited task state

//   const handleEditTask = (taskId, taskText) => {
//     setEditedTask({ id: taskId, text: taskText }); // Set the edited task with its ID and text
//   };

//   const handleSaveEditedTask = async (taskId, editedText) => {
//     try {
//       const response = await axios.put(`http://localhost:3001/tasks/${taskId}`, { task: editedText });

//       if (response.status === 200) {
//         const updatedTasks = tasks.map((task) =>
//           task._id === taskId ? { ...task, task: editedText } : task
//         );

//         setTasks(updatedTasks);
//         setEditedTask({ _id: null, task: '' }); // Reset the edited task state
//       } else {
//         console.error('Failed to update task:', response.data);
//       }
//     } catch (error) {
//       console.error('Error saving task:', error);
//     }
//   };
//   const handleDeleteTask = async (taskId) => {
//     try {
//       const response = await axios.delete(`http://localhost:3001/tasks/${taskId}`);

//       if (response.status === 200) {
//         const updatedTasks = tasks.filter((task) => task._id !== taskId);
//         setTasks(updatedTasks);
//       } else {
//         console.error('Failed to delete task:', response.data);
//       }
//     } catch (error) {
//       console.error('Error deleting task:', error);
//     }
//   };
  
//   return (
//     <Grid container spacing={2} sx={{marginTop:'2px'}}>
//     <List>
//       {tasks.map((task) => (
//         <ListItem key={task._id} sx={{ border: '3px solid #ccc', borderRadius: '4px', marginBottom: '8px' }}>
//           <Checkbox
//             checked={task.completed}
//             onChange={() => toggleTaskCompletion(task._id)}
//           />

//           {editedTask.id === task._id ? ( // Check if the task is being edited
//             <>
//               <TextField
//                 variant="outlined"
//                 value={editedTask.text}
//                 onChange={(e) => setEditedTask({ ...editedTask, text: e.target.value })}
//               />
//               <IconButton onClick={() => handleSaveEditedTask(task._id, editedTask.text)}> {/* Save button */}
//                 <SaveIcon style={{ color: '#2196F3' }} />
//               </IconButton>
//             </>
//           ) : (
            
//             <Grid container spacing={4} sx={{
//               alignItems:'center',
              
//             }}>
//               <Grid item xs={8} >
//               <Typography variant="outlined"
//                 InputProps={{ readOnly: true }}>
//                   {task.task}
//               </Typography>
//             </Grid>
//             <Grid item xs={2} sx={{marginLeft:''}}>
//               <IconButton onClick={() => handleEditTask(task._id, task.task)}> {/* Edit button */}
//                 <EditIcon style={{ color: '#4CAF50' }} />
//               </IconButton>
//               </Grid>
//               <Grid item xs={2}>
//               <IconButton onClick={() => handleDeleteTask(task._id)}>
//                 <DeleteIcon style={{ color: '#FF5722' }} />
//               </IconButton>
//             </Grid>
//             </Grid>
//           )}
//         </ListItem>
//       ))}
//     </List>
//     </Grid>
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
import SaveIcon from '@mui/icons-material/Save';
import axios from 'axios';
import { Grid, Typography } from '@mui/material';

const TaskList = ({ tasks, setTasks, toggleTaskCompletion }) => {
  const [editedTask, setEditedTask] = useState({ id: null, text: '' });

  const handleEditTask = (taskId, taskText) => {
    setEditedTask({ id: taskId, text: taskText });
  };

  const handleSaveEditedTask = async (taskId, editedText) => {
    try {
      const response = await axios.put(`http://localhost:3001/tasks/${taskId}`, { task: editedText });

      if (response.status === 200) {
        const updatedTasks = tasks.map((task) =>
          task._id === taskId ? { ...task, task: editedText } : task
        );

        setTasks(updatedTasks);
        setEditedTask({ _id: null, task: '' });
      } else {
        console.error('Failed to update task:', response.data);
      }
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const response = await axios.delete(`http://localhost:3001/tasks/${taskId}`);

      if (response.status === 200) {
        const updatedTasks = tasks.filter((task) => task._id !== taskId);
        setTasks(updatedTasks);
      } else {
        console.error('Failed to delete task:', response.data);
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };
  
  return (
    <Grid container spacing={2} sx={{ marginTop: '2px' }}>
      <List>
        {tasks.map((task) => (
          <ListItem key={task._id} sx={{ border: '3px solid #ccc', borderRadius: '4px', marginBottom: '8px', width: '100%',paddingRight: '150px' }}>
            <Checkbox
              checked={task.completed}
              onChange={() => toggleTaskCompletion(task._id)}
            />

            {editedTask.id === task._id ? (
              <>
                <TextField
                  variant="outlined"
                  value={editedTask.text}
                  sx={{ width: '100%' }}
                  onChange={(e) => setEditedTask({ ...editedTask, text: e.target.value })}
                />
                <IconButton onClick={() => handleSaveEditedTask(task._id, editedTask.text)}>
                  <SaveIcon style={{ color: '#2196F3' }} />
                </IconButton>
              </>
            ) : (
              <Grid container spacing={4} sx={{ alignItems: 'center' }}>
                <Grid item xs={8}>
                  <Typography variant="outlined" InputProps={{ readOnly: true }} sx={{ width: '100%' }}>
                    {task.task}
                  </Typography>
                </Grid>
                <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <IconButton onClick={() => handleEditTask(task._id, task.task)} sx={{position: 'absolute',right: '50px',}}>
                    <EditIcon style={{ color: '#4CAF50' }} />
                  </IconButton>
                </Grid>
                <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <IconButton onClick={() => handleDeleteTask(task._id)} sx={{position: 'absolute',right: '10px',margin:'center'}}>
                    <DeleteIcon style={{ color: '#FF5722' }} />
                  </IconButton>
                </Grid>
              </Grid>
            )}
          </ListItem>
        ))}
      </List>
    </Grid>
  );
};

export default TaskList;
