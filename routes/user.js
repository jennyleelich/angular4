var express = require('express');
var router = express.Router();
var User = require('../models/user');
var bcrypt = require('bcryptjs');

router.post('/', function (req, res, next) {
    var user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        passWord: bcrypt.hashSync(req.body.passWord,10),
        email: req.body.email
    });
    user.save(function(err,result){
        if(err){
            return res.status(500).json({
                title: 'An error occurred',
                error:err
            });
        }
        res.status(201).json({
            message: 'User created',
            obj: result
        });
    });
   });

module.exports = router;
