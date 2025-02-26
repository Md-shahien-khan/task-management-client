import React from "react";
import { useForm } from "react-hook-form";

const TaskForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="p-3 flex items-center justify-center">
      <div className="p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-700">
          Create Task
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Task Title */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Task Title
            </label>
            <input
              {...register("title", { required: "Task Title is required" })}
              type="text"
              id="title"
              name="title"
              className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter task title"
            />
            {errors.title && (
              <p className="text-xs text-red-500 mt-1">{errors.title.message}</p>
            )}
          </div>

          {/* Task Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              {...register("description", {
                required: "Description is required",
                maxLength: {
                  value: 200,
                  message: "Description must be less than 200 characters",
                },
              })}
              id="description"
              name="description"
              rows="3"
              className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter task description (max 200 characters)"
            ></textarea>
            {errors.description && (
              <p className="text-xs text-red-500 mt-1">{errors.description.message}</p>
            )}
          </div>

          {/* Task Date */}
          <div>
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-700"
            >
              Due Date
            </label>
            <input
              {...register("date", { required: "Due Date is required" })}
              type="date"
              id="date"
              name="date"
              className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.date && (
              <p className="text-xs text-red-500 mt-1">{errors.date.message}</p>
            )}
          </div>

          {/* Task Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <div className="flex space-x-4 mt-1">
              <div className="flex items-center">
                <input
                  {...register("category", { required: "Category is required" })}
                  type="radio"
                  id="todo"
                  name="category"
                  value="To-Do"
                  className="h-4 w-4 text-blue-500"
                />
                <label htmlFor="todo" className="ml-2 text-gray-700">
                  To-Do
                </label>
              </div>
              <div className="flex items-center">
                <input
                  {...register("category")}
                  type="radio"
                  id="in-progress"
                  name="category"
                  value="In Progress"
                  className="h-4 w-4 text-blue-500"
                />
                <label htmlFor="in-progress" className="ml-2 text-gray-700">
                  In Progress
                </label>
              </div>
              <div className="flex items-center">
                <input
                  {...register("category")}
                  type="radio"
                  id="done"
                  name="category"
                  value="Done"
                  className="h-4 w-4 text-blue-500"
                />
                <label htmlFor="done" className="ml-2 text-gray-700">
                  Done
                </label>
              </div>
            </div>
            {errors.category && (
              <p className="text-xs text-red-500 mt-1">{errors.category.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
