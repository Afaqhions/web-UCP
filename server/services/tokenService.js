// services/tokenService.js
const jwt = require('jsonwebtoken');

const tokenService = {
  generateAccessToken(userId) {
    return jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
  },

  generateRefreshToken(userId) {
    return jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET, {
      expiresIn: '7d',
    });
  },

  generateTokenPair(userId) {
    return {
      accessToken: this.generateAccessToken(userId),
      refreshToken: this.generateRefreshToken(userId),
    };
  },

  verifyAccessToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      throw new Error('Invalid access token: ' + error.message);
    }
  },

  verifyRefreshToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    } catch (error) {
      throw new Error('Invalid refresh token: ' + error.message);
    }
  },

  generateEmailVerificationToken() {
    return require('crypto').randomBytes(32).toString('hex');
  },

  generatePasswordResetToken() {
    return require('crypto').randomBytes(32).toString('hex');
  },
};

module.exports = tokenService;
