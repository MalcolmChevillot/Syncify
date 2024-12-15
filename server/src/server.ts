import express from "express";
import { config } from "./config/env";
import authRouter from "./routes/authRoutes";
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", authRouter);

app.listen(3000, () => {
  console.log(`Server running on http://localhost:${config.port}`);
});
