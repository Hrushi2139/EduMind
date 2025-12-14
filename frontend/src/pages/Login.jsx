import React , {useState} from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import api from "../api/axios";

const Login = () => {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin =async()=>{
    try{
      const res= await api.post("/auth/login",{
        email,
        password
      });
      console.log(res.data);
    }catch (error) {
        console.log("FULL ERROR:", error);
        console.log("RESPONSE:", error.response);
        console.log("MESSAGE:", error.response?.data);
    }

  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Welcome Back 👋</h2>
        <p className="login-subtitle">Login to continue</p>

        <div className="input-group">
          <input type="email" required value={email} onChange={(e)=>setEmail(e.target.value)} />
          <label>Email</label>
        </div>

        <div className="input-group">
          <input type="password" required value={password} onChange={(e)=>setPassword(e.target.value)}/>
          <label>Password</label>
        </div>

        <button className="login-btn"
                onClick={handleLogin}
        >Login</button>


        <p className="signup-text">
          New User?{" "}
          <span onClick={() => navigate("/signup")}>Sign Up</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
