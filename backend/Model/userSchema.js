const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true,
        minlength: 8
    },
    confiremPassword: {
        type: String,
        require: true,
        minlength: 8
    },
    blog: [{ type: mongoose.Types.ObjectId, ref: "Blog", require: true }]
})

// userSchema.pre('save', function (next) {
//     if (this.password) {
//         var salt = bcrypt.genSaltSync(10)
//         this.password = bcrypt.hashSync(this.password, salt) // this.password
//     }
//     next()
// })


module.exports = mongoose.model('User', userSchema)