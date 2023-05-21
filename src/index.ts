import express from "express";
import itemsRouter from "./routes/items";
import cors from "cors";

const app = express();

const PORT = 3001;
app.use(cors());
app.use(express.json());

app.use("/api/items", itemsRouter);

app.listen(PORT, () => {
  return console.log(`Server is listening on ${PORT}`);
});
