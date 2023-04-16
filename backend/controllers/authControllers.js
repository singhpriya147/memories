const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModels');

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password,profilePicture,friends,location,occupation } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error('pleasd add filed');
  }

  // check if user exist 
  const userExist=await User.findOne({email})
 if(userExist){
  res.status(400)
  throw new Error('user already exist')
 }

 // hash the password 
 const salt=await bcrypt.genSalt(10)
 const hashedPassword=await bcrypt.hash(password,salt)

 // create a user

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    profilePicture: req.body.profilePicture,
    friends,
    location,
    occupation,
  });

//  console.log(req.body.profilePicture);


 if(user){
  res.status(201).json({
  _id:user.id,
  name:user.name,
  email:user.email,
  token:generateToken(user._id),

  })
 }
 else{
  res.status(400)
  throw new Error('invalid user data')
 }


  // res.status(200).json({ message: 'register user' });
});

 const loginUser = asyncHandler(async(req, res) => {
  const {email,password}=req.body
  // find user in database by email
  const user=await User.findOne({email})
  
 if (user && (await bcrypt.compare(password, user.password))) {
   res.json({
     _id: user.id,
     name: user.name,
     email: user.email,
     token: generateToken(user._id),
   });
 } else {
   res.status(400);
   throw new Error('invalid credential');
 }
})
  




















// geneerate JWT
const generateToken=(id)=>{
 return jwt.sign({ id }, process.env.JWT_KEY, {
   expiresIn: '90d',
 });
}


module.exports = {
  registerUser,loginUser
};
