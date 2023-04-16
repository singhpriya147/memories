import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import PostForm from '../components/PostForm';
import PostItem from '../components/PostItem';
import Header from '../components/Header'
import { reset } from '../features/auth/authSlice';
import MyProfile from '../components/MyProfile';
import { Box, Card, Typography } from '@material-ui/core';
import { flexbox } from '@mui/system';
import { getFeedPosts } from '../features/Posts/postSlice';

import UserItem from '../components/UserItem'
function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const [posts, setPosts] = useState([]);
  const [persons, setPersons] = useState([]);
  // const { posts, isLoading, isError, message } = useSelector(
  //   (state) => state.posts
  // );
  
 

  const userId = user._id;
  const token = user.token;

  useEffect(() => {
    getUserFeed();
    getAllPerson();
    return () => {
      dispatch(reset());
    };
  }, [userId, dispatch, navigate, token]);

  const getUserFeed = async () => {
    const res = await fetch(`http://localhost:5000/api/posts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const post = await res.json();

    setPosts(post.posts);

    console.log(post);
  };

  const getAllPerson = async () => {

    try{
    const res = await fetch(`http://localhost:5000/api/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const allUsers = await res.json();

    // console.log(allUsers.users);
    setPersons(allUsers.users);
    
    }
    catch(error){
  console.error(error);
  
    }
  };
  // const handleFollow = (id) => {
  //   const updatedPersons = persons.map((person) => {
  //     if (person._id === id) {
  //       return { ...person, isFollowing: !person.isFollowing };
  //     }
  //     return person;
  //   });
  //   setPersons(updatedPersons);
  // };


  return (
    <Box>
      <Header />

      <Box
        sx={{
          width: '100vh',
          padding: '2rem',
          gap: '0.5rem',
          display: 'flex',
          flexDirection: 'row',
        }}
        // justifyContent= 'center'
      >
        {/* loggedin user profile */}
        <Box sx={{}}>
          {user ? (
            <MyProfile key={user._id} userId={user._id} token={user.token} />
          ) : null}
        </Box>

        {/*  form for post */}
        <Box>
          <PostForm />
          {/*  feed area */}
          <Box
            sx={{
              pt: '3rem',
              pl:'3rem',
              alignContent: 'center',
            }}>
          
            {posts.length > 0 ? (
              <Box sx={{ width: 500, height: 300,color:'red' }}>
                {posts.map((post) => (
                  <PostItem key={post._id} post={post} />
                ))}
              </Box>
            ) : (
              <Typography>You have not set any memories</Typography>
            )}
          </Box>

        </Box>

        {/* avilable user to follow */}
        <Box sx={{ width: 500, alignContent: 'center' }}>
          {persons ? (
            persons.length > 0 ? (
              <Box sx={{ width: 500, height: 300,  }}>
                {persons.map((person) => (
                  <UserItem key={person._id} person={person}  />
                ))}
              </Box>
            ) : (
              <Typography>no user available to follow</Typography>
            )
          ) : (
            <Typography>Loading...</Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default Dashboard;
