const asyncHandler=require('express-async-handler')
const  PostMessage =require( '../models/postModels.js');
const User=require('../models/userModels')
// get all post so it is plural
// since retrieving data from db is asyncrounous process so we use async await


// const getFeedPosts=asyncHandler(async(req,res)=>{
//  try {
//   const post=await PostMessage.find();
//   res.status(200).json(post);
//  } catch (error) {
//   res.status(404).json({message:error.message});
//  }
// })
 



const getUserPosts=asyncHandler(async(req,res)=>{
   try {
    const PostMessages=await PostMessage.find({user:req.user.id});

    res.status(201).json(PostMessages);

   } catch (error) {
    res.status(400).json({message:error.message})
   }
 
});








 const createPost= asyncHandler(async(req, res) => {
 const { title, message, selectedFile, creator, tags, fav, createdAt } =
   req.body;
//  const newPostMessage=new PostMessage({
//   title,message,selectedFile,creator,tags
//  })
// try {
//  const val=await newPostMessage.save();
//  res.status(201).json(val);
// } catch (error) {
//  res.status(400).json({ message: error.message });
// }


if(!req.body){
  res.status(400).json({message:'please add all infomation'})
}


 const newPostMessage = await PostMessage.create({
   title: req.body.title,
   message: req.body.message,
   selectedFile: req.body.selectedFile,
   creators: req.body.creators,
   tags: req.body.tags,
   user: req.user.id,
   fav: req.user.fav,
 });

 const user=await User.findById(req.user._id);
 user.posts.push(newPostMessage._id);
 await user.save();
  //  console.log(req.body.selectedFile);
   res.status(200).json(newPostMessage);
 });






 const editPost = (req, res) => {

  
  res.status(201).json('edit a post');
};

// for liking a post 
 const likePost=asyncHandler(async(req,res)=>{
  console.log('working')
  try {

    // const { id } = req.param._id;
    // const { userId } = req.body;
    const post = await PostMessage.findById(req.params.id);
   console.log(post)
    if(!post){
      return res.status(404).json({
        success:false,
        message:'page not found'
      })
    }
     if(post.likes.includes(req.user._id))
     {
     const index=post.likes.indexOf(req.user._id);
     post.likes.splice(index,1);  
     await post.save();
       return res.status(200).json({
      success:true,
      message:"post unliked"

     });
    }
     else{
     console.log(req.user._id)
     post.likes.push(req.user._id);
     await post.save();
     return res.status(200).json({
      success:true,
      message:"post liked"

     })
     }
  

  } catch (error) {
     res.status(400).json({message:error.message});
  }
 } )






 const deletePost = asyncHandler(async(req, res) => {

  const PostMessages = await PostMessage.findById(req.params.id);
//   console.log(" found the id for deletion")
if (!PostMessages) {
  res.status(400);
  throw new Error(' not found');
}
// check for user
if (!req.user) {
  res.status(401);
  throw new Error('user not found');
}
// make sure the logged in user matches the goal user
if (PostMessages.user.toString() !== req.user.id) {
  res.status(401);
  throw new Error('user not authirized');
}
await PostMessages.remove()
 console.log("post removed")
  res.status(200).json({id:req.params.id} );


  // res.status(201).json('delete post');
});




const getPostOfFollowing = async (req, res) => {
  
  try {
    // const user = await User.findById(req.user.id).populate('following','posts');

     const user = await User.findById(req.user.id)
      const posts=await PostMessage.find({
        user:{$in:user.following}
      })

    res.status(500).json({
      success: true,
      // following:user.following,
      posts:posts.reverse(),
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};







module.exports = { getUserPosts,createPost, getPostOfFollowing, editPost,likePost, deletePost };