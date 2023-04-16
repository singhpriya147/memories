const express =require('express');
const {
  getUserPosts,
  createPost,
  editPost,
  likePost,
  deletePost,
  // getFeedPosts
  getPostOfFollowing,
} = require('../controllers/postControllers');


 const router =express.Router();


 const {protect}=require('../middleware/authMiddleware')


 router.post('/',protect, createPost);

  // router.get('/', protect, getFeedPosts);
  router.get('/', protect, getPostOfFollowing);
//  router.put('/:id',protect, editPost);

 router.delete('/:id', protect, deletePost);

  router.get('/:userId/posts', protect, getUserPosts);

  router.get('/:id', protect, likePost);
  


 module.exports= router;