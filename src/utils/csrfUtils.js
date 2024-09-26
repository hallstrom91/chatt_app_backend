const crypto = require("crypto");

/*
=====================================
GENERATE CSRF TOKEN FUNCTION
=====================================
*/
const generateCSRFToken = (req, res) => {
  const csrfToken = crypto.randomBytes(32).toString("hex");
  res.app.locals.csrfToken = csrfToken;
  return res.json({ csrfToken });
};

/*
=====================================
VALIDATE CSRF TOKEN FUNCTION
=====================================
*/
const validateCSRFToken = (req, res, next) => {
  // change 2 correct
  const csrfToken = req.body.csrfToken || req.headers["x-csrf-token"];

  if (csrfToken && csrfToken === req.app.locals.csrfToken) {
    /* delete req.app.locals.csrfToken; */ // use to make csrfToken one-time request value
    return next();
  }

  return res.status(403).json({ message: "Invalid or missing CSRF token" });
};

module.exports = { generateCSRFToken, validateCSRFToken };
