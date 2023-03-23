const express = require('express');
const router = express.Router();
const { registerUser, loginUser} = require('../controllers/authControllers');
const {getUser}=require('../controllers/userController')
const {protect}=require('../middleware/authMiddleware')

router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/:id', getUser);
module.exports = router;
