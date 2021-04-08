import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './authForm.css';
import Alert from '../common/Alert';


const LoginForm = ({ login }) => {
  const initialFormData = {
    username: "",
    password: ""
  }
  const [formData, setFormData] = useState(initialFormData);
  const [errorMessages, setErrorMessages] = useState([]);


  const history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(formData => ({
      ...formData,
      [name]: value
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(formData);
    if (result.success) {
      history.push('/companies');
      setFormData(initialFormData);
    }
    else {
      setErrorMessages(result.errors);
    }    
  }

  return (
    <div className="LoginForm authForm">
      <h2 className="authForm-formTitile">Log In</h2>
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

          {errorMessages.length !== 0 ?
            <Alert messages={errorMessages} type="danger" />
            : null
          }

          <button>Submit</button>
        </form>
      </div>
    </div>
  )
}


export default LoginForm;