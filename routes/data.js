const express = require("express");
const router = express.Router();
const queryHasura = require("../src/utils/hasuraClient.js");

router.post("/", async (req, res) => {
    const { metricType, value } = req.body;

    if (!metricType || value === undefined) {
        return res.status(400).json({ error: "Missing metricType or value" });
    }

    const mutation = `
            mutation InsertNodeData($metricId: String!, $value: Float!) {
        insert_NodeData_one(object: {
            metricId: $metricType,
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
            metricType,
            value,
        });
        console.log(`[Hasura] Inserted ${2}:${value}`);
        res.json({ success: true, inserted: result.insert_node_data_one });
    } catch (err) {
        console.error("[Hasura Error]", err.message);
        res.status(500).json({ error: "Failed to insert data" });
    }
});

module.exports = router;
