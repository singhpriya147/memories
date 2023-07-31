import React from 'react'
import Header from './Header'
import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import Button  from '@mui/material/Button'
import {  updateProfile } from '../features/auth/authSlice'

const UpdateProfile = () => {

const{user}=useSelector((state)=>state.auth)

const dispatch = useDispatch();



const token =user.token;

 const navigate = useNavigate();
const [name, setName] = useState("");
const[email,setEmail]=useState("");
const [location, setLocation] = useState('');
const [occupation, setOccupation] = useState('');
const[profilePicture,setProfilePicture]=useState('');


const submitHandler=async(e)=>{
 e.preventDefault();
  
 await dispatch(updateProfile({name, email,location,occupation,profilePicture} ,token));
  navigate('/');
  
}





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
          <h3>Update Profile</h3>
          <input
            type='text'
            value={name}
            placeholder='updated name'
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type='text'
            value={email}
            placeholder='updated email'
            onChange={(e) => setEmail(e.target.value)}
          />


<input
            type='text'
            value={location}
            placeholder='updated location'
            onChange={(e) => setLocation(e.target.value)}
          />
          <input
            type='text'
            value={occupation}
            placeholder='updated occupation'
            onChange={(e) => setOccupation(e.target.value)}
          />
          <div className={classes.fileInput}>
            <FileBase
              type='file'
              multiple={false}
              onDone={({ base64 }) =>
                setProfilePicture({ ...profilePicture, selectedFile: base64 })
              }
            />
          </div>
         
          <button type='submit' >Update</Button>
        </form>
      </div>
    </div>
  ); 
}

export default UpdateProfile
