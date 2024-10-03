import React from 'react';
import { Link } from 'react-router-dom'; // Use if you are using react-router for navigation

const Header = ({ isLoggedIn }) => {
  return (
    <header className="bg-blue-700 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo or Title */}
        <div>
          <Link to="/" className="text-2xl font-bold">
            MyWebsite
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="flex gap-4">
       
            
              <Link to="/profile" className="hover:opacity-80">
                Profile
              </Link>
            
              <Link to="/" className="hover:opacity-80">
                Register
              </Link>
              
              <Link to="/login" className="hover:opacity-80">
                Login
              </Link>
            
         
          
        </nav>
      </div>
    </header>
  );
};

export default Header;
