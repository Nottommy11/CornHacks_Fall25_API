import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import nodesRouter from "./routes/nodes.js";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/nodes", nodesRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API running on port ${PORT}`));

// const express = require("express");
// const app = express()
// const port = 3000

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })
