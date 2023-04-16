import { Card } from '@mui/material'
import { Button, CardHeader } from '@material-ui/core';
import{ Box} from '@mui/material';
import {Typography} from '@material-ui/core';
import {Paper} from '@material-ui/core';
import CardMedia from '@mui/material/CardMedia';
import React from 'react'
import { useSelector } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';

function UserItem({person,handleFollow}) 


{
 const { user } = useSelector((state) => state.auth);
 
  const token = user.token;
  console.log(user._id);
  const [isFollowing,setIsFollowing]=useState(person.isFollowing);



  
  const handleClick = async() => {
    console.log('follow button is clicked ');
    console.log(person._id);
      await TofollowUser();
     setIsFollowing(!isFollowing);
     handleFollow(person._id);
  };

   const TofollowUser=async()=>{
    const res = await fetch(
      `http://localhost:5000/api/users/follow/${person._id}`,
      { method:'PUT',
        headers: {
          Accept:'application/json',
         'Content-Type':'application/json',
         Authorization: `Bearer ${token}`,
        },
      }
    );
      const data=await res.json();
      console.log(data);
    
   }




  return (
    <ThemeProvider>
      <Box
        sx={{
          maxWidth: 300,
          pl: '5rem',
          display: 'flex',
          flexDirection: 'row',
          backgroundColor: '#E5BEEC',
          alignItems: 'center',
          borderRadius: '5px',
          mb: '0.2vmax',
        }}
      >
        <Box
          sx={{
            pb: '0.5rem',
            display: 'flex',

            flexDirection: 'column',
          }}
        >
          <CardMedia
            sx={{
              height: 40,
              width: 40,
              borderRadius: 100,
              borderColor: 'blue',
              mt: 1,
            }}
            component='img'
            height='50'
            image={person.profilePicture}
            alt='Paella dish'
          />

          <Typography variant='h6' sx={{ ml: '1rem' }}>
            {person.name}
          </Typography>

          <Typography>{person.location}</Typography>

          <Button variant='contained' onClick={handleClick}>
            {isFollowing ? 'UnFollow' : 'Follow'}
          </Button>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default UserItem