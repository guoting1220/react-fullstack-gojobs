import React, { useState, useContext } from 'react';
import '../auth/authForm.css';
import UserContext from '../auth/UserContext';
import Alert from '../common/Alert';


const ProfileForm = ({ updateProfile }) => {
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const initialFormData = {
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    email: currentUser.email,
  }
  const [formData, setFormData] = useState(initialFormData);
  const [updateSubmitted, setUpdateSubmitted] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(formData => ({
      ...formData,
      [name]: value
    }));
  }

  /* handle the profile update form submit.   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await updateProfile(currentUser.username, formData);
    if (result.success) {
      setCurrentUser(result.user);
      setUpdateSubmitted(true);
    }
    else {
      setErrorMessages(result.errors);
    }
  }

  return (
    <div className="LoginForm authForm">
      <h2 className="authForm-formTitile">Profile</h2>
      <div className="authForm-formBody">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username"><h4>Username</h4></label>
            <p>{currentUser.username}</p>
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

          {updateSubmitted ?
            <Alert messages={["Profile updated!"]} type="success" />
            : null
          }

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


export default ProfileForm;