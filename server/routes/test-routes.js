const express = require('express')

const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const JwtStrategy = require('passport-jwt').Strategy
const {ExtractJwt} = require('passport-jwt')

const TestSchema = require('../models/test-model')
const User = require('../models/user-model')


const jwt = require('jsonwebtoken')

const router = express.Router()

//register - not in UI (postman)
router.post('/register', (req, res) => {
    console.log(req.body)
    const { username, password } = req.body
    const user = new User({ username, password })
    user.save((err) => {
        if (err) {
            res.status(500).send("Could not register user")
        } else {
            res.status(200).send("Welcome to Club Kerrick")
        }
    })
})

//login using login strategy and send status 200
router.post('/authenticate', passport.authenticate('login', { successFlash: true, session: false }), (req, res) => {
    console.log(req.user)
    res.status(200).send(req.user)
})

//login strategy
passport.use('login', new LocalStrategy(
    function (username, password, done) {
        User.findOne({ username: username }, (err, user) => {
            if (err) {
                console.log('here')
                return done(err)
            }
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' })
            }
            if (user.isCorrectPassword(password, (err, same) => {
                if (err) {
                    console.log('internal error')
                } else if (!same) {
                    console.log('incorrect password')
                    return done(null, false, { message: 'Incorrect password' })
                } else {
                    //issue token
                    const payload = { username };
                    const token = jwt.sign(payload, "secret", {expiresIn: '1h'});
                    return done(null, token)
                    //return token to be stored in localStorage
                }
            })) {
                console.log('im lost')
            }
        })
    }
))

//jwt strategy for access to database info
passport.use('jwt',new JwtStrategy(
    {
      secretOrKey: "secret",
      jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
      algorithms:['HS256']
    },
    (payload, done) => done(null, payload)
  ))

//get all tests if jwt is authenticated
router.get('/tests', passport.authenticate('jwt', { successFlash: true, session: false}), async (req, res) => {
    //console.log(req.user)

    await TestSchema.find({}, (err, tests) => {
        if (err) {
            return res.status(400).json(
                { success: false, error: err }
            )
        }
        if (!tests.length) {
            return res
                .status(404)
                .json({ success: false, error: `TestSchema not found` })
        }
        return res.status(200).json({ success: true, data: tests })
    }).catch(err => console.log("here"))
})

//post if jwt is authenticaed 
router.post('/test', passport.authenticate('jwt', { successFlash: true, session: false}),(req, res) => {
    const body = req.body
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a test schema',
        })
    }
    const test = new TestSchema(body)
    console.log(test)
    if (!test) {
        return res.status(400).json({ success: false, error: err })
    }
    test
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: test._id,
                message: 'TestSchema created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'TestSchema not created!',
            })
        })
})

//delete post if jwt is authenticated
router.delete('/test/:id',passport.authenticate('jwt', { successFlash: true, session: false}), async (req, res) => {
    await TestSchema.findOneAndDelete({ _id: req.params.id }, (err, test) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        } else if (!test) {
            return res.status(200).json({ success: true, data: test })
        }


    }).catch(err => console.log(err))
})


module.exports = router