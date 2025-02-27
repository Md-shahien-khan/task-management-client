import axios from 'axios';
import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';


const EachTaskCard = ({ task }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatedTask, setUpdatedTask] = useState(task);

  // Function to handle modal opening
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to handle modal closing
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Function to handle input changes in the modal
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedTask({
      ...updatedTask,
      [name]: value,
    });
  };

  const handleSave = async () => {
    try {
      if (!updatedTask.title || !updatedTask.description || !updatedTask.date || !updatedTask.category) {
        console.log("Please fill all the required fields");
        return; 
      }
     
      const response = await axios.patch(`https://task-maven-server.vercel.app/tasks/${updatedTask._id}`, updatedTask);
  
      if (response.status === 200) {
        console.log('Task updated successfully:', response.data);
        closeModal();
      } else {
        console.log('Error updating task:', response.data);
      }
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };
  



  const handleDelete = async () => {
    try {

      const response = await axios.delete(`https://task-maven-server.vercel.app/tasks/${task._id}`);
      
      if (response.status === 200) {
        console.log('Task deleted successfully:', response.data);
      }
    } catch (error) {
      console.error('Error deleting task:', error);
      alert('Error deleting task!');
    }
  };
  
  

  return (
    <div className="bg-white p-5 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 mb-4">
      <h4 className="text-xl font-semibold text-gray-800 mb-2">{task.title}</h4>
      <p className="text-gray-600 mb-3">{task.description}</p>
      <div className="text-sm text-gray-500 mb-2">
        <span className="font-medium text-gray-700">Due Date:</span> {task.date}
      </div>
      <div className="text-sm text-gray-500 mb-4">
        <span className="font-medium text-gray-700">Assigned To:</span> {task.email}
      </div>

      <div className="flex justify-end space-x-3">
        {/* Update Button */}
        <button 
          onClick={openModal} 
          className="flex items-center text-blue-500 hover:text-blue-700">
          <FaEdit className="mr-1" />
          Update
        </button>
        
        {/* Delete Button */}
        <button 
          onClick={handleDelete} 
          className="flex items-center text-red-500 hover:text-red-700">
          <FaTrash className="mr-1" />
          Delete
        </button>
      </div>

      {/* Modal for updating task */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-2xl font-semibold mb-4">Update Task</h3>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Title</label>
              <input 
                type="text"
                name="title"
                value={updatedTask.title}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Description</label>
              <input 
                type="text"
                name="description"
                value={updatedTask.description}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Due Date</label>
              <input 
                type="date"
                name="date"
                value={updatedTask.date}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Assigned To</label>
              <input 
                type="email"
                name="email"
                value={updatedTask.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button 
                onClick={closeModal} 
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-700">
                Cancel
              </button>
              <button 
                onClick={handleSave} 
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EachTaskCard;
