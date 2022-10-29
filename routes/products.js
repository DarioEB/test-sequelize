"use strict";
const router = require('express').Router();

const models = require('../models');

const Product = models.Product;
const User = models.User;

function findUserById(req, res, next) {
    const { usersId } = req.body;

    return Promise.allSettled(usersId.map((userId) => {
        return User.findByPk(userId);
    }))
        .then((results) => {
            const ids = [];
            results.forEach((result) => {
                if (result.status === 'fulfilled' && result.value) {
                    ids.push(result.value.id)
                }
            });
            req.users = ids;
            return next();
        })
        .catch((error) => {
            return res.status(500).json({
                msg: 'Internal Server Error'
            })
        })
}



function createProduct(req, res) {
    const { name, price, stock } = req.body;
    let products = [];

    console.log(req.users);

    return Promise.all(req.users.map((user) => {
        console.log({user});

        return Product.create({ 
            name,
            price,
            stock,
            user_id: user
        })
    }))
        .then((results) => {
            console.log(results)

            return res.status(200).json({
                msg: 'buena',
                response: results
            })
        })

    return res.status(200).json({
        msg: 'TOOD BIEN',
        products,
    })
}

router.post(
    '/',
    findUserById,
    createProduct
);

module.exports = router;