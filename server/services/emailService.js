// services/emailService.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const emailService = {
  async sendWelcomeEmail(email, name) {
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Welcome to Taakra - Your Competition Platform',
        html: `
          <h1>Welcome to Taakra, ${name}! 🎉</h1>
          <p>Thank you for joining our platform. You can now:</p>
          <ul>
            <li>Browse and register for competitions</li>
            <li>Chat with admins for support</li>
            <li>Get personalized recommendations</li>
            <li>Track your achievements</li>
          </ul>
          <p>Best of luck with your competitions!</p>
        `,
      });
      console.log(`✅ Welcome email sent to ${email}`);
    } catch (error) {
      console.error('❌ Failed to send welcome email:', error);
      throw error;
    }
  },

  async sendPasswordResetEmail(email, resetToken, resetLink) {
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Taakra - Password Reset Link',
        html: `
          <h1>Reset Your Password</h1>
          <p>You requested a password reset. Click the link below to reset your password:</p>
          <a href="${resetLink}" target="_blank">Reset Password</a>
          <p>This link is valid for 10 minutes.</p>
          <p>If you didn't request this, please ignore this email.</p>
        `,
      });
      console.log(`✅ Password reset email sent to ${email}`);
    } catch (error) {
      console.error('❌ Failed to send password reset email:', error);
      throw error;
    }
  },

  async sendCompetitionReminder(email, competitionTitle, startDate) {
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: `Reminder: ${competitionTitle} starts soon!`,
        html: `
          <h1>Competition Reminder 📢</h1>
          <p>This is a reminder that <strong>${competitionTitle}</strong> starts on:</p>
          <p><strong>${new Date(startDate).toLocaleString()}</strong></p>
          <p>Login to your account to view details and join now!</p>
        `,
      });
      console.log(`✅ Reminder email sent to ${email}`);
    } catch (error) {
      console.error('❌ Failed to send reminder email:', error);
      throw error;
    }
  },

  async sendRegistrationConfirmation(email, competitionTitle) {
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: `Registration Confirmed - ${competitionTitle}`,
        html: `
          <h1>Registration Confirmed! ✅</h1>
          <p>You have successfully registered for <strong>${competitionTitle}</strong></p>
          <p>Check your dashboard for more details and important updates.</p>
          <p>Good luck! 🚀</p>
        `,
      });
      console.log(`✅ Registration confirmation email sent to ${email}`);
    } catch (error) {
      console.error('❌ Failed to send confirmation email:', error);
      throw error;
    }
  },

  async sendContactReply(email, message) {
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Taakra Support Response',
        html: `
          <h1>Your Support Ticket</h1>
          <p>Thank you for contacting us. Here's our response:</p>
          <p>${message}</p>
          <p>If you have further questions, feel free to reply to this email.</p>
        `,
      });
      console.log(`✅ Support email sent to ${email}`);
    } catch (error) {
      console.error('❌ Failed to send support email:', error);
      throw error;
    }
  },
};

module.exports = emailService;
