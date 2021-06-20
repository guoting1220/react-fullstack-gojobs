import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';
// import { Navbar, Nav, NavItem, NavbarBrand } from "reactstrap";
import UserContext from '../auth/UserContext';


const NavBar = ({logout}) => {
  const {currentUser} = useContext(UserContext);

	return (
		<nav className="NavBar">
      <NavLink exact to="/" className="NavBar-brand ">GoJobs</NavLink>
      {currentUser ?
        (<>
          <NavLink to="/companies">Companies</NavLink>	
          <NavLink to="/jobs">Jobs</NavLink>	
          <NavLink to="/appliedjobs">My Applied Jobs</NavLink>
          <NavLink to="/profile">Profile</NavLink>	
          <NavLink to="/" onClick={logout}>Log Out {currentUser.username}</NavLink>
        </>)
      : (<>
          <NavLink to="/companies">Companies</NavLink>
          <NavLink to="/jobs">Jobs</NavLink>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/signup">Sign Up</NavLink>
        </>)
      }			
		</nav>
	)
}


export default NavBar;