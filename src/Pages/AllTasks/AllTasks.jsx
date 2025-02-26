import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CategoryCard from '../CategoryCard/CategoryCard';
import { div } from 'framer-motion/client';


const AllTasks = () => {
  const [tasks, setTasks] = useState([]);
  
  useEffect(() => {
    // Fetch tasks from the API
    axios.get('http://localhost:2000/tasks')
      .then(response => {
        setTasks(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the tasks!", error);
      });
  }, []);

  // Function to get tasks by category
  const getTasksByCategory = (category) => {
    return tasks.filter(task => task.category === category);
  };

  return (
   <div className='flex justify-center items-center'>
     <div className='flex flex-col md:flex-row gap-3'>
      {/* Render CategoryCard components for each category */}
      <CategoryCard
        category="To-Do" 
        tasks={getTasksByCategory('To-Do')} 
      />
      <CategoryCard 
        category="In Progress" 
        tasks={getTasksByCategory('In Progress')} 
      />
      <CategoryCard 
        category="Done" 
        tasks={getTasksByCategory('Done')} 
      />
    </div>
   </div>
  );
};

export default AllTasks;
