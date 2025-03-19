const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already in use' });
        }

        const user = new User({ username, email, password });
        await user.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) throw new Error('User not found');

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new Error('Invalid credentials');

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });

        const userData = {
            id: user._id,
            username: user.username,
            email: user.email,
        };

        res.json({ token, user: userData }); 
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};


module.exports = { signup, login };