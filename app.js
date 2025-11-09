const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const nodesRouter = require("./routes/nodeData.js");
const dataRouter = require("./routes/data.js");
const aiRouter = require("./routes/ai.js");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/nodeData", nodesRouter);
app.use("/api/data", dataRouter);
app.use("/api/ai", aiRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`API running on port ${PORT}`));
