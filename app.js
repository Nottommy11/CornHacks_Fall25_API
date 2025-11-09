const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const nodesRouter = require("./routes/nodes.js");
const dataRouter = require("./routes/data.js");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/nodes", nodesRouter);
app.use("/api/data", dataRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`API running on port ${PORT}`));
