'use strict';
const router = require('express').Router();
const bcrypjs = require('bcryptjs');

const models = require('../models');

const User = models.User;

function getUsers(req, res) {
    // const user = new User({});
    User.findAll({})
        .then((data) => {
            if(!data) {
                return res.status(400).json({ msg: 'Bad Request '})
            }   
            return res.status(200).json(data)     
        })
        .catch((error) => {
            console.log(`${error.message}`);
            return res.status(500).json({ msg: 'Internal Server Error'});
        });
};

function createUser(req, res){ 
    const { email, password } = req.body;

    const hashPassword = bcrypjs.hashSync(password, 10);

    return User.create({email, hashPassword})
        .then((user) => {
            return res.status(200).json(user)
        })
        .catch((user) => {
            return res.status(500).json({msg: 'Internal Server Error'})
        })
};


router.get(
    '/',
    getUsers,
);

router.post(
    '/',
    createUser
)

module.exports = router;