const User = require('../models/user').default
const CryptoJs = require('crypto-js')
const jsonwebtoken = require('jsonwebtoken')

// Регистрация пользователя
exports.register = async (req, res) => {
    const {password} = req.body
    try {
        req.body.password = CryptoJs.AES.encrypt(
            password
        )
        const user = await User.create(req.body)
        res.status(201).json({user}) //18 y.o
    }
    catch (error){
        res.status(500).json(error)
    }
}

// Авторизация пользователя
exports.login = async (req,res) => {
    const {username, password} = req.body
    try {
        const user = await User.findOne({username}).select("password username")
        if(!user){
            return res.status(401).json({
                errors: [
                    {
                        param: 'username',
                        message: 'Неправильный логин или пароль'
                    }
                ]
            })
        }
        const decryptedPass = CryptoJs.AES.decrypt(
            user.password
        ).toString(CryptoJs.enc.Utf8)
        if (decryptedPass !== password){
            return res.status(401).json({
                errors: [
                    {
                        param: 'username',
                        message: 'Неправильный логин или пароль'
                    }
                ]
            })
        }
        user.password = undefined
        res.status(200).json({user})
    }
    catch (error){
        res.status(500).json(error)
    }
}