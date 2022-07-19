const express = require('express');
let userRoutes = express.Router();
const passport = require('passport');
const ctrlUser = require('../controllers/user.controller');
require('../Config/passportConfig')(passport)
userRoutes.post('/register', ctrlUser.register);
userRoutes.post('/authenticate', ctrlUser.authenticate);
userRoutes.post('/create', passport.authenticate('jwt', { session: false }),ctrlUser.create);
userRoutes.delete('/delete/:id', ctrlUser.delete,passport.authenticate('jwt', { session: false }));
userRoutes.patch('/update/:id', ctrlUser.update,passport.authenticate('jwt', { session: false }));
userRoutes.get('/get/:id', ctrlUser.get,passport.authenticate('jwt', { session: false }));
userRoutes.get('/getall',ctrlUser.getall,passport.authenticate('jwt', { session: false }));
module.exports = userRoutes;