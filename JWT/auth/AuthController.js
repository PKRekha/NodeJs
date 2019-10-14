const express = require('express');
const router = express.Router();
const LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');
const session = require('express-session');
const User = require('../user/User');

router.use(bodyParser.urlencoded({extended:true}))
router.use(bodyParser.json());

router.post('/register', (req,res) => {
    const hashedPassword = bcrypt.hashSync(req.body.password,8)
    User.create({
        name:req.body.name,
        email:req.body.email,
        password:hashedPassword
    },(err,user) => {
        if(err){return res.status(500).send('There was a probelm in registering user')}
        //res.send('registeration successful')
        const stri = encodeURIComponent('Successfully register Please login Now')
        res.redirect('/signin?msg='+stri)
    })
})

router.post('/login',(req,res) => {
    User.findOne({email:req.body.email},(err,user) => {
        if(err) return res.status(500).send('Error on server');
        if(!user) { res.send('Not Registered User')}
        else{
            const passwordIsValid= bcrypt.compareSync(req.body.password,user.password)
            if(!passwordIsValid) return res.status(401).send({auth:false,token:null})
            var token = jwt.sign({id:user._id}, config.secert,{
                expiresIn:86400
            })
            localStorage.setItem('authtoken',token)
            res.redirect('/user/profile')
            //res.status(200).send({auth:true,token:token})
        }
    })
})

router.get('/loginuser', (req,res) => {
    var token = req.headers['x-access-token'];
    if(!token) res.status(401).send({auth:false, message:'No Token Provided'})
    jwt.verify(token, config.secert,(err,decode) => {
        if(err) return res.status(401).send({auth:false,message:'Fail to validate'})
        User.findById(decode.id, {password:0}, (err,user) => {
            if(err) res.send('Problem in finding user')
            if(!user) res.status(404).send('No User found')
            res.send(user)
        })
    })
})

module.exports = router;
