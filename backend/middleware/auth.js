const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.replace('Bearer ', '').trim();
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded || !decoded.userId) {
      return res.status(401).json({ message: 'Invalid token payload' });
    }

    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error('JWT auth middleware error:', error);
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};
