const nodemailer = require("nodemailer");

module.exports = async (email, subject, text) => {
	try {
		const transporter = nodemailer.createTransport({
			host: 'smtp.gmail.com',
			service: 'gmail',
			port: 587,
			secure: false,
			auth: {
				user: process.env.USER,
				pass: process.env.PASS,
			},
			tls: {
				rejectUnauthorized: false
			  }
		});

		await transporter.sendMail({
			from: process.env.USER,
			to: email,
			subject: subject,
			text: text,
		});
		console.log("email sent successfully");
	} catch (error) {
		console.log("email not sent!");
		console.log(error);
		return error;
	}
};