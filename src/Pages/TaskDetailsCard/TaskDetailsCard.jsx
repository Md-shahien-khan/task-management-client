import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TaskDetailsCard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch tasks from the backend
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:2000/tasks');
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  // Handle delete task
  const handleDelete = async (taskId) => {
    try {
      await axios.delete(`http://localhost:2000/tasks/${taskId}`);
      setTasks(tasks.filter(task => task._id !== taskId)); // Remove the task from the list
      alert('Task deleted successfully!');
    } catch (error) {
      console.error('Error deleting task:', error);
      alert('Error deleting task');
    }
  };

  // Handle update task (you can expand it with a modal or form to update task details)
  const handleUpdate = (taskId) => {
    alert(`Updating task with ID: ${taskId}`);
    // Logic for updating the task can be added here
  };

  const renderTaskCard = (category) => {
    const categoryTasks = tasks.filter(task => task.category === category);

    return (
      <div className="task-card">
        <h3 className="text-center text-xl font-semibold">{category} Tasks</h3>
        {categoryTasks.length > 0 ? (
          categoryTasks.map(task => (
            <div key={task._id} className="task-card-item p-4 border my-2 rounded-md shadow-md">
              <h4 className="font-semibold">{task.title}</h4>
              <p>{task.description}</p>
              <p><strong>Due Date:</strong> {task.date}</p>
              <div className="flex justify-between mt-4">
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  onClick={() => handleUpdate(task._id)}
                >
                  Update
                </button>
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                  onClick={() => handleDelete(task._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No tasks in this category.</p>
        )}
      </div>
    );
  };

  if (loading) {
    return <div>Loading tasks...</div>;
  }

  return (
    <div className="p-6 flex flex-col md:flex-row justify-center gap-8">
      {/* To-Do Tasks */}
      <div className="w-full max-w-xs border-2 p-4">
        {renderTaskCard('To-Do')}
      </div>
      {/* In Progress Tasks */}
      <div className="w-full max-w-xs  border-2 p-4">
        {renderTaskCard('In Progress')}
      </div>
      {/* Done Tasks */}
      <div className="w-full max-w-xs border-2 p-4">
        {renderTaskCard('Done')}
      </div>
    </div>
  );
};

export default TaskDetailsCard;
