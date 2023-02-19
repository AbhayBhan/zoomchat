import React, { useEffect } from 'react'
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function PrivateRoute(){
    const {user} = useSelector((state) => state.auth);

    useEffect(() => {
        console.log(user ? user : null);
    },[])
    
    return(
        user ? <Outlet /> : <Navigate to='/login'></Navigate>
    )
}

export default PrivateRoute