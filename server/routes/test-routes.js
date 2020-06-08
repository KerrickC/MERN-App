const express = require('express')

const passport = require('passport')

const TestSchema = require('../models/test-model')
const User = require('../models/user-model')

const jwt = require('jsonwebtoken')
const withAuth = require('../middlewear/middlewear')

const router = express.Router()






//Delete, Post(all or one), and Get

// //not using
// router.get('/test/:id', (req, res) => {
//     const id = req.params.id
//     TestSchema.findOne({ _id: id })
//         .then((data) => {
//             return res.status(200).json(data)
//         })
//         .catch(error => {
//             return res.status(404).json({
//                 error,
//                 message: 'Data not found',
//             })
//         })

// })

router.get('/tests', async (req, res) => {
    //console.log("get all")
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
    }).catch(err => console.log(err))
})


router.post('/test', (req, res) => {
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


router.delete('/test/:id', async (req, res) => {
    await TestSchema.findOneAndDelete({ _id: req.params.id }, (err, test) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        } else if (!test) {
            return res.status(200).json({ success: true, data: test })
        }


    }).catch(err => console.log(err))
})

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

router.post('/authenticate', (req, res) => {
    const { username, password } = req.body
    console.log(req.body)
    User.findOne({ username }, (err, user) => {
        if (err) {
            console.error(err)
            res.status(500).json({ error: 'Internal error' })
        } else if (!user) {
            res.status(401).json({ error: 'Incorrect username or password' })
        } else {
            user.isCorrectPassword(password, (err, same) => {
                if (err) {
                    console.log(err)
                    res.status(500).json({ error: 'Internal error' })
                } else if (!same) {
                    res.status(401).json({ error: 'Incorrect username or password' })
                } else {
                    // Issue token
                    const payload = { username };
                    const token = jwt.sign(payload, "secret", { expiresIn: '1h' });
                    // res.cookie('token', token, { httpOnly: true }).sendStatus(200);
                    console.log(token)
                    res.status(200).json({token})
                }
            })
        }
    })
})

router.get('/secret', withAuth, (req, res) => {
    res.send('Secret code: kerrickiscool')
})

router.get('/checkToken', withAuth, (req, res) => {
    res.sendStatus(200);
})


module.exports = router