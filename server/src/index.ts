// all Import
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import bodyParser from "body-parser";
import { config } from "dotenv";
// Configurations
const app = express();
config({ path: "./.env" });
const port = process.env.PORT || 3000;
app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Import ROUTES
import dashboardRoutes from "./routers/dashboard";
import productRoutes from "./routers/product";
import usersRoutes from "./routers/users";
import expensesRouter from "./routers/expense";

// Direncting to Routers

app.use("/dashboard", dashboardRoutes);
app.use("/product", productRoutes);
app.use("/users", usersRoutes);
app.use("/expenses", expensesRouter);

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
