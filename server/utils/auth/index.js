const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;
const expiration = '12h';

module.exports = {
  authMiddleware: function ({ req }) { 
    let token = req.body.token || req.query.token || req.headers.authorization;

    if (req.headers.authorization) { //allows token to be sent via req.body, req.query, or headers
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      return req;
    }

    try { //decode and attach user data to request object
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log('Invalid token');
    }

    return req;
  },
  signToken: function ({ email, username, _id }) { //function for authenticated routes
    const payload = { email, username, _id }; //token is created with user data
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration }); //token is signed with secret and expiration time
  },
};
