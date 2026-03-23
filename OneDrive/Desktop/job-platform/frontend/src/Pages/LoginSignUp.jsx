import React, { useState, useEffect } from "react";
import Login from "../components/LoginSignup/Login";
import Signup from "../components/LoginSignup/Signup";
import { useLocation } from "react-router-dom";

function LoginSignUp() {
  const location = useLocation();
  const [loginSelected, setLoginSelected] = useState(false);

  useEffect(() => {
    // If path is /signup, show signup form; otherwise show login
    setLoginSelected(location.pathname === "/signup");
  }, [location]);

  return <div>{!loginSelected ? <Login /> : <Signup />}</div>;
}

export default LoginSignUp;