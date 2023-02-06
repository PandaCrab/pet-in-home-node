const express = require('express');

const router = express.Router();
const { toUpperFirstLatter } = require('../utils');

const { Auth, Registration } = require('../services/models');

router.use('/auth', async (req, res) => {
    try {
        const findUser = await Auth.findOne(req.body);

        if (findUser && findUser.password === req.body.password) {
            res.send({
                token: findUser._id,
                user: {
                    firstName: toUpperFirstLatter(findUser.firstName),
                    lastName: toUpperFirstLatter(findUser.lastName),
                    phone: findUser.phone,
                    email: findUser.email,
                    volunteer: findUser.volunteer,
                    age: findUser.age,
                    animals: findUser.animals,
                    photo: findUser.photo,
                },
                message: 'ok'
            });
        } else {
            res.send({
                token: '',
                message: 'Incorrect email or password'
            });
        }
    } catch (err) {
        console.log(err);
    }
});

router.use('/registration', async (req, res) => {
    try {
        const isExist = await User.findOne({ email: req.body.email });

        if (isExist && (isExist.email === req.body.email)) {
            return res.send({ duplicate: 'The email address already exists' });
        } if (!isExist) {
            const newUser = new Registration({ ...req.body });
            const insertUser = await newUser.save();

            return res.send({
                token: insertUser._id,
                user: {
                    firstName: toUpperFirstLatter(insertUser.firstName),
                    lastName: toUpperFirstLatter(insertUser.lastName),
                    phone: insertUser.phone,
                    email: insertUser.email,
                    volunteer: insertUser.volunteer,
                    age: insertUser.age,
                    animals: insertUser.animals,
                    photo: insertUser.photo,
                },
                message: 'ok',
            });
        }
        return;
    } catch (err) {
        console.log(err);
        return res.send(err.message);
    }
});
