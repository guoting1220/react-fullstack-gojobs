import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes/Routes';
import NavBar from './navbar/NavBar';
import UserContext from './auth/UserContext';
import JoblyApi from '././api/api';
const jwt = require("jsonwebtoken");


function App() {
  const [token, setToken] = useState(window.localStorage.getItem("jobly-token") || null);
  const [currentUser, setCurrentUser] = useState(null);
  const [applications, setApplications] = useState([]);

  console.debug(
    "App",
    // "infoLoaded=", infoLoaded,
    "currentUser=", currentUser,
    "token=", token,
  );

  /** return the token for the registered user */
  const signup = async (userData) => {
    try {
      let token = await JoblyApi.signup(userData);
      window.localStorage.setItem("jobly-token", token);
      setToken(token);
      return { success: true };
    }
    catch (errors) {
      console.error("Signup failed", errors);
      return { success: false, errors };
    }
  }

  /** return the token for the registered user */
  const login = async (userData) => {
    try {
      let token = await JoblyApi.login(userData);
      window.localStorage.setItem("jobly-token", token);
      setToken(token);
      return { success: true };
    }
    catch (errors) {
      console.error("Login failed", errors);
      return { success: false, errors };
    }
  }

  /* log out the user */
  const logout = () => {
    setToken(null);
    setCurrentUser(null);
    window.localStorage.removeItem("jobly-token");
  }

  /* update user profile  */
  const updateProfile = (async (username, newData) => {
    try {
      let user = await JoblyApi.updateProfile(username, newData);
      return { success: true, user };
    }
    catch (errors) {
      console.error("Failed to update.", errors);
      return { success: false, errors };
    }
  })

  /* apply to a job  */
  const applyToJob = (async (jobId) => {
    try {
      let appliedJobId = await JoblyApi.applyToJob(currentUser.username, jobId);
      return { success: true, appliedJobId };
    }
    catch (errors) {
      console.error("Failed to apply.", errors);
      return { success: false, errors };
    }
  })


  /* un-apply to a job  */
  const unApplyToJob = (async (jobId) => {
    try {
      let unAppliedJobId = await JoblyApi.unApplyToJob(currentUser.username, jobId);
      return { success: true, unAppliedJobId };
    }
    catch (errors) {
      console.error("Failed to un-apply.", errors);
      return { success: false, errors };
    }
  })


  useEffect(() => {
    /* get current user from the token */
    const getCurrentUser = async () => {
      if (token) {
        try {
          const { username } = jwt.decode(token);
          JoblyApi.token = token;
          const user = await JoblyApi.getCurrentUser(username);
          setCurrentUser(user);
          setApplications(user.applications);
        }
        catch (e) {
          console.error("No current user.", e);
          setCurrentUser(null);
        }
      }
    }

    getCurrentUser();
  }, [token]);

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ token, currentUser, setCurrentUser, applications, setApplications, applyToJob, unApplyToJob }}>
        <div className="App">
          <NavBar logout={logout} />
          <Routes signup={signup} login={login} updateProfile={updateProfile} />
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
