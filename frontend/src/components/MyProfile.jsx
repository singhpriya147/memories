import React from 'react';
import Card from '@mui/material/Card';
import { Typography } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import CardContent from '@mui/material/CardContent';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import { getUser} from '../features/auth/authSlice';





function MyProfile({ userId,token}) {
  const [user,setUser]=useState({name:'guest'});
  const [followingCount,setFollowingCount]=useState(0);
  const [followerCount, setFollowerCount] = useState(0);
  const dispatch = useDispatch();
  
  
  useEffect(()=>{
     getData()
       setFollowingCount(user.following ? user.following.length : 0);
       setFollowerCount(user.follower ? user.follower.length : 0);
  },[userId,token])
 
   const getData = async()=>{
    const res = await fetch(`http://localhost:5000/api/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const user =await res.json()
    setUser(user)
    // console.log(user)
   }


  




  
  

  // if (!user) {
  //   return <div>Loading user...</div>;
  // }
  // const {
  //   name,
  //   email,
  //   location,
  //   occupation,
  //   profilePicture,
  //   // followings,
  //   // followers,
  //   // friends,
  // } = user;

  return (
    <Card sx={{ height: 300, width: 250 }}>
      <CardMedia
        sx={{
          height: 75,
          width: 75,
          borderRadius: 100,
          borderColor: 'blue',
          mt: 1,
        }}
        component='img'
        height='200'
        image={user.profilePicture}
        alt='no img'
      />
      <CardContent>
        <Typography>{user.name}</Typography>
        <Typography>
          <EmailOutlinedIcon />
          {user.email}
        </Typography>
        <Typography>
          {' '}
          <LocationOnOutlinedIcon />
          {user.location}
        </Typography>
        <Typography>
          {' '}
          <WorkOutlineOutlinedIcon />
          {user.occupation}
        </Typography>

        {user && user.follower ? (
          <Typography> Follower {user.follower.length} </Typography>
        ) : (
          <Typography>0 </Typography>
        )}

        {user && user.following ? (
          <Typography> Following {user.following.length} </Typography>
        ) : (
          <Typography>0 </Typography>
        )}

      </CardContent>
    </Card>
  );
}

export default MyProfile;
