const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({ host: process.env.EMAIL_HOST, port: process.env.EMAIL_PORT, auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS } });

exports.sendVerificationEmail = async (user) => {
  const verifyLink = `${process.env.CLIENT_URL}/verify?email=${encodeURIComponent(user.email)}`;
  await transporter.sendMail({ from: process.env.EMAIL_USER, to: user.email, subject: 'Verify your account', text: `Click to verify: ${verifyLink}` });
};

exports.sendOrderEmail = async (userEmail, order) => {
  await transporter.sendMail({ from: process.env.EMAIL_USER, to: userEmail, subject: `Order ${order._id} confirmed`, text: `Your order of total ${order.totalPrice} received.` });
};
