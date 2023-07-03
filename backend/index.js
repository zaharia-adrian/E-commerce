import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import multer from "multer";  

import userRoutes from "./routes/user.js";
import productRoutes from "./routes/product.js";
import cartRoutes from "./routes/cart.js";

const app = express();

app.use(cors());
app.use(bodyParser.json());





// const upload = multer({ dest: 'uploads/' });
// app.post("/upload", upload.single("file"), (req, res) => {
//   console.log(req.file);
//   res.status(201).json({ message: "Successful" });
// })

app.use("/api", userRoutes);
app.use("/api", productRoutes);
app.use("/api/cart", cartRoutes);

mongoose.set("strictQuery", false);

mongoose
  .connect(
    "mongodb+srv://e-commerce:e-commerce@e-commerce.jqrirqs.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(5000);
    console.log("it works");
  })
  .catch((error) => console.log(error.message));
