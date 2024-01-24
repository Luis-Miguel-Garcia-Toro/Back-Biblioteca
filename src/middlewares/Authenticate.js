const jwt = require('express-jwt');

const authenticate = jwt.expressjwt({
    secret: 'your_secret_key',
    algorithms: ['HS256'],
    getToken: function fromHeaderOrQuerystring(req) {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            return req.headers.authorization.split(' ')[1];
        }
        return null;
    }
});
module.exports = {
    authenticate
}