const mongoose=require('mongoose');
const crypto=require('crypto');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'please add a name'],
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      required: [true, 'please add a email'],
      max: 50,
      unique: true,
    },


 location:{
      type: String,
      required: [true, 'please add a location'],
    } ,
    occupation:{
       type: String,
      required: [true, 'please add a job'],
    },
    
    
    password: {
      type: String,
      required: [true, 'please add a password'],
      // select:false,
    },
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PostMessage',
      },
    ],
    follower: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],

    profilePicture: {
      type: String,
      default: '',
    },
  
    resetPasswordToken: String,
    resetPasswordExpire:Date,
  },

  {
    timestamps: true,
  }
);

userSchema.methods.getResetPasswordToken= function () {
  const resetToken = crypto.randomBytes(20).toString('hex');
  // console.log(" from user schema");
  // console.log(resetToken);
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

// UserSchema.methods.generateToken=function(){
//   return jwt.sign({_id:this._id},process.env.JWT_KEY,{
//     expiresIn:'90d'
//   }
//     )
// }
module.exports = mongoose.model('User',userSchema);
