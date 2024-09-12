import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const Storecontext = createContext(null);

const Storecontextprovider = (props) => {

  
  const [cartItems, setCartItems] = useState({}); //To set items in the users cart currently
  const [books, setBooks] = useState([]); //To set list of books in the backend
  


  //Main list of all the books
  useEffect(() => {
    axios.get('http://localhost:8000/list')
      .then((response) => {
        if (response.data && Array.isArray(response.data.data)) {
          
          setBooks(response.data.data);

        } else {
          console.error("Expected an array in response.data.data:", response.data);
        }
      })
      .catch((error) => console.log(error));
  }, []);
 
  // console.log(books);
  

  // local storage me se lao verna backend se
  useEffect(() => {
    const fetchCart = async () => {
      const userEmail = localStorage.getItem("userEmail");

      if (userEmail) {
        const storedCartItems = localStorage.getItem('cartItems');
        
        if (storedCartItems) {
          setCartItems(JSON.parse(storedCartItems));
        } else {
          try {
            const response = await axios.get(`http://localhost:8000/cart/${userEmail}`);

            // console.log(response);
            
            if (response.data && response.data.cartItems) {
              setCartItems(response.data.cartItems);
              localStorage.setItem("cartItems", JSON.stringify(response.data.cartItems));
            }
          } catch (error) {
            console.error("Error fetching cart from backend:", error);
          }
        }
      }
    };
    
    fetchCart();
  }, []);

  // Add to cart logic
  const addToCart = async (id) => {
    try {
      setCartItems((prevItems) => {
        const newCart = { ...prevItems };
        if (newCart[id]) {
          newCart[id] += 1;
        } else {
          newCart[id] = 1;
        }
        alert("Item added to cart");
        localStorage.setItem("cartItems", JSON.stringify(newCart));
        return newCart;
      });

      const userEmail = localStorage.getItem("userEmail");
      const updatedCart = {
        email: userEmail,
        cartItems: { ...cartItems, [id]: (cartItems[id] || 0) + 1 },
      };

      const response = await axios.post("http://localhost:8000/cart", updatedCart);
      if (response.data.success) {
        console.log("Cart saved to backend");
      } else {
        console.log("Error saving cart to backend");
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  const getTotal = () => {
    let sum = 0;
    for (const id in cartItems) {
      const book = books.find((item) => item._id === id);
      if (book) {
        sum += cartItems[id] * book.price;
      }
    }
    return sum;
  };

  const contextValue = {
    cartItems,
    addToCart,
    setCartItems,
    books,
    setBooks,
    getTotal,
  };

  return (
    <Storecontext.Provider value={contextValue}>
      {props.children}
    </Storecontext.Provider>
  );
};

export default Storecontextprovider;
