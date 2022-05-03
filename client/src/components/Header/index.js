import React, {useState} from 'react';
import { Link } from 'react-router-dom';

import Auth from '../../utils/auth';

const Header = () => {
  const logout = event => {
    event.preventDefault();
    Auth.logout();
  };
  const [currentPage, setCurrentPage] = useState('')
  window.onload = () => {
    const currentPageName = window.location.href.split('/')[3]
    setCurrentPage(currentPageName)
  }
  return (
    <header className="bg-secondary mb-4 py-2 flex-row align-center">
      <div className="container flex-row justify-space-between-lg justify-center align-center">
        <Link to="/" onClick={() => setCurrentPage('')}>
          <h1>Weekly Witty Writing Prompts</h1>
        </Link>

        <nav className="text-center">
          {Auth.loggedIn() ? (
            <>
            {currentPage ==="Dashboard" ? 
            '':<Link to="/Dashboard" onClick={() => setCurrentPage('Dashboard')}>Dashboard</Link>
            }
              
              <a href="/" onClick={logout}>
                Logout
              </a>
            </>
          ) : (
            <>
            {
              currentPage === '' ?
              <>
              <Link to="/login" onClick={() => setCurrentPage('login')}>Login</Link> <Link to="/signup" onClick={() => setCurrentPage('signup')}>Signup</Link> 
              </>: ''
            }
            {
              currentPage === 'login' ?
              <>
              Don't have an account please:
              <Link to="/signup" onClick={() => setCurrentPage('signup')}> Signup</Link>  
              </>: ''
            }
            {
              currentPage === 'signup' ?
              <>
              Have an account 
              <Link to="/login"onClick={() => setCurrentPage('login')}> Login </Link> 
              here
              </>: ''
            }
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;