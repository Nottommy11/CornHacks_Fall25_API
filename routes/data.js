const express = require("express");
const router = express.Router();
const queryHasura = require("../src/utils/hasuraClient.js");

nodeId = "fc0291ae-d169-420c-9f2d-f0ec884db57b";

router.post("/", async (req, res) => {
    const { metricType, value } = req.body;

    if (!metricType || value === undefined) {
        return res.status(400).json({ error: "Missing metricId or value" });
    }

    let metricId;
    switch (metricType) {
        case "water_temp":
            metricId = 3;
            break;
        case "air_temp":
            metricId = 7;
            break;
        case "humidity":
            metricId = 6;
            break;
        case "pressure":
            metricId = 8;
            break;
        case "tds":
            metricId = 9;
            break;
        case "water_level":
            metricId = 10;
            break;
        default:
            console.warn(`[API] Unknown metric: ${metricType}`);
            return res
                .status(400)
                .json({ error: `Unknown metric type: ${metricType}` });
    }

    const mutation = `
            mutation InsertNodeData($metricId: bigint!, $value: numeric!, $nodeId: uuid!, $metricType: text!) {
        insert_NodeData_one(object: {
            metricId: $metricId,
            value: $value,
            nodeId: $nodeId,
            metricType: $metricType,
        }) {
            id
            metricId
            value
            timeStamp
            metricType
        }
        }
    `;

    try {
        const result = await queryHasura(mutation, {
            metricId,
            value,
            metricType,
        });
        console.log(`[Hasura] Inserted ${metricType}:${value}`);
        res.json({ success: true, inserted: result.insert_NodeData_one });
    } catch (err) {
        console.error("[Hasura Error]", err.message);
        res.status(500).json({ error: "Failed to insert data" });
    }
});

module.exports = router;
