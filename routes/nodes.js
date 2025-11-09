import express from "express";
import { queryHasura } from "../utils/hasuraClient.js";

const router = express.Router();

// Get all nodes
router.get("/", async (req, res) => {
    try {
        const query = `
            query {
                nodes {
                id
                name
                is_online
                last_ping
                }
            }
            `;
        const result = await queryHasura(query);
        res.json(result.nodes);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch nodes" });
    }
});

export default router;
