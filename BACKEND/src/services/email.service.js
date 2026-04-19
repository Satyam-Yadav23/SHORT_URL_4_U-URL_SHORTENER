import nodemailer from "nodemailer";

export const sendEmail = async (to, url) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // Verify connection configuration
        await transporter.verify();

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to,
            subject: "Password Reset Request",
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #e74c3c;">Password Reset Request</h2>
                    <p>You have requested to reset your password. Click the button below to proceed:</p>
                    <p>
                        <a href="${url}" style="background-color: #e74c3c; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">
                            Reset Password
                        </a>
                    </p>
                    <p style="color: #666; font-size: 14px;">Or copy and paste this link in your browser:</p>
                    <p style="word-break: break-all; color: #0066cc;">${url}</p>
                    <p style="color: #999; font-size: 12px;">This link will expire in 15 minutes.</p>
                    <p style="color: #999; font-size: 12px;">If you didn't request a password reset, please ignore this email.</p>
                </div>
            `,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent successfully:", info.response);
        return info;
    } catch (error) {
        console.error("Email sending error:", error.message);
        throw new Error(`Failed to send email: ${error.message}`);
    }
};