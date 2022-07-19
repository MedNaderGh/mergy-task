const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

var User = mongoose.model('User');
var Admin = require('../models/admin');
var config = require('../config/config');
passport.use(
    new localStrategy({ usernameField: 'email' },
        (username, password, done) => {
            Admin.findOne({ email: username },
                (err, admin) => {
                    if (err)
                        return done(err);
                    // unknown user
                    else if (!admin)
                        return done(null, false, { message: 'Email is not registered' });
                    // wrong password
                    else if (!admin.verifyPassword(password))
                        return done(null, false, { message: 'Wrong password.' });
                    // authentication succeeded
                    else
                        return done(null, admin);
                });
        })
);
module.exports = function (passport) {
    var opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
    opts.secretOrKey = config.secret;
    passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
        console.log('test',jwt_payload)
        Admin.findById(jwt_payload._id, function (err, admin) {
            if (err) {
                return done(err, false);
            }
            if (admin) {
                done(null, admin);
            } else {
                done(null, false);
            }
        });
    }
    ));
};