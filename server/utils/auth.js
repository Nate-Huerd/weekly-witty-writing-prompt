const jwt = require('jsonwebtoken');

const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
  authMiddleware: function ({ req }) {
    // allows token to be sent via req.body, req.query, or headers
    let token = req.body.token || req.query.token || req.headers.authorization;

    // ["Bearer", "<tokenvalue>"]
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    // if no token, return the request
    if (!token) {
      return req;
    }

    // verifying if the token is expired/still valid
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log('Invalid token');
    }

    return req;
  },
  signToken: function ({ firstName, email, _id }) {
    const payload = { firstName, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};