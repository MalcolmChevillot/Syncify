import express from "express";
import { config } from "./config/env";
import authRouter from "./routes/authRoutes";
import userRouter from "./routes/userRoutes";
import friendRouter from "./routes/friendRoutes";
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/friend", friendRouter);

app.listen(3000, () => {
  console.log(`Server running on http://localhost:${config.port}`);
});
