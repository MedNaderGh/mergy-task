const mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;
let Admin = new Schema({
  email: {
    type: String,
    unique:true,
    required: 'Email address is required',
    match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'bad format parameter in email']
  },
 password: {
    type: String,
    require: 'password is required'
  },
},{
    collection: 'admin'
});
Admin.pre('save', function (next) {
  bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(this.password, salt, (err, hash) => {
          this.password = hash;
          this.saltSecret = salt;
          next();
      });
  });
})
Admin.methods.verifyPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};
Admin.methods.generateJwt = function () {
  return jwt.sign({ _id: this._id},
      process.env.JWT_SECRET,
  {
      expiresIn: process.env.JWT_EXP
  });
}
module.exports = mongoose.model('Admin', Admin);