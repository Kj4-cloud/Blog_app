const { validateToken } = require("../services/authentication");

const checkForAuthenticationCookie = (cookieName) => {
  return (req, res, next) => {
    const tokencookieValue = req.cookies[cookieName];
    if (!tokencookieValue) {
      return next();
    }

    try {
      const userPayload = validateToken(tokencookieValue);
      req.user = userPayload;
    } catch (error) {}

    next();
  };
};

module.exports = { checkForAuthenticationCookie };