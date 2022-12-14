const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const UserModel = require('../../models/User')

const tempRegister = async (req, res) => {
    try {
        const pwdChars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        const pwdLen = 8;
        let password = Array(pwdLen).fill(pwdChars).map((x) => x[Math.floor(Math.random() * x.length)]).join('');
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        const defaultRole = "user"

        const doc = new UserModel({
            email: req.body.email,
            passwordHash: hash,
            role: defaultRole
        });

        const user = await doc.save();

        const token = jwt.sign(
            {
                _id: user._id,
            },
            process.env.SECRET_KEY,
            {
                expiresIn: '30d',
            }
        );

        const {email, role} = user._doc;


        res.json({
            email,
            role,
            token,
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось зарегистрироваться',
        });
    }
};

const register = async (req, res) => {
    const {email, password, role} = req.body
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        const defaultRole = "user"

        const doc = new UserModel({
            email: email,
            passwordHash: hash,
            role: role === "admin" ? "admin" : defaultRole
        });

        const user = await doc.save();
        const token = jwt.sign(
            {
                _id: user._id,
            },
            process.env.SECRET_KEY,
            {
                expiresIn: '30d',
            }
        );

        const {passwordHash, ...userData} = user._doc;


        res.json({
            ...userData,
            token,
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось зарегистрироваться',
        });
    }
}

const login = async (req, res) => {
    try {
        const user = await UserModel.findOne({email: req.body.email})
        if (!user) {
            return req.status(404).json({
                message: "user not found"
            })
        }

        const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash)
        if (!isValidPass) {
            return res.status(404).json({
                message: "Your email or password is not correct"
            })
        }

        const token = jwt.sign({
            _id: user._id
        }, process.env.SECRET_KEY, {expiresIn: "30d"})

        const {passwordHash, ...userData} = user._doc

        res.json({
            ...userData,
            token
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'You can"t login'
        })
    }
}

const resetPassword = async (req, res) => {
    const {oldPassword, newPassword} = req.body
    try {
        const user = await UserModel.findOne({email: req.body.email})
        const isValidPass = await bcrypt.compare(oldPassword, user._doc.passwordHash)
        if (isValidPass) {
            const password = newPassword
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);
            UserModel.findByIdAndUpdate(
                {_id: user._id},
                {passwordHash: hash},
                {new: true},
                (err) => {
                    console.log(err)
                    res.status(500).json({
                        message: 'You can"t change your password< try again'
                    })
                }
            )
            res.status(200).json({
                message: "you change your password"
            })

        }

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'You can"t change password'
        })
    }
}


module.exports = {
    register,
    tempRegister,
    login,
    resetPassword
}