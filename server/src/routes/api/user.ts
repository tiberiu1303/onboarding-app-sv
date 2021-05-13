import { Router } from "express"
import { Model, Query } from 'mongoose'
import { UserInterface } from "../../interfaces/user"
import { TokenInterface } from '../../interfaces/token'
import { getDevice } from '../../utils/app'
const Token: Model<TokenInterface> = require("../../models/token")
const User: Model<UserInterface> = require("../../models/user")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const auth = require('../../routes/middleware/auth')
const router: Router = Router()
import UserController from "../../controller/userController"

router.get('/user', auth, async (req, res) => {
    const user = new UserController()

    try {
        const users = await user.getUser()

        res.json(users)
    } catch (e) {
        res.status(404).json({
            message: e.message
        })
    }
})

router.post('/user/login', async (req, res) => {
    const input: { email: string, password: string } = req.body

    if (!input) {
        return res.status(404).json({
            error: true,
            message: 'Cannot find login data!'
        })
    }

    try {
        const loggedUser =  await User.findOne({
            email: input.email
        })

        const notFoundReturn = {
            message: 'Incorrect email or password!',
            error: true
        };

        if (!loggedUser) {
            return res.status(404).json(notFoundReturn)
        }

        const passwordMatch = await bcrypt.compare(input.password, loggedUser?.password)

        if (!passwordMatch) {
            return res.status(400).send(notFoundReturn)
        }

        res.status(201).json({
            message: 'User was logged in!',
            user: loggedUser,
            token: await loggedUser.generateAuthToken()
        })

    } catch (e) {
        res.status(400).json({
            message: 'A problem occurred during the login. Please contact the administrator',
            error: true
        })
    }
})

router.post('/user/logout', async (req, res) => {
    const authHeader = req.headers.authorization

    if (!authHeader) {
        return res.status(400).json({
            message: 'Cannout find the email!',
            error: true
        })
    }

    const authToken = authHeader.split(' ')[1]

    await Token.findOneAndDelete({
        name: authToken
    })

    res.status(200).json({
        message: "User was logged out!"
    })
})

router.post('/user', async (req, res) => {
    const { email, password, externalId} = req.body

    if (!email || !password || !externalId) {
        return res.status(400).json({
            message: 'Cannot find any data!'
        })
    }

    const checkUser = await User.findOne({
        email
    })

    if (checkUser) {
        return res.status(400).json({
            message: 'There is another user with the same email!'
        })
    }

    let username = email.match(/.*(?=\@[a-zA-Z])/)[0]

    const newUser = new User({
        username,
        email,
        password,
        externalId
    })

    try {
        await newUser.save()

        if (newUser._id) {
            const newToken: TokenInterface = new Token({
                userId: newUser._id,
                name: await jwt.sign({userId: newUser._id}, process.env.JWT_SECRET),
                device: getDevice()
            })
    
            await newToken.save()
        }
    } catch (e) {
        return res.status(401).json({
            message: "User cannot be saved! Please try again later!"
        })
    }

    res.status(201).json({
        message: 'User was created!',
        user: newUser,
        token: await newUser.generateAuthToken()
    })
})

router.patch('/user', async (req, res) => {
    
})

router.delete('/user', async (req, res) => {
    
})

module.exports = router