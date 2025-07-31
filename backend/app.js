import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import connectDB from "./db/database.js";
import userRouter from "./routes/user.js"

const app = express();

dotenv.config();

connectDB();

app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))

app.use("/api/user", userRouter)
// api: /api/user/register or /api/user/login

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
