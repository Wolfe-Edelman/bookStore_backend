const bcrypt = require('bcrypt');
const User = require('../models/user');

exports.signup = async (req, res) => {
try {
const { email, password, firstName, lastName } = req.body;

// Check if the email is already registered
const existingUser = await User.findOne({ email });
if (existingUser) {
return res.status(409).json({ message: 'Email is already registered' });
}

// Hash the password using bcrypt
const hashedPassword = await bcrypt.hash(password, 10);

// Create a new user object and save it to the database
const newUser = new User({
email,
password: hashedPassword,
firstName,
lastName,
});
await newUser.save();

// Return success response
return res.status(201).json({ message: 'Signup successful' });
} catch (error) {
// Handle any errors that occurred during the signup process
console.error(error);
return res.status(500).json({ message: 'Internal server error' });
}
};

exports.login = async (req, res) => {
try {
const { email, password } = req.body;

// Find the user with the given email
const user = await User.findOne({ email });

// If user not found, return 404 error
if (!user) {
return res.status(404).json({ message: 'User not found' });
}

// Check if the password is correct
const isMatch = await bcrypt.compare(password, user.password);

// If password is incorrect, return 401 error
if (!isMatch) {
return res.status(401).json({ message: 'Incorrect password' });
}

// If email and password are correct, return success response
return res.status(200).json({ message: 'Login successful' });
} catch (error) {
// Handle any errors that occurred during the login process
console.error(error);
return res.status(500).json({ message: 'Internal server error' });
}
};