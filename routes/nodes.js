const express = require("express");
const  queryHasura  = require("../src/utils/hasuraClient.js");

const router = express.Router();

// Get all nodes
router.get("/", async (req, res) => {
    try {
        const query = `
            query {
                Nodes {
                id
                name
                location
                is_online
                last_ping
                }
            }
            `;
        const result = await queryHasura(query);
        res.json(result.Nodes);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch nodes" });
    }
});

module.exports = router;
