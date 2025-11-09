const express = require("express");
const router = express.Router();
const queryHasura = require("../src/utils/hasuraClient.js");

router.post("/", async (req, res) => {
    const { ledOn } = req.body;

    const mutation = `
            mutation MyMutation2($ledOn: boolean!) {
                update_Nodes_by_pk(pk_columns: {id: "fc0291ae-d169-420c-9f2d-f0ec884db57b"}, _set: {ledOn: $ledOn}) {
                ledOn
            }
        }
    `;

    try {
        const result = await queryHasura(mutation, {
            ledOn,
        });
        console.log(`[Hasura] Inserted LED Status:${ledOn}`);
        res.json({ success: true, inserted: result.update_Node_by_pk });
    } catch (err) {
        console.error("[Hasura Error]", err.message);
        res.status(500).json({ error: "Failed to insert data" });
    }
});

module.exports = router;
