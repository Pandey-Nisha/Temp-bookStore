import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from '../models/user.js';
import errorHandlerClass from '../middleware/errorHandlerClass.js';

export async function handleLoginRoute(req, res, next) {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: 'Invalid email or password.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Invalid email or password.' });
        }

        const token = jwt.sign({ email: user.email }, 'secret');
        res.cookie('token', token);
        console.log(token);
        

        res.status(200).json({ success: true, message: 'Login successful.', token });
    } catch (error) {
        next(new errorHandlerClass(error));
    }
}

export async function handleLogoutRoute(req, res, next) {
    try {
        res.clearCookie('token');
        res.status(200).json({ success: true, message: 'Logged out successfully.' });
    } catch (error) {
        next(new errorHandlerClass(error));
    }
}
export async function handleAddToCart(req, res) {
    const { email, cartItems } = req.body; 

    try {
        const user = await userModel.findOneAndUpdate(
            { email: email },
            { $set: { cartItems: cartItems } },
            { new: true } 
        );

        if (!user) {
            return res.status(400).json({ success: false, message: "User not found." });
        }

        return res.status(200).json({ success: true, message: "Cart updated successfully.", user });
    } catch (error) {
        console.error("Error updating cart:", error);
        res.status(500).json({ success: false, message: "Error updating cart." });
    }
}

export async function getUserCart(req, res) {
    const { email } = req.params;
  
    try {
      const user = await userModel.findOne({ email });
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found." });
      }
  
      res.status(200).json({ success: true, cartItems: user.cartItems });
    } catch (error) {
      console.error("Error fetching cart:", error);
      res.status(500).json({ success: false, message: "Error fetching cart." });
    }
  }
  
