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

module.exports = {
  getUser,
};
