import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Routes,Route,Link } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    return (
        <>
            <button onClick={()=>navigate('/login')}>Login</button>
            <button onClick={()=>navigate('/signup')}>Sign up</button>
        </>    
    );
}


export default Home;