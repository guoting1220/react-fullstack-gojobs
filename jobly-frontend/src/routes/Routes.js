import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Homepage from '../homepage/Homepage';
import CompanyList from '../companies/CompanyList';
import CompanyDetail from '../companies/CompanyDetail';
import JobList from '../jobs/JobList';
import LoginForm from '../auth/LoginForm';
import SignupForm from '../auth/SignupForm';
import ProfileForm from '../profiles/ProfileForm';
import UserContext from '../auth/UserContext';
import AppliedJobs from '../jobs/AppliedJobs';



const Routes = ({ signup, login, updateProfile }) => {
  const {currentUser} = useContext(UserContext);

  return (
    <div className="Routes">
      <Switch>
        <Route exact path="/">
          <Homepage />
        </Route>

        <Route exact path="/companies">
          {currentUser ?
            <CompanyList />
            : <Redirect to="/login" />
          }
        </Route>

        <Route exact path="/companies/:handle">
          <CompanyDetail />
        </Route>

        <Route exact path="/jobs">
          {currentUser ?
            <JobList />
            : <Redirect to="/login" />
          }
        </Route>

        <Route exact path="/appliedjobs">
          {currentUser ?
            <AppliedJobs />
            : <Redirect to="/login" />
          }
        </Route>

        <Route exact path="/login">
          <LoginForm login={login} />
        </Route>

        <Route exact path="/signup">
          <SignupForm signup={signup} />
        </Route>

        <Route exact path="/profile">
          {currentUser ?
            <ProfileForm updateProfile={updateProfile}/>
            : <Redirect to="/login" />
          }          
        </Route>
      </Switch>
    </div>

  )
}

export default Routes;