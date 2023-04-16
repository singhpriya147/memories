import * as React from 'react';
import axios from 'axios';
import { useState,useEffect } from 'react';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import { Typography } from '@material-ui/core';
import CardActions from '@mui/material/CardActions';

import {IconButton }from '@material-ui/core';
import { useDispatch ,useSelector} from 'react-redux';

import {Favorite,FavoriteBorder} from '@mui/icons-material'

import DeleteIcon from '@mui/icons-material/Delete';
import { deletePost } from '../features/Posts/postSlice';
import { Button, stepConnectorClasses } from '@mui/material';


export default function PostItem({post}) {
   const { user } = useSelector((state) => state.auth);
   const [liked, setLiked] = useState(post.likes.includes(user._id));
   const [noOfLikes, setNo] = useState(post.likes.length);

   console.log(liked)
   console.log(post.likes.length);
 const dispatch=useDispatch();

  const userId=user._id;
  const token=user.token;
  console.log(userId,token);
  const postId=post._id
console.log(postId);
 const handleLike=async()=>{
  
    try {
      const response = await fetch(
        `http://localhost:5000/api/posts/${post._id}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          // credentials: 'include',
        }
      );

      if (response.ok) {
        setLiked(true);
         setNo(noOfLikes + 1);
      }
    } catch (error) {
      console.log(error);
    }
 }
 const handleUnlike = async () => {
   try {
     const response = await fetch(
       `http://localhost:5000/api/posts/${post._id}`,
       {
         method: 'GET',
         headers: {
           'Content-Type': 'application/json',
           Authorization: `Bearer ${token}`,
         },
        //  credentials: 'include',
       }
     );

     if (response.ok) {
       setLiked(false);
       setNo(noOfLikes-1)
     }
   } catch (error) {
     console.log(error);
   }
 };










  return (
    <Card sx={{ maxWidth: 600, mb:'1vmax',boxShadow:'3' }}>
      <CardHeader title={post.title} subheader={post.creator} />
      <Typography variant='subheader' color='text.secondary'>
        {new Date(post.createdAt).toLocaleString()}
      </Typography>

      <Typography sx={{ fontSize: 14 }} color='text.secondary'>
        {post.location}
      </Typography>
      <CardMedia
        component='img'
        sx={{ heigth: 140 }}
        image={post.selectedFile}
        alt='Paella dish'
      />
      <CardContent>
        <Typography variant='body2' color='text.secondary'>
          {post.message}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Button>
          {liked ? (
            <Favorite style={{ color: 'red' }} onClick={handleUnlike} />
          ) : (
            <FavoriteBorder style={{ color: 'grey' }} onClick={handleLike} />
          )}
        </Button>
        <Typography>{noOfLikes}</Typography>
        <IconButton aria-label='delete'>
          <DeleteIcon onClick={() => dispatch(deletePost(post._id))} />
        </IconButton>
      </CardActions>
    </Card>
  );
}
