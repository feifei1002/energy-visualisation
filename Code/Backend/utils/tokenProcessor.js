// The key for the jwt token to prevent unauthorized access
const {expressjwt} = require("express-jwt");
const secretKey = process.env.ACCESS_TOKEN;

// Middleware to check JWT token of user for accessing protected routes
export const checkToken = expressjwt({
    secret: secretKey,
    algorithms: ['HS256'],
    getToken: function (req) {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            return req.headers.authorization.split(' ')[1];
        } else if (req.query && req.query.token) {
            return req.query.token;
        }
        return null;
    },
});