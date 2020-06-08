const jwt = require('jsonwebtoken')
const secretsig = 'seeeeeecret'

const withAuth = (req,res,next) => {
    const token = req.cookies.token

    if(!token) {
        res.status(401).send('Unauthorized: no token')
    }else {
        jwt.verify(token, secret, (err, decoded) => {
            if(err) {
                res.status(401).send('Unauthorized: invalid token')
            }else{
                req.username = decoded.username
                next()
            }
        })
    }
}

module.exports = withAuth