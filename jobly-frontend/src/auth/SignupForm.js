import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Alert from '../common/Alert';
import './authForm.css';

const SignupForm = ({ signup }) => {
  const initialFormData = {
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: ""
  }
  const [formData, setFormData] = useState(initialFormData);
  const [errorMessages, setErrorMessages] = useState([]);

  const history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(formData => ({
      ...formData,
      [name]: value
    }));
  }

  /* handle the form submit. If successful, redirect to the companies.
  
  Here must define as async function, because signup is async function 
  */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await signup(formData);
    if (result.success) {
      history.push('/companies')
      setFormData(initialFormData);
    }
    else {
      setErrorMessages(result.errors);
    }
  }

  return (
    <div className="LoginForm authForm">
      <h2 className="authForm-formTitile">Sign Up</h2>
      <div className="authForm-formBody">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username"><h4>Username</h4></label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="password"><h4>Password</h4></label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="firstName"><h4>First Name</h4></label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="lastName"><h4>Last Name</h4></label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="email"><h4>Email</h4></label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          {errorMessages.length !== 0 ?
            <Alert messages={errorMessages} type="danger"/>
            : null
          }

          <button>Submit</button>
        </form>
      </div>

    </div>
  )
}


export default SignupForm;