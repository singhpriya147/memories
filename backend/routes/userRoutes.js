const express = require('express');
const router = express.Router();
const { registerUser, loginUser} = require('../controllers/authControllers');
const {
  getUser,
  followUser,
  unfollowUser,
  // getPostOfFollowing,
  getAllUsers,
} = require('../controllers/userController');

const {protect}=require('../middleware/authMiddleware')

router.post('/', registerUser);
router.post('/login', loginUser);

router.get('/:id', getUser);
router.put('/follow/:id',protect,followUser );
router.put('/unfollow/:id', protect, unfollowUser);
router.get('/', protect, getAllUsers);

module.exports = router;
