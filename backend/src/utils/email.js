const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendVerificationEmail = async (email, token) => {
  const verificationLink = `${process.env.CORS_ORIGIN}/verify-email?token=${token}`;

  await transporter.sendMail({
    from: `"Rohtak Guided Learning Tracker" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Verify Your Email Address',
    html: `<p>Please click this link to verify your email address: <a href="${verificationLink}">${verificationLink}</a></p>`,
  });
};

const sendPasswordResetEmail = async (email, token) => {
  const resetLink = `${process.env.CORS_ORIGIN}/reset-password?token=${token}`;

  await transporter.sendMail({
    from: `"Rohtak Guided Learning Tracker" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Password Reset Request',
    html: `<p>You requested a password reset. Click this link to reset your password: <a href="${resetLink}">${resetLink}</a></p>`,
  });
};


const sendNewUserEmail = async (email, password, role, organizationName) => {
  const loginLink = `${process.env.CORS_ORIGIN}/login`;

  let introLine = `You have been added as a ${role}.`;
  if (organizationName) {
    introLine = `You have been added as an ${role} for ${organizationName}.`;
  }

  await transporter.sendMail({
    from: `"Rohtak Guided Learning Tracker" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Your New Account',
    html: `<p>Welcome!</p>
           <p>${introLine}</p>
           <p>Your password is: <strong>${password}</strong></p>
           <p>We strongly recommend you change your password upon your first login.</p>
           <p>You can log in here: <a href="${loginLink}">${loginLink}</a></p>`,
  });
};

module.exports = {
  sendVerificationEmail,
  sendPasswordResetEmail,
  sendNewUserEmail,
};