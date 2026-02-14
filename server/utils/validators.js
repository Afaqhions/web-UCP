// utils/validators.js
const validators = {
  isValidEmail: (email) => {
    const emailRegex = /^\S+@\S+\.\S+$/;
    return emailRegex.test(email);
  },

  isValidPassword: (password) => {
    // Minimum 8 characters, at least one uppercase, one lowercase, one number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  },

  isValidURL: (url) => {
    try {
      new URL(url);
      return true;
    } catch (err) {
      return false;
    }
  },

  isValidMongoId: (id) => {
    return /^[0-9a-fA-F]{24}$/.test(id);
  },

  isValidName: (name) => {
    return name.trim().length >= 2 && name.trim().length <= 50;
  },

  sanitizeString: (str) => {
    if (typeof str !== 'string') return '';
    return str.trim().replace(/[<>]/g, '');
  },
};

module.exports = validators;
