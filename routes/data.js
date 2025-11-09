const express = require("express");
const router = express.Router();
const queryHasura = require("../src/utils/hasuraClient.js");

router.post("/", async (req, res) => {
    const { metric, value } = req.body;

    if (!metric || value === undefined) {
        return res.status(400).json({ error: "Missing metricId or value" });
    }

    let metricId;
    switch (metric) {
        case "water_temp":
            metricId = 1;
            break;
        case "air_temp":
            metricId = 3;
            break;
        case "humidity":
            metricId = 2;
            break;
        case "pressure":
            metricId = 4;
            break;
        case "tds":
            metricId = 5;
            break;
        case "water_level":
            metricId = 6;
            break;
        default:
            console.warn(`[API] Unknown metric: ${metric}`);
            return res
                .status(400)
                .json({ error: `Unknown metric type: ${metric}` });
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
