import React from 'react'
import { saveAuth,getToken,getUser } from '../utils/authStorage'
import { Navigate } from 'react-router-dom'
const RoleProtectedRoute = ({children,allowedRoles}) => {
   const token=getToken();
   const user=getUser();
   if(!token){
    return <Navigate to='/login'/>
   }
   if(!allowedRoles.includes(user.role)){
     return <Navigate to="/unauthorized"/>
   }
   return children;
}

export default RoleProtectedRoute;