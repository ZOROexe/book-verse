import User from "../models/userModel.js";

export const addCart = async (req, res) => {
  const { userId } = req.user;
  const { id } = req.params;
  try {
    const user = await User.findById(userId);
    if (user.cart.includes(id))
      return res.status(409).json({ message: "Book already exists in cart" });
    await User.findByIdAndUpdate(userId, { $push: { cart: id } });
    return res.status(200).json({ message: "Book added to cart succesfully" });
  } catch (error) {
    console.log("error in adding to cart", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const removeCart = async (req, res) => {
  const { userId } = req.user;
  console.log(userId);
  const { id } = req.params;
  try {
    const user = await User.findById(userId);
    if (user.cart.includes(id)) {
      await User.findByIdAndUpdate(userId, { $pull: { cart: id } });
      return res.status(200).json({ message: "Book removed from cart" });
    } else {
      return res.status(400).json({ message: "Book is not in cart" });
    }
  } catch (error) {
    console.log("Error in remving book from cart", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const viewCart = async (req, res) => {
  const { id } = req.headers;
  try {
    const user = await User.findById(id).populate("cart");
    const cart = user.cart.slice().reverse();
    return res.status(200).json({ cart });
  } catch (error) {
    console.log("Error in viewing cart", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
