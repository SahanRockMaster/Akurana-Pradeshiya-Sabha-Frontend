import '../styles/AdminLogin.css';
import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";

const AdminLogin = () => {
  const history = useHistory();
  const initialValues = '';
  const [email, setEmail] = useState(initialValues);
  const [password, setPassword] = useState(initialValues);
  const [allentry, setAllentry] = useState([]);

  const submitForm = async (e) => {
    e.preventDefault();

    const newEntry = { email: email, password: password };

    await axios.post('http://weblara.website/api/login', newEntry, ).then((response) => {
      console.log('Login success: ', response.data);
      if (response?.status === 200) history.push('/adminDashboard');
      else alert(response?.message);
    });

    // if(!newEntry.email === '' && !newEntry.email === '' ) {
    setAllentry([newEntry]);
    console.log(allentry);
    // }
  };

  const resetInputField = () => {
    setPassword('');
    setEmail('');
  };

  return (
    <>
      <form action="" onSubmit={submitForm} className="innerForm">
        <div className="header">
          <h1>Welcome to Admin Login</h1>
          <h2>Please Login</h2>
          <h3>Here</h3>
        </div>
        <div>
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            className="form-input"
            type="text"
            name="email"
            id="email"
            autoComplete="off"
            placeholder="Enter the email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>

        <div>
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            className="form-input"
            type="password"
            name="password"
            id="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>

        <button type="submit" onClick={submitForm} className="btn-submit">
          Login
        </button>
        <button onClick={resetInputField} className="btn-reset">
          Forgot
        </button>
      </form>

      <div className="result">
        {allentry.map((currentElement) => {
          return (
            <div className="show">
              <p>
                Email id is : <b>{currentElement.email}</b> Password is :{' '}
                <b>{currentElement.password}</b>
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default AdminLogin;
