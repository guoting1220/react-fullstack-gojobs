import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './Homepage.css';
import UserContext from '../auth/UserContext';


const Homepage = () => {
  const { currentUser} = useContext(UserContext);

  return (
    <div className="Homepage">
      <h1>Jobly</h1>
      <p> All the jobs in one, convenience place.</p>
      {currentUser ?
        <p>Welcome back, {currentUser.username}!</p>
        : <>
          <Link exact to="/login"><button>Login</button></Link>
          <Link exact to="/signup"><button>Sign up</button></Link>
        </>
      }
    </div>
  )
}


export default Homepage;