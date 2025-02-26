import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Providers/AuthProvider';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false); // For dropdown menu
  const { user, logOut } = useContext(AuthContext);

  // Handle logout
  const handleLogout = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.log(error));
  };

  // Toggle the dropdown
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  return (
    <nav className="bg-white shadow-md">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <img className="w-10" src="/src/assets/images/logo.png" alt="Logo" />
          </div>
          <div className="hidden md:flex space-x-4 items-center">
            {/* Home Link */}
            <Link
              to="/"
              className="text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Home
            </Link>

            {/* About Link */}
            <Link
              to="/about"
              className="text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              About
            </Link>

            {/* Conditional Links: Register and Login based on user status */}
            {!user ? (
              <>
                <Link
                  to="/register"
                  className="text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Register
                </Link>
                <Link
                  to="/login"
                  className="text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Login
                </Link>
              </>
            ) : (
              <div className="relative">
                {/* Profile Image and Dropdown */}
                <img
                  onClick={toggleDropdown}
                  className="w-10 h-10 rounded-full cursor-pointer"
                  src={user.photoURL|| '/src/assets/images/default-user.jpg'} // Default image if no photoURL
                  alt="User Profile"
                />
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md w-32 py-1">
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-800 hover:text-gray-600 focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="block text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-base font-medium"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="block text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-base font-medium"
            >
              About
            </Link>
            {!user ? (
              <>
                <Link
                  to="/register"
                  className="block text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-base font-medium"
                >
                  Register
                </Link>
                <Link
                  to="/login"
                  className="block text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-base font-medium"
                >
                  Login
                </Link>
              </>
            ) : (
              <div className="block text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-base font-medium cursor-pointer">
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
