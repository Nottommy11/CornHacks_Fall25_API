const express = require("express");
const queryHasura = require("../src/utils/hasuraClient.js");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const query = `
            query MyQuery5 {
            NodeData(where: {nodeId: {_eq: "fc0291ae-d169-420c-9f2d-f0ec884db57b"}}) {
                id
                metricId
                nodeId
                timeStamp
                value
                metricType
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
