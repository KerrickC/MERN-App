const mongoose = require('mongoose')
const bcrypt = require('bcryptjs') //hash user info

const saltRounds = 10 //time needed to single BCrypt hash

const UserSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true}
})

UserSchema.pre('save', function(next){
    //check if doc is new or new password set
    if(this.isNew || this.isModified('password')) {
        const document = this;
        bcrypt.hash(document.password, saltRounds, function(err, hashedPassword){
            if(err){
                next(err)
            }else{
                document.password = hashedPassword
                next()
            }
        })
    }else{
        next()
    }
})

UserSchema.methods.isCorrectPassword = function(password, callback) {
    bcrypt.compare(password, this.password, (err, same) => {
        if(err){
            callback(err)
        }else{
            callback(err, same)
        }
    })
}

module.exports = mongoose.model('User', UserSchema)