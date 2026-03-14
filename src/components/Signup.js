import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Signup() {
      var [name, setName] = useState('');
    var [email, setEmail] = useState('');
    var [password, setPassword] = useState('');
    var [confirmPassword, setConfirmPassword] = useState('');
    var [errorMessage, setErrorMessage] = useState('');
    var navigate = useNavigate();

  var handleRegister = async () => {
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    var user = {
      Name: name,
      Email: email,
      Password: password
    };
console.log(name,email,password)
    try {
      var  response = await axios.post("https://localhost:44325/api/User/signup", user);
      console.log("Registration success:", response.data);
      setErrorMessage("");
      navigate("/login"); // go to login page after success
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message || "Registration failed.");
      } else {
        setErrorMessage("Failed to connect to server.");
      }
    }
  };

  return (
    <div>
  
      <div className="login-container">
        <div className="row">
          <div className="col-8 offset-2">
            <h2 className="signup-title">Sign In</h2>

            
<div className="login-form">
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}required
              />
            </div>

            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Confirm Password:</label>
              <input
                type="password"
                className="form-control"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}required
              />
            </div>

            <div className="form-group">
              <button className="login-btn" onClick={handleRegister}>
                Register
              </button>
              
              </div>
              
   
            </div>
            <small >Already have an account?</small>
                  <div>   <button type="button" className="login-btn"onClick={() => navigate("/login")}> Login
</button></div>  
          {errorMessage && (
  <div className="error-message">{errorMessage}</div>
)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
