const mongoose = require('mongoose');
const UserSchema = mongoose.Schema({
    name: String,
    age: Number,
    sale: Boolean
});

UserSchema.statics.user = function (age) {
    return this.find({'age': 27})
    .exec();
}

// 第三参数指定mongodb中collection的名字，如果不传则默认为变为复数（即Users）
const User = mongoose.model('User', UserSchema, 'user');
module.exports = User;