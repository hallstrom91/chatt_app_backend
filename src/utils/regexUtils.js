// basic email format validator
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// required password format validator - allowed special chars = !&#$%^&*
// minimum 6 characters, contain min one number and one special character.
const validatePassword = (password) => {
  const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;
  return passwordRegex.test(password);
};

module.exports = { validateEmail, validatePassword };
