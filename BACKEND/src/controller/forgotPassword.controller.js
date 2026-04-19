import crypto from "crypto";
import User from "../models/user.model.js";
import { sendEmail } from "../services/email.service.js";

export const forgotPassword = async (req, res) => {
    try {
        const {email} = req.body;
        
        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }
        
        const user = await User.findOne({email});
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        
        const resetToken = crypto.randomBytes(32).toString("hex");

        const hashedToken = crypto
            .createHash("sha256")
            .update(resetToken)
            .digest("hex");

        user.resetPasswordToken = hashedToken;    
        user.resetPasswordExpire = Date.now() + 15 * 60 * 1000; //15 min

        await user.save();
        
        const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/reset-password/${resetToken}`;

        try {
            await sendEmail(email, resetUrl);
            res.status(200).json({ message: "Reset link sent to email" });
        } catch (error) {
            console.error("Error in forgot password email:", error);
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
            await user.save();
            return res.status(500).json({ message: `Error sending email: ${error.message}` });
        }
    } catch (error) {
        console.error("Forgot password error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};