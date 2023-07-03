import Product from "../models/product.js";
import User from "../models/user.js";
import mongoose from "mongoose";

const fileSizeFormatter = (bytes, decimal) => {
  if (bytes === 0) {
    return "0 Bytes";
  } else {
    const dm = decimal || 2;
    const sizes = ["Bytes", "KB", "MB", "TB"];
    const index = Math.floor(Math.log(bytes) / Math.log(1000));
  }
  return (
    parseFloat(bytes / Math.pow(pow, index).toFixed(dm)) + "-" + sizes[index]
  );
};

export const createProduct = async (req, res) => {
  // const image = req.file;
  // const productData = JSON.parse(req.body.product);
  // console.log(productData);

  // if (!image) {
  //   return res.status(422).json({ image:image});
  // }

  // const imageUrl = image.path;
  const productData = req.body;
  console.log(req.body);
  try {
    const product = new Product({
      name: productData.name,
      price: productData.price,
      description: productData.description,
      image: productData.image,
      userId: productData.user._id,
    });
    await product.save();
    res.status(202).json({ message: "Successful" });
  } catch (error) {
    console.log(error.message);
    res.status(201).json({ message: error.message });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.status(201).json({ products });
  } catch (error) {
    console.log(error.message);
    res.status(404).json({ message: error.message });
  }
};

export const getUserProducts = async (req, res) => {
  const { user } = req.body;
  try {
    const products = await Product.find({ userId: user._id });
    res.status(201).json({ products });
  } catch (error) {
    console.log(error.message);
    res.status(404).json({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  const { productId } = req.params;
  const { user } = req.body;
  try {
    //THIS WORKS
    Product.findOneAndDelete({ _id: productId }, (error, deletedProduct) => {
      if (error) {
        console.log(error.message);
      } else {
        console.log("Product deleted successfully");
        User.find({ "cart.productId": productId }, (error, users) => {
          if (error) {
            console.log(error.message);
          } else {
            users.forEach((user) => {
              const cartItem = user.cart.find((item) => {
                return item.productId.toString() === productId.toString();
              });

              user.cart.pull({ productId: productId });
              user.save(function (err) {
                if (err) {
                  console.log(err);
                } else {
                  console.log("User cart updated successfully");
                }
              });
            });
          }
        });
      }
    });
    res.status(202).json({ message: "Deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(404).json({ message: error.message });
  }
};

export const editProduct = async (req, res) => {
  const { productId } = req.params;
  const { user, product } = req.body;

  try {
    const newProduct = {
      name: product.name,
      image: product.image,
      description: product.description,
      price: product.price,
      userId: user._id,
    };

    const newEditedProduct = await Product.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(productId), userId: user._id },
      newProduct,
      { new: true },
      (error, editedProduct) => {
        if (error) {
          console.log(error.message);
        } else {
          console.log("Product edited successfully");
          User.find({ "cart.productId": productId }, (error, users) => {
            if (error) {
              console.log(error.message);
            } else {
              users.forEach((user) => {
                const cartItemIndex = user.cart.findIndex((item) => {
                  return item.productId.toString() === productId.toString();
                });

                user.cart[cartItemIndex] = {
                  productId: user.cart[cartItemIndex].productId,
                  quantity:user.cart[cartItemIndex].quantity,
                  name: editedProduct.name,
                  price: editedProduct.price,
                  image: editedProduct.image,
                };
                user.save(function (err) {
                  if (err) {
                    console.log(err);
                  } else {
                    console.log("User cart updated successfully");
                  }
                });
              });
            }
          });
        }
      }
    );

    res.status(201).json({ product: newEditedProduct });
  } catch (error) {
    console.log(error.message);
    res.status(404).json({ message: "Not working" });
  }
};
