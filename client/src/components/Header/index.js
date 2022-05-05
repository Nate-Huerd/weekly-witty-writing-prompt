import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';

const Header = () => {
  var adminState = ''
  var className = ''
  const logout = event => {
    event.preventDefault();
    Auth.logout();
  };
  if(Auth.loggedIn()) {
    adminState = Auth.getProfile().data.isAdmin
    if(adminState) {
      className = "btn"
    } else {
      className = "btn invisible"
    }
  } else {
    adminState = false
    className = "btn invisible"
  }
  const [isAdmin] = useState({adminState, className})
  console.log(isAdmin)
  const [currentPage, setCurrentPage] = useState('')
  window.onload = () => {
    const currentPageName = window.location.href.split('/')[3]
    setCurrentPage(currentPageName)
  }
  return (
    <header className="bg-secondary mb-4 py-2 flex-row align-center" style={{position: 'sticky', top: 0, zIndex: 1}}>
      <div className="container flex-row justify-space-between-lg justify-center align-center">
        <Link to="/" onClick={() => setCurrentPage('')} className='btn'>
          <h1>Weekly Witty Writing Prompts</h1>
        </Link>

        <nav className="text-center">
          {Auth.loggedIn() ? (
            <>
            {currentPage ==="Dashboard" ? 
            '':<Link to="/Dashboard" onClick={() => setCurrentPage('Dashboard')} className='btn'>Dashboard</Link>
            }
            {currentPage === 'Top5' ?
            '': <Link to="/Top5" className='btn' onClick={() => setCurrentPage('Top5')}>Top 5 of the Week</Link>
            }
            <a href="/" onClick={logout} className='btn'>
              Logout
            </a>
            {currentPage ==='UsersPage' ?
               '' :  <Link to='/UsersPage'  className={isAdmin.className} onClick={() => setCurrentPage('Userspage')}>UsersPage</Link>
            }
            
            </>
          ) : (
            <>
            {
            (currentPage !== 'login' && currentPage !== 'signup') ?
              <>
              <Link to="/Top5" className='btn' onClick={() => setCurrentPage('Top5')}>Top 5 of the Week</Link> <Link to="/login" onClick={() => setCurrentPage('login')} className='btn'>Login</Link> <Link to="/signup" onClick={() => setCurrentPage('signup')} className='btn'>Signup</Link> 
              </>: ''
            }
            {
              currentPage === 'login' ?
              <>
              Don't have an account please:
              <Link to="/signup" onClick={() => setCurrentPage('signup')} className='btn'> Signup</Link> 
              <Link to="/Top5" className='btn' onClick={() => setCurrentPage('Top5')}>Top 5 of the Week</Link>
              </>: ''
            }
            {
              currentPage === 'signup' ?
              <>
                Have an account: 
              <Link to="/login"onClick={() => setCurrentPage('login')} className='btn'>Login</Link> 
             <Link to="/Top5" className='btn' onClick={() => setCurrentPage('Top5')}>Top 5 of the Week</Link>
              
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
