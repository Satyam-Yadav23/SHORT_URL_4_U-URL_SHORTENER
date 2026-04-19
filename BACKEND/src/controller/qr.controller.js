import { generateQRCode } from "../utils/qrGenerator.js";

export const generateQR = async (req, res) => {
    try {
        const {url} = req.body;
        if (!url) {
            return res.status(400).json({ message: "URL is required" });
        }
        try {
            new URL(url);
        } catch {
            return res.status(400).json({ message: "Invalid URL" });
        }
        const qr = await generateQRCode(url);

        res.status(200).json({
            success: true,
            qr,
        });
    } catch (err) {
        res.status(500).json({ message: "QR generation failed" });
    }
};