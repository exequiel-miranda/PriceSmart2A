import express from "express";
import productRoutes from "./src/routes/products.js";
import branchesRoutes from "./src/routes/branches.js";
import employeesRoutes from "./src/routes/employees.js";
import brandRoutes from "./src/routes/brand.js";
import adminRoutes from "./src/routes/admins.js";

const app = express();

//Que acepte JSON desde postman
app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/branches", branchesRoutes);
app.use("/api/employees", employeesRoutes);
app.use("/api/brands", brandRoutes);
app.use("/api/admins", adminRoutes);


export default app;
