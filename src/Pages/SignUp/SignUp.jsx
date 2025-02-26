import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { FaGoogle } from 'react-icons/fa'; // Google icon
import { AuthContext } from '../../Providers/AuthProvider'; // Assuming you have this context
import { Link, useNavigate } from 'react-router-dom';
import useAxios from '../Hooks/useAxios'; // Importing useAxios hook

const SignUp = () => {
  const { createUser, updateUserProfile, googleSignIn } = useContext(AuthContext);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const navigate = useNavigate();

  // Handle form submission
  const onSubmit = async (data) => {
    // Extract email and password from the form data
    const { email, password, name, photoURL } = data;
    const result = await createUser(email, password);
    navigate('/')
  };

  // Google Sign-Up handler
  const handleGoogleSignUp = () => {
    googleSignIn()
      .then(result => {
        console.log('Google sign-up result:', result.user);
        navigate('/');
      })
      .catch(error => {
        console.error('Error during Google Sign In:', error.message);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen  px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-lg shadow-xl border border-gray-200">
        <div>
          <h2 className="text-center text-3xl font-bold text-gray-900">Sign Up for an Account</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md shadow-sm -space-y-px flex flex-col gap-3">
            {/* Username Input */}
            <div>
              <label htmlFor="username" className="sr-only">Username</label>
              <input
                id="username"
                name="username"
                type="text"
                required
                {...register('username', {
                  required: 'Username is required',
                  minLength: { value: 3, message: 'Username must be at least 3 characters' }
                })}
                className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Username"
              />
              {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>}
            </div>

            {/* Email Input */}
            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: 'Please enter a valid email'
                  }
                })}
                className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Email address"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                {...register('password', {
                  required: 'Password is required',
                  minLength: { value: 6, message: 'Password must be at least 6 characters' }
                })}
                className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Password"
              />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            </div>

            {/* Photo URL Input */}
            <div>
              <label htmlFor="photoUrl" className="sr-only">Photo URL</label>
              <input
                id="photoUrl"
                name="photoURL"
                type="text"
                {...register('photoURL', {
                  required: 'Photo URL is required',
                  pattern: {
                    value: /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp))$/i,
                    message: 'Please enter a valid URL for your photo'
                  }
                })}
                className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Profile Picture URL"
              />
              {errors.photoUrl && <p className="text-red-500 text-xs mt-1">{errors.photoUrl.message}</p>}
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 ease-in-out transform hover:scale-105"
            >
              Sign Up
            </button>
          </div>
        </form>

        {/* Google Sign-Up Button */}
        <div className="mt-6">
          <button
            onClick={handleGoogleSignUp}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-gray-800 bg-white shadow-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 ease-in-out transform hover:scale-105"
          >
            <FaGoogle className="mr-2 text-xl text-red-600" />
            Sign Up with Google
          </button>
        </div>
        <p>Already have an account? Please <Link className='text-green-700' to='/login'>Login</Link></p>
      </div>
    </div>
  );
};

export default SignUp;
