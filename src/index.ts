import express from "express";
import referralRoutes from "./routes/referralRoutes";
import { errorHandler } from "./middlewares/errorHandler";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", referralRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
