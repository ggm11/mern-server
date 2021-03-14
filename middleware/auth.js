const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ msg: 'Permission denied, no token' });
  }

  try {
    const cypher = jwt.verify(token, process.env.SECRET);
    req.user = cypher.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: 'Invalid token' });
  }
};
