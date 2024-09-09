const bcrypt = require("bcryptjs");

/*
=====================================
BCRYPTJS HASH PASSWORD FUNCTION
=====================================
*/
async function hashPassword(password) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (error) {
    throw new Error("Error hashing password");
  }
}
/*
=====================================
BCRYPTJS VERIFY PASSWORD FUNCTION
=====================================
*/
async function verifyPassword(password, hashedPassword) {
  try {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
  } catch (error) {
    throw new Error("Error verifying password");
  }
}

module.exports = { hashPassword, verifyPassword };
