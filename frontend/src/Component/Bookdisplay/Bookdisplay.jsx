import React, { useEffect, useState } from "react";
import "./Bookdisplay.css";
import axios from "axios";
import { useContext } from "react";
import { Storecontext } from "../../Context/Storecontext";
import BookItem from "../BookItem/BookItem";

const Bookdisplay = () => {
  const { books } = useContext(Storecontext);

  return (
    <div className="book-display" id="book-display">
      <h2>Top books for you</h2>
      <div className="book-display-list">
        {books.map((item, index) => (
          <BookItem 
            key={index}
            id={item._id}
            name={item.name}
            description={item.description}
            price={item.price}
            author={item.author}
            image={item.image}
          />
        ))}
      </div>
    </div>
  );
};

export default Bookdisplay;
