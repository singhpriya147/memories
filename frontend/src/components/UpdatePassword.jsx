import React from 'react'
import {useDispatch,useSelector} from 'react-redux'

import { useState } from 'react';
 import Header from './Header';
 import { Button } from '@mui/material';
 import { useNavigate } from 'react-router-dom';
import { logout } from '../features/auth/authSlice';



const UpdatePassword = () => {
 const{user}=useSelector((state)=>state.auth)
 const token =user.token;
 const [oldPassword,setOldPassword]=useState();
 const [newPassword,setNewPassword]=useState();
 const dispatch=useDispatch();
 const navigate= useNavigate();

 const submitHandler=async(e)=>{
e.preventDefault();
await dispatch(updatePasswordfun(oldPassword,newPassword));


  dispatch(logout());
   navigate('/login');
 }

 const updatePasswordfunc = async (oldPassword, newPassword, token) => {
   try {
     const response = await fetch(
       'http://localhost:5000/api/users/update/password',
       {
         method: 'PUT',
         headers: {
           'Content-Type': 'application/json',
           Authorization: `Bearer ${token}`,
         },
         body: JSON.stringify({
           oldPassword: oldPassword,
           newPassword: newPassword,
         }),
       }
     );

     const data = await response.json();
     console.log('Response from Backend:', data);

     // Handle success or show a success message
   } catch (error) {
     console.error('Error in updatePassword:', error);

     // Handle error or show an error message
   }
 };

 
  return (
    <div>
      
      <Header />
      <div>
        <form
          style={{
            marginLeft: '30%',
            height: ' 400px',
            backgroundColor: ' 	#E0E0E0',
          }}
          onSubmit={submitHandler}
        >
          <h3>Update Password</h3>
          <input
            type='password'
            value={oldPassword}
            placeholder='old password'
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <input
            type='password'
            value={newPassword}
            placeholder='New password'
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button type='submit'>Update password</Button>
        </form>
      </div>
    </div>
  );
}

export default UpdatePassword
