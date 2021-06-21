const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { String, ObjectId } = mongoose.Schema.Types;

const userSchema = new mongoose.Schema({

    username: { type: String, unique: true, required: true },

    password: { type: String, require: true },

    posts: [{ type: ObjectId, ref: "Origami" }]

});

userSchema.methods = {

    matchPassword: function (password) {
        return bcrypt.compare(password, this.password);
    }

};

userSchema.pre('save', function (next) {
    if (this.isModified('password')) {
        bcrypt.genSalt(saltRounds, (err, salt) => {
            bcrypt.hash(this.password, salt, (err, hash) => {
                if (err) {
                     next(err); 
                     return 
                }
                this.password = hash;
                next();
            });
        });
        return;
    }
    next();
});

const User = mongoose.model('User', userSchema, 'users');

module.exports = User;