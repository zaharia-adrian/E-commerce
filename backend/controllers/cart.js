import User from "../models/user.js";
import Product from "../models/product.js";

export const getCart = async (req, res) => {
  const { _id } = req.body.user;
  try {
    const user = await User.findOne({ _id });
    const cart = user.cart;

    res.status(201).json({ cart });
  } catch (error) {
    console.log(error.message);
  }
};

export const addToCart = async (req, res) => {
  const { productId } = req.body;
  const { _id } = req.body.user;
  try {
    const user = await User.findOne({ _id });
    const product = await Product.findOne({ _id: productId });

    const existingProduct = user.cart?.findIndex(
      (product) => product.productId == productId
    );

    if (existingProduct > -1 && user.cart.length > 0)
      user.cart[existingProduct].quantity++;
    else
      user.cart = [
        {
          quantity: 1,
          productId: productId,
          name: product.name,
          price: product.price,
          image: product.image,
        },
        ...user.cart,
      ];

    await user.save();

    res.status(201).json({ cart:user.cart });
  } catch (error) {
    console.log(error.message);
  }
};

export const removeFromCart = async (req, res) => {
  const { productId } = req.body;
  const { _id } = req.body.user;
  try {
    const user = await User.findOne({ _id });
    const product = await Product.findOne({ _id: productId });

    const existingProduct = user.cart?.findIndex(
      (product) => product.productId == productId
    );

    if (user.cart[existingProduct].quantity > 1)
      user.cart[existingProduct].quantity--;
    else
      user.cart = [
        ...user.cart.filter((product) => product.productId != productId), 
      ];

    await user.save();
    res.status(201).json({ cart:user.cart});
  } catch (error) {
    console.log(error.message);
  }
};
