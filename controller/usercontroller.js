const User = require('../models/user');
const bcrypt = require('bcryptjs');

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, phone, ownerFirstName, ownerLastName } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      ownerFirstName,
      ownerLastName,
    });

    const savedUser = await user.save();
    res.status(201).json({
      id: savedUser._id,
      email: savedUser.email,
      name: savedUser.name,
    });
  } catch (error) {
    res.status(500).json({ msg: 'Registration failed', error });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    res.json({
      id: user._id,
      email: user.email,
      name: user.name,
    });
  } catch (error) {
    res.status(500).json({ msg: 'Login failed', error });
  }
};
    