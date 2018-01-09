var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var Message = require('../models/message');
var User = require('../models/user');

router.get('/',function(req,res,next){
    Message.find()
            .exec(function(err,messages){
                 if(err){
                        return res.status(500).json({
                            title: 'An error occured',
                            error:err
                        })
                    }else{
                        return res.status(200).json({
                            message: 'Success',
                            obj: messages
                        })
                    }
            })
})
router.use('/',function(req,res,next){
    jwt.verify(req.query.token,'secret',function(err,decoded){
        if(err){
            return res.status(401).json({
                title: 'Not Authenticated',
                error:err
            });
        }
        next();
    })
})
router.post('/', function (req, res, next) {
    var decoded = jwt.decode(req.query.token);
    User.findById(decoded.user._id,function(err,user){
        if(err){
            return res.status(500).json({
                title:'An error occured',
                error:err
            });
        }
        var message = new Message({
            content: req.body.content,
            user: user._id
        })
        console.log("reqbody",req.body);
        message.save(function(err,result){
            if(err){
                return res.status(500).json({
                    title: 'An error occured',
                    error:err
                })
            }
            
            console.log('usermessages',user.messages);
            console.log('user',user);
            user.messages.push(result);
            user.save();
            res.status(201).json({
                    message: 'Saved message',
                    obj: result
                })
        })
    })
});
router.patch("/:id",function(req,res,next){
    Message.findById(req.params.id, function(err,message){
        if(err){
            return res.status(500).json({
                title: 'An error occured',
                error:err
            })
        }
        if(!message){
            return res.status(500).json({
                title:'No Message Found',
                error:{message:'Message not found'}
            });
        }
        message.content = req.body.content;
        message.save(function(err,result){
            if(err){
            return res.status(500).json({
                title: 'An error occured',
                error:err
                })
            }else{
                return res.status(200).json({
                    message: 'updated message',
                    obj: result
                });
            }
        })
    })
})
router.delete('/:id',function(req,res,next){
    console.log('req is:',req.params);
    Message.findById(req.params.id, function(err,message){

        if(err){
            return res.status(500).json({
                title: 'An error occured',
                error:err
            })
        }
        if(!message){
            return res.status(500).json({
                title:'No Message Found',
                error:{message:'Message not found'}
            });
        }
        //message.content = req.body.content;
        message.remove(function(err,result){
            if(err){
            return res.status(500).json({
                title: 'An error occured',
                error:err
                })
            }else{
                return res.status(200).json({
                    message: 'deleted message',
                    obj: result
                });
            }
        })
    })
});
module.exports = router;