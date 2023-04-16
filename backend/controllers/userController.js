const User = require('../models/userModels');

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    console.log('working');
    console.log(id);
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }

  // res.status(200).json({ message: 'getme' });
};

const getAllUsers = async (req, res) => {
  try {
     const currentUser = req.user; 
      const following = currentUser.following; 
    const users = await User.find({
      _id: { $ne: currentUser._id, 
        // $nin: following 
      },

      
    });
   

    res.status(200).json({
      success:true,
      // userNames,
      users
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }

  // res.status(200).json({ message: 'getme' });
};

const followUser=async(req,res)=>{
try {
  const userToFollow= await User.findById(req.params.id);
  console.log(" follow user function is runnig")

 const loggedInUser = await User.findById(req.user._id);

   if(!userToFollow){
    return res.status(404).json({
      success:false,
      message:"user not found"
    })
   } 
  
   if (userToFollow.follower.includes(loggedInUser._id)) {
     await User.findByIdAndUpdate(userToFollow._id, {
       $pull: { follower: loggedInUser._id },
     });
     await User.findByIdAndUpdate(loggedInUser._id, {
       $pull: { following: userToFollow._id },
     });

     await loggedInUser.save();
     await userToFollow.save();

     res.status(200).json({
       success: true,
       message: 'user is already followed, now unfollowed',
     });
   } else {
     //  loggedInUser.following.push(userToFollow._id);
     //  userToFollow.follower.push(loggedInUser._id);
     await User.findByIdAndUpdate(userToFollow, {
       $push: { follower: loggedInUser },
     });
     await User.findByIdAndUpdate(loggedInUser, {
       $push: { following: userToFollow },
     });

     await loggedInUser.save();
     await userToFollow.save();
     res.status(200).json({
       success: true,
       message: 'user followed',
     });
   }
  

} catch (error) {
  res.status(500).json({
    success:false,
    message:error.message
  })
}
}




module.exports = {
  getUser,
  // getUserFriends,
  // addRemoveFriend,
  getAllUsers,
  followUser,
 
};
