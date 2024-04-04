const User = require("../model/userModel");
const brcypt = require('bcrypt');



module.exports.register = async (req,res,next) => {
    try {
        const { username, phone, password } = req.body;
        const usernameCheck = await User.findOne({ username });
        if(usernameCheck)
            return res.json({ msg: "Username already exists", success: false });
        const phoneCheck = await User.findOne({ phone });
        if(phoneCheck)
            return res.json({ msg: "Phone already exists", success: false });
        const hashedPassword = await brcypt.hash(password, 10);
        const user = await User.create({
            username,
            phone,
            password: hashedPassword,
        });
        delete user.password;
        return res.json({ status: true, user});
    } catch (ex) {
        next(ex);
    }
};