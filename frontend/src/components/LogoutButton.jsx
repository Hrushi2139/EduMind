import React from 'react'
import { useNavigate } from 'react-router-dom';
import { clearAuth } from '../utils/authStorage';
const LogoutButton = () => {
    const navigate= useNavigate();
    function handleLogout(){
        clearAuth();
        navigate('/login');
    }
  return (
    <>
        <button onClick={handleLogout}>Log out</button>
    </>
  )
}

export default LogoutButton;