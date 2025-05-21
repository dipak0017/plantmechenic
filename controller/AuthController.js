const User = require("../Model/user");
const bcrypt = require("bcryptjs");

// Register new user
exports.registerUser = async (req, res) => {
  console.log('hit register')
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return res.status(400).json({ msg: "All fields are required" });

  const existingUser = await User.findOne({ email });
  if (existingUser)
    return res.status(400).json({ msg: "User already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  res.status(201).json({
    id: newUser._id,
    name: newUser.name,
    email: newUser.email,
  }); 
};

// Login existing user
exports.loginUser = async (req, res) => {
  console.log("login route hit")
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ msg: "Invalid email or password" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ msg: "Invalid email or password" });

  res.status(200).json({
    id: user._id,
    name: user.name,
    email: user.email,
  });
};
