const express = require("express");
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post("/chat", async (req, res) => {
    const { prompt } = req.body;

    if (!prompt) {
        return res
            .status(400)
            .json({ error: "Missing 'prompt' in request body" });
    }

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        const result = await model.generateContent(prompt);
        const reply = result.response.text();

        res.json({ reply });
    } catch (error) {
        console.error("[Gemini Error]", error);
        res.status(500).json({ error: "Gemini API request failed" });
    }
});

module.exports = router;
