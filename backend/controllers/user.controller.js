const User = require('../models/user.models');

// @desc    Create a user
// @route   POST /api/users
exports.createUser = async (req, res) => {
    try {
        const { name, age, address, sex } = req.body;
        const user = new User({ name, age, address, sex });
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get all users
// @route   GET /api/users
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get a user by ID
// @route   GET /api/users/:id
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update a user
// @route   PUT /api/users/:id
exports.updateUser = async (req, res) => {
    try {
        const { name, age, address, sex } = req.body;
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { name, age, address, sex },
            { new: true, runValidators: true }
        );
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete a user
// @route   DELETE /api/users/:id
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json({ message: 'User deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
