const User = require("../model/userModel");
const brcypt = require('bcrypt');



module.exports.register = async (req,res,next) => {
    try {
        const { username, phone, password } = req.body;
        const usernameCheck = await User.findOne({ username });
        if(usernameCheck)
            return res.json({ msg: "Username already exists", status: false });
        const phoneCheck = await User.findOne({ phone });
        if(phoneCheck)
            return res.json({ msg: "Phone already exists", status: false });
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

module.exports.login = async (req,res,next) => {
    try {
        const { phone, password } = req.body;
        const phoneNumber = await User.findOne({ phone });
        if(!phoneNumber)
            return res.json({ msg: "Incorrect phone number or password", status: false });

        const isPasswordValid = await brcypt.compare(password, phoneNumber.password);
        if(!isPasswordValid)
            return res.json({ msg: "Incorrect phone number or password", status: false });

        delete phoneNumber.password;
        
        return res.json({ status: true, phoneNumber});
    } catch (ex) {
        next(ex);
    }
};