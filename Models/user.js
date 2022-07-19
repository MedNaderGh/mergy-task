const mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;
let User = new Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    unique: true,
    match: [/^[A-Za-z]+$/,'bad format parameter in name'],
    required: 'name is required'
  },
 email: {
    type: String,
    unique:true,
    required: 'Email address is required',
    match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'bad format parameter in email']
  },
  job: {
    type: String,
    match: [/^[A-Za-z]+$/,'bad format parameter in job'],
    required: 'job is required'
  },
  cv: {
    type: String,
    match: [/^(https?:\/\/)?www\.([\da-z\.-]+)\.([a-z\.]{2,6})\/[\w \.-]+?\.(pdf|docx)$/gm,'bad format parameter in cv url'],
    required: 'cv url is required'
  },
  user_image: {
    type: String,
    match: [/^(https?:\/\/)?www\.([\da-z\.-]+)\.([a-z\.]{2,6})\/[\w \.-]+?\.(png|jpeg)$/gm,'bad format parameter in image url'],
    required: 'image url is required'
  },
  experience: [{
    job_title: {type: String, match: [/^[A-Za-z]+$/,'bad format parameter in job title']},
    location: {type: String},
    start_date: {type: String, match: [/^[0-9]{2}[\/]{1}[0-9]{2}[\/]{1}[0-9]{4}$/g,'bad format for start date']},
    end_date: {type: String, match: [/^[0-9]{2}[\/]{1}[0-9]{2}[\/]{1}[0-9]{4}$/g,'bad format for end date']},
}]
},{
    collection: 'user'
});
/*User.statics.hashPassword = function hashPassword(password){
  return bcrypt.hashSync(password,10);
}*/
User.pre('save', function (next) {
  bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(this.password, salt, (err, hash) => {
          this.password = hash;
          this.saltSecret = salt;
          next();
      });
  });
})
User.methods.verifyPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};
User.methods.generateJwt = function () {
  return jwt.sign({ _id: this._id},
      process.env.JWT_SECRET,
  {
      expiresIn: process.env.JWT_EXP
  });
}
module.exports = mongoose.model('User', User);