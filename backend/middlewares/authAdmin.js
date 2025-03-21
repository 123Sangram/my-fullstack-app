

const jwt = require('jsonwebtoken');

const authAdmin = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ msg: "Please login first" });
    }

    const token_decode = await jwt.verify(token, process.env.JWT_SECRET);
    if (token_decode.email !== process.env.ADMIN_EMAIL) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    next();
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
};

module.exports = authAdmin;