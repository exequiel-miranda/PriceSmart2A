import express from "express"
import productRoutes from "./src/routes/products.js"
import faqsRoutes from "./src/routes/faqs.js"
import branchesRoutes from "./src/routes/branches.js";

const app = express();

//Que acepte JSON desde postman
app.use(express.json())

app.use("/api/products", productRoutes)
app.use("/api/faqs", faqsRoutes)
app.use("/api/branches", branchesRoutes)


export default app;

