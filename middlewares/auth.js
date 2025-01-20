const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.redirect('/user/login');
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user= decoded;
    return next();
  } catch (err) {
    return res.redirect('/user/login');
  }
};

module.exports = auth;
