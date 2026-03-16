import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();
function attemptLogin(e) {
  e.preventDefault();
console.log("Login data sent:", { email, password });

axios.post("https://recipe-ducwabaegshtc8f7.westeurope-01.azurewebsites.net/api/User/login", {
 name: name,
  email: email,
  password: password
})
.then((response) => {
  const userData = response.data.user || response.data;
  const storedUser = {
    userId: userData.userId || userData.id,
    name: userData.name,
    email: userData.email
  };
  localStorage.setItem("loggedInUser", JSON.stringify(storedUser));
  console.log("Stored user data:", storedUser);
  navigate("/feed");
})
.catch((error) => {
  console.error("Login error:", error);
  setErrorMessage("Invalid credentials");
});
}




  return (
    <div className="login-container">
      <h2>Login</h2>
      {errorMessage?<div className="alert alert-danger">{errorMessage}</div>:''}
      <form className="login-form">
        <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
        <input type="email" placeholder="Email" value={email}
                        onInput={(event)=>setEmail(event.target.value)}
                         required />
        <input type="password" placeholder="Password" value={password}
                        onInput={(event)=>setPassword(event.target.value)} required />
        <button type="submit" className="login-btn" onClick={attemptLogin} >Login</button>



      </form>
      <small>Don't have an account?</small>
      
<Link to="/signup" className="signup-btn">Sign In</Link>
    </div>
  );
}

export default Login;
