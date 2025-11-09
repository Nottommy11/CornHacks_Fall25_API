const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const nodesRouter = require("./routes/nodes.js");
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/nodes", nodesRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`API running on port ${PORT}`));
