var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');

var userSchema = new Schema({
  first       :   {type: String, required: 'FirstNameInvalid'},
  last        :   String,
  username       :   {type: String, unique: true, lowercase: true, required: 'EmailInvalid'},
  password    :   {type: String,  required: 'PasswordInvalid'}
});


userSchema.pre('save', function(next) {
  var person = this;
//   if (!person.isModified('password')) {
//     return next();
//   }
  // Generate hashcode of passwordd
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(person.password, salt, function(err, hash) {
      person.password = hash;
      next();
    });
  });
});

userSchema.methods.changedName = function() {
    return this.username + 'TROLOLO';
};

userSchema.methods.comparePassword = function(password, done) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
    done(err, isMatch);
  });
};

module.exports = mongoose.model('User', userSchema);