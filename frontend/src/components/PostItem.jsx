import * as React from 'react';

import { useState } from 'react';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import { Typography } from '@material-ui/core';
import CardActions from '@mui/material/CardActions';

import {IconButton }from '@material-ui/core';
import { useDispatch } from 'react-redux';

// import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import DeleteIcon from '@mui/icons-material/Delete';
import { deletePost } from '../features/Posts/postSlice';


export default function PostItem({post}) {

  
  const [color,setColor]=useState('grey');
  // const classes = useStyles();
 const dispatch=useDispatch();




 
 const handleClick=async()=>{
  setColor(color==='grey'? 'red' :'grey')
 
  
 }


  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        title={post.title}
        subheader={post.creator}
       
      />
      <Typography variant='subheader' color='text.secondary'>
        {new Date(post.createdAt).toLocaleString()}
      </Typography>

      <CardMedia
        component='img'
        height='194'
        image={post.selectedFile}
        alt='Paella dish'
      />
      <CardContent>
        <Typography variant='body2' color='text.secondary'>
          {post.message}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label='add to favorites'>
          <FavoriteIcon style={{ color }} onClick={handleClick}  />
        </IconButton>
        <IconButton aria-label='share'>
          <ShareIcon />
        </IconButton>
        <IconButton aria-label='delete'>
          <DeleteIcon onClick={() => dispatch(deletePost(post._id))}/>
        </IconButton>
      </CardActions>
    </Card>
  );
}
