// import React from 'react';
// import Card from '@mui/material/Card';
// import { Typography } from '@mui/material';
// import CardMedia from '@mui/material/CardMedia';
// import { useDispatch, useSelector } from 'react-redux';
// import { useEffect, useState } from 'react';
// import { getUser } from '../features/auth/authSlice';

// function MyProfile({ userId }) {
//   const [user, setUser] = useState(null);

//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(getUser({ userId })).then((data) => setUser(data));
//   }, [dispatch, userId]);

//   const {
//     name,
//     email,
//     location,
//     occupation,
//     profilePicture,

//     friends,
//   } = user;

//   return (
//     <Card>
//       MyProfile
//       <Typography>{name}</Typography>
//       <CardMedia
//         component='img'
//         height='194'
//         image={profilePicture}
//         alt='Paella dish'
//       />
//     </Card>

//     // <> hello
//     // </>
//   );
// }

// export default MyProfile;
