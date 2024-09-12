import React, { useContext } from 'react';
import './BookItem.css';
import { Storecontext } from '../../Context/Storecontext';

const BookItem = ({id,name,price,description,image,author}) => {

  const {addToCart} = useContext(Storecontext);

  return (
    <div className='book-item'>
      <div className="book-item-img-container">
        <img className=" book-item-image"src={`http://localhost:8000${image}`} alt="" />

      </div>
      <div className="book-item-info">
          <p>{name}</p>
        <p className="book-item-desc">{description}</p>
        <p className="book-item-price">${author}</p>
        <p className="book-item-price">${price}</p>
        <button onClick={() => addToCart(id)}>ADD</button>
      </div>
      
    </div>
  )
}

export default BookItem;
