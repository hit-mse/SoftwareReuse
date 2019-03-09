var mongoose = require('mongoose'),
User = mongoose.model('user');

exports.authenticate = (username, password) => {
    return new Promise((res, reject) => {
        User.findOne({username}, (err, user) => {
            if (!user) {
                res(false);
                return;
            } 
            res(user.password === password)
        })
    })
}