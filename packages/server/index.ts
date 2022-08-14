import express from "express";
import partsRouter from "./routes/partsRouter";
import cors from "cors";

const app = express();
const port = 3001; // default port to listen

app.use(cors());
app.use(express.json());

app.use("/api/parts", partsRouter);

app.get("/", (_req, res) => {
  res.send("Hello world!");
});

// start the Express server
app.listen(port, () => {
  console.log(`server started on ${port}`);
});
