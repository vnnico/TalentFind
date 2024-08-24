const jwt = require("jsonwebtoken");
const Recruiter = require("../models/recruiter");
const Talent = require("../models/talent");

const checkRole = (roles) => {
  return async (req, res, next) => {
    try {
      const id = req.user;

      let user = null;

      if (roles.includes("Recruiter")) {
        user = await Recruiter.findById(id);
      } else if (roles.includes("Talent")) {
        user = await Talent.findById(id);
      }

      if (!user || !roles.includes(user.role)) {
        return res.status(403).json({ error: "Access is forbidden" });
      }

      req.user = user;
      next();
    } catch (error) {
      return res.status(401).json({ error: "Request is not authorized" });
    }
  };
};
module.exports = checkRole;
