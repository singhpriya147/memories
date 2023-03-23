import axios from 'axios';
const API_URL='/api/posts';

// create new post

const createPost=async(postData,token)=>{
 const config = {
   headers: {
     Authorization: `Bearer ${token}`,
   },
 };
  const response = await axios.post(API_URL, postData, config);
  console.log('data posted');
  return response.data;
}






// const createPost = async (postData, token) => {
//   const config = {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify(postData),
//   };

//   try {
//     const response = await fetch(API_URL, config);
//     console.log('data posted');
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error(error);
//   }
// };


const getPosts = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

// const favPost=async(req.res)=>{
//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };
//   const response= await axios.get(API_URL+'/favorite'+postId,config);
//     console.log(response);
//   return response.data;
// }
const deletePost = async (postId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL +'/'+postId, config);
  console.log(response);
  return response.data;
};






const postService = {
  createPost,
  getPosts,
  deletePost,
};

export default postService;