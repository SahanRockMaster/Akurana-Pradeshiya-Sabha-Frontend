import '../styles/AdminLogin.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const AdminLogin = () => {
  const history = useHistory();
  const initialValues = '';
  const [email, setEmail] = useState(initialValues);
  const [password, setPassword] = useState(initialValues);
  const [allentry, setAllentry] = useState([]);

  const [error, setError] = useState(null);

  useEffect(() => {
    let token = localStorage.getItem('token');
    if (token != null) {
      history.push('/adminDashboard');
    }
  });

  const submitForm = async (e) => {
    e.preventDefault();

    const newEntry = { email: email, password: password };

    await axios.post('http://local.backend-dev/api/login', newEntry,).then((response) => {
      localStorage.setItem('token', response.data.data.token);
      if (response?.status === 200){
        localStorage.setItem('user', response.data.data.name);
        history.push('/adminDashboard');
      };
    }).catch((error) => {
      if (error.response.status === 401) {
        setError(error.response.data.message);
      }else{
        setError('Login Failed! Try Again!');
      }
    });

    // if(!newEntry.email === '' && !newEntry.email === '' ) {
    setAllentry([newEntry]);
    // console.log(allentry);
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

        {error === null ? (
          <div></div>
        ) : (
          <div class='errorContainer'>{error}</div>
        )}

        <button type="submit" onClick={submitForm} className="btn-submit">
          Login
        </button>
        <button onClick={resetInputField} className="btn-reset">
          Forgot
        </button>
      </form>

      {/* <div className="result">
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
      </div> */}
    </>
  );
};

export default AdminLogin;
