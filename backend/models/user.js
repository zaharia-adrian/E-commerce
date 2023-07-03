import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, defualt: false },
    cart:[
        {
          productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
          },
          quantity: { type: Number, required: true },
          name: { type: String, required: true },
          price: { type: Number, required: true },
          image: { type: String, required: true },
        },
      ]
    },
  {
    timestamps: true,
  }
);
const User = mongoose.model("User", userSchema);

export default User;
