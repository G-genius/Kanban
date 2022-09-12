const jsonwebtoken = require('jsonwebtoken')
const User = require('../models/user')

const tokenDecode = (req) => {
    const carrierHeader = req.headers['authorization']
    if(carrierHeader) {
        const carrier = carrierHeader.split(' ')[1]
        try{
            const tokenDecoded = jsonwebtoken.verify(
                carrier
            )
            return tokenDecoded
        }
        catch {
            return false
        }
    }
    else {
        return false
    }
}

exports.verifyToken = async (req, res, next) => {
    const tokenDecoded = tokenDecode(req)
    if (tokenDecoded) {
        const user = await User.findById(tokenDecoded.id)
        if (!user) return res.status(401).json('Unathorized')
        req.user = user
        next()
    } else {
        res.status(401).json('Unathorized')
    }
}