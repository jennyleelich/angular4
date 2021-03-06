var express = require('express');
var router = express.Router();
var User = require('../models/user');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

router.post('/', function (req, res, next) {
    var user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        passWord: bcrypt.hashSync(req.body.passWord,10),
        email: req.body.email,
        messages:req.body.messages
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
router.post('/signin',function(req,res,next){
    User.findOne({email:req.body.email},function(err,user){
        if(err){
            return res.status(500).json({
                title:'An error occured',
                error:err
            });
        }
        if(!user){
            return res.status(401).json({
                title:'Login failed',
                error:{message: 'Invalid login credentials'}
            });
        }
        if(!bcrypt.compareSync(req.body.passWord,user.passWord)){
            return res.status(401).json({
                title:'Login failed',
                error:{message: 'Invalid login credentials'}
            });
        }
        var token = jwt.sign({user:user},'secret',{expiresIn:7200});//created a new token and signs it for us, generate and sign it
        res.status(200).json({
            message:'Successfully logged in',
            token: token,
            userId: user._id
        })
        
    })
})
module.exports = router;
