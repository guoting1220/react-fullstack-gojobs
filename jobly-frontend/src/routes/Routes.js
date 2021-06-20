import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Homepage from '../homepage/Homepage';
import CompanyList from '../companies/CompanyList';
import CompanyDetail from '../companies/CompanyDetail';
import JobList from '../jobs/JobList';
import LoginForm from '../auth/LoginForm';
import SignupForm from '../auth/SignupForm';
import ProfileForm from '../profiles/ProfileForm';
import AppliedJobs from '../jobs/AppliedJobs';
import PrivateRoute from './PrivateRoute';



const Routes = ({ signup, login }) => {
  // const {currentUser} = useContext(UserContext);

  return (
    <div className="Routes">
      <Switch>
        <Route exact path="/">
          <Homepage />
        </Route>

        <Route exact path="/login">
          <LoginForm login={login} />
        </Route>

        <Route exact path="/signup">
          <SignupForm signup={signup} />
        </Route>

        <Route exact path="/companies">
          <CompanyList />
        </Route>

        <Route exact path="/companies/:handle">
          <CompanyDetail />
        </Route>

        <Route exact path="/jobs">
          <JobList />
        </Route>

        <PrivateRoute exact path="/appliedjobs">
          <AppliedJobs />
        </PrivateRoute>

        <PrivateRoute path="/profile">
          <ProfileForm />
        </PrivateRoute>

        <Redirect to="/" />
      </Switch>
    </div>

  )
}

export default Routes;