const User = require('../models/userSchema')

exports.createOrUpdateUser = async (req, res) => {
    const { picture, email } = req.user;
    const user = await User.findOneAndUpdate(
        { email },
        { name: email.split('@')[0], picture },
        { new: true });
    
    if (user) {
        res.json(user);
    } else {
        const newUser = await new User({
            email,
            name: email.split('@')[0],
            picture
        }).save();
        res.json(newUser);
    }
};

exports.getCurrentUser = async (req, res) => {
    User.findOne({ email: req.user.email }).exec((error, user) => {
        if (error) throw new Error(error)
        res.json(user);
    })
}