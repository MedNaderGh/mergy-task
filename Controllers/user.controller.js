const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');
var config = require('../config/config');
const Admin = mongoose.model('Admin');
const User = mongoose.model('User');
module.exports.register = (req, res, next) => {
    var admin = new Admin();
    admin.email = req.body.email;
    admin.password = req.body.password;
    admin.save((err, doc) => {
        if (!err)
            res.send(doc);
        else {
            if (err.code == 11000)
                res.status(422).send(['email']);
            else
                return next(err);
        }

    });
}
module.exports.create = (req, res, next) => {
    var user = new User();
    user.id = req.body.id
    user.name = req.body.name
    user.email = req.body.email
    user.job = req.body.job
    user.cv = req.body.cv
    user.user_image = req.body.user_image
    user.experience = req.body.experience
    user.save((err, doc) => {
        if (!err)
            res.send(doc);
        else {
            if (err.code == 11000)
                res.status(400);
            else
                return next(err);
        }

    });
}
module.exports.delete = (req, res, next) => {
    
    User.findOneAndDelete({id: req.params.id}, function(err, user){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
}
module.exports.get = (req, res, next) => {
    User.findOne({id: req.params.id}, function(err, user){
        if(err) res.json(err);
        else res.json(user);
    });
}
module.exports.getall = (req, res, next) => {
    User.find(function(err, user){
        if(err) res.json(err);
        else res.json(user);
    });
}
module.exports.update = (req, res, next) => {
User.findOneAndUpdate({id:req.params.id},req.body);
}
module.exports.authenticate = (req, res, next) => {
    passport.authenticate('local', (err, admin, info) => {       
        if (err) return res.status(400).json(err);
        else if (admin) return res.status(200).json({ "bearer token": admin.generateJwt()});
        else return res.status(404).json(info);
    })(req, res);
}
