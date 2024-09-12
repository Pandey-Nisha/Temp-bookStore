import React, { useContext } from 'react';
import './Cart.css';
import { Storecontext } from '../../Context/Storecontext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, books, getTotal } = useContext(Storecontext);
  const navigate = useNavigate();
  const  itemInCart = Object.keys(cartItems)
  console.log(cartItems);
  
  console.log(itemInCart);
  

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Image</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
        </div>
        <br />
        <hr />
        {itemInCart.map(id => {
          const quantity = cartItems[id];
          // console.log(quantity);
          
          const book = books.find((item) => item._id === id);
         

          if (book && quantity > 0) {
            return (
              <div key={id} className="cart-items-title cart-items-item">
                <img src={`http://localhost:8000${book.image}`} alt="" />
                <p>{book.name}</p> 
                <p>$ {book.price}</p>
                <p>{quantity}</p>
                <p>$ {quantity * book.price}</p>
                <hr />
              </div>
            );
          }
          return null;
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h1>Cart Total</h1>
          <div>
            <div className="cart-total-details">
              <h2>Total $ {getTotal()}</h2>
            </div>
          </div>
          <button onClick={() => navigate('/order')}>PROCEED TO CHECKOUT</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
