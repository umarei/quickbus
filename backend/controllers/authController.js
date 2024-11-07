// backend/controllers/authController.js
const User = require('../models/User');

exports.signup = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = new User({ username, password });
    await user.save();
    req.session.userId = user._id;
    res.status(201).json({ message: 'User created', userId: user._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user && await user.comparePassword(password)) {
      req.session.regenerate(err => {
        if (err) {
          return res.status(500).json({ message: 'Error regenerating session.' });
        }
        req.session.userId = user._id;
        res.status(200).json({ message: 'Login successful', userId: user._id });
      });
    } else {
      res.status(400).json({ message: 'Invalid credentials' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.logout = (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ message: 'Error logging out.' });
    }
    res.clearCookie('connect.sid');
    res.status(200).json({ message: 'Logged out successfully.' });
  });
};
