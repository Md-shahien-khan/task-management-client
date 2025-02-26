import React from 'react';
import EachTaskCard from '../EachTaskCard/EachTaskCard';


const CategoryCard = ({ category, tasks }) => {
  return (
    <div className="category-card border-2 p-3">
      <h3>{category}</h3>
      <div className="tasks">
        {tasks.length === 0 ? (
          <p>No tasks in this category</p>
        ) : (
          tasks.map(task => (
            <EachTaskCard key={task._id} task={task} />
          ))
        )}
      </div>
    </div>
  );
};

export default CategoryCard;
