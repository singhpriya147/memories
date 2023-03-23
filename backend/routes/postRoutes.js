const express =require('express');
const { getPosts, createPost,editPost,deletePost }= require('../controllers/postControllers');
 const router =express.Router();


 const {protect}=require('../middleware/authMiddleware')
 router.get('/',protect, getPosts);
 router.post('/',protect, createPost);
 router.put('/:id',protect, editPost);
 router.delete('/:id', protect, deletePost);
//  router.post('/favorite', async (req, res) => {
//    const { postId, userId } = req.body;

//    try {
//      const post = await Post.findById(postId);
//      if (!post) return res.status(404).json({ error: 'Post not found' });

//      const alreadyFavorited = post.favorites.some((fav) => fav.equals(userId));
//      if (alreadyFavorited)
//        return res.status(400).json({ error: 'Post already favorited by user' });

//      post.favorites.push(userId);
//      await post.save();

//      res.json({ success: true });
//    } catch (err) {
//      console.error(err);
//      res.status(500).json({ error: 'Server error' });
//    }
//  });

 module.exports= router;