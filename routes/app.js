var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    // User.findOne({},function(err,doc){
    //     if(err){
    //         return res.send('Error!');
    //     }
    //     res.render('node',{email:doc.email});
    // })
   res.render('index');
   });

module.exports = router;
