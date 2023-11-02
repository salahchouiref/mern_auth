import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

export default function PrivateRoute() {
    const {user} = useSelector(state=>state.user);
  if(user.currentUser !==null){
    return <Navigate to="/profile" />
  }
    return <Navigate to="/sign-in" />
}
