const User = require('../models/user.model');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};

// Code for the POST request to create a user
exports.user_create = function (req, res) {
    let user = new User(
        {
            username: req.body.username,
            password: req.body.password,
            email: req.body.email
        }
    );

    user.save(function (err) {
      //console.log("test");
        if (err) {
            return next(err);
        }
        res.send(user);
        res.send('User successfully registered');
    })
};

exports.user_verify = function (req, res) {
    User.find(req.params.id, function (err, product) { // Product was declared in 1.7
        if (err) return next(err);
        res.send(product);
    })
};
