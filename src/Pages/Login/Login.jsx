import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaGoogle } from 'react-icons/fa';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { AuthContext } from '../../Providers/AuthProvider';
import { Link } from 'react-router-dom';

const Login = () => {
  const {signIn} = useContext(AuthContext); 
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const { register, handleSubmit, formState: { errors }, setError } = useForm();

  // Handle form submission
  const onSubmit = (data) => {
    // Check CAPTCHA verification
    if (!captchaVerified) {
      alert('Please complete the CAPTCHA');
      return;
    }
  
    // Extract email and password from the form data
    const { email, password } = data;
  
    // Call signIn function from AuthContext
    signIn(email, password)
      .then(result => {
        const user = result.user;
        console.log('Logged in user:', user);  // Logs the user object returned by Firebase or your authentication provider
      })
      .catch(error => {
        console.error('Error during sign-in:', error.message);  // Handles any error from the signIn function
      });
  };
  

  // Initialize CAPTCHA on component mount
  useEffect(() => {
    loadCaptchaEnginge(6);  // Generate a 6-character CAPTCHA
  }, []);

  // Handle CAPTCHA validation
  const handleCaptchaChange = (captchaCode) => {
    const isValid = validateCaptcha(captchaCode);
    setCaptchaVerified(isValid);
  };

  return (
    <div className="flex items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-lg shadow-xl border border-gray-200">
        <div>
          <h2 className="text-center text-3xl font-bold text-gray-900">Sign in to your account</h2>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md shadow-sm -space-y-px flex flex-col gap-3">
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
            <div className="mt-4">
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                {...register('password', { 
                  required: 'Password is required', 
                  minLength: { value: 6, message: 'Password must be at least 6 characters long' }
                })}
                className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Password"
              />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            </div>
          </div>

          {/* CAPTCHA */}
          <div className="mt-4">
            <LoadCanvasTemplate />
            <input
              type="text"
              id="captcha"
              name="captcha"
              placeholder="Enter CAPTCHA"
              className="mt-2 p-3 w-full border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onBlur={(e) => handleCaptchaChange(e.target.value)}
            />
            {!captchaVerified && <p className="text-red-500 text-xs mt-1">Captcha is incorrect. Please try again.</p>}
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 ease-in-out transform hover:scale-105"
            >
              Sign In
            </button>
          </div>
        </form>

        {/* Sign In with Google */}
        <div className="mt-6">
          <button
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-gray-800 bg-white shadow-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 ease-in-out transform hover:scale-105"
          >
            <FaGoogle className="mr-2 text-xl text-red-600" />
            Sign in with Google
          </button>
        </div>
        <p>Don't have an account? Please <Link className='text-green-700' to='/register'>Register</Link></p>
      </div>
    </div>
  );
};

export default Login;
