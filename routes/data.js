const express = require("express");
const router = express.Router();
const queryHasura = require("../src/utils/hasuraClient.js");

router.post("/", async (req, res) => {
    const { metricId, value } = req.body;

    if (!metricId || value === undefined) {
        return res.status(400).json({ error: "Missing metricId or value" });
    }

    const mutation = `
            mutation InsertNodeData($metricId: bigint!, $value: numeric!) {
        insert_NodeData_one(object: {
            metricId: $metricId,
            value: $value
        }) {
            id
            metricId
            value
            timeStamp
        }
        }
    `;

    try {
        const result = await queryHasura(mutation, {
            metricId,
            value,
        });
        console.log(`[Hasura] Inserted ${metricId}:${value}`);
        res.json({ success: true, inserted: result.insert_NodeData_one });
    } catch (err) {
        console.error("[Hasura Error]", err.message);
        res.status(500).json({ error: "Failed to insert data" });
    }
});

module.exports = router;
