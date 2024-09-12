import React, {useContext} from 'react';
import './Placeorder.css';
import { Storecontext } from '../../Context/Storecontext';

const Placeorder = () => {

  const {getTotal} = useContext(Storecontext);

  return (
    <>
      <form action="" className='placeorder'>
        <div className="placeorder-left">
          <p className="title">Delivery Information</p>
          <div className="multi-fields">
            <input type="text" placeholder='First name' />
            <input type="text" placeholder='Last name' />
          </div>
          <input type="email"placeholder='Email address' />
          <input type="text" placeholder='Street'/>
          <div className="multi-fields">
            <input type="text" placeholder='City' />
            <input type="text" placeholder='State' />
          </div>
          <div className="multi-fields">
            <input type="text" placeholder='Zip code' />
          </div>
          <input type="tel" placeholder='Phone' />
        </div>
        <div className="placeorder-right">
        <div className="cart-total">
          <h1>Cart Total</h1>
          <div>
            <div className="cart-total-detials">
              <h2>Total $ {getTotal()}</h2>
            </div>
          </div>
          <button>PROCEED TO PAY</button>
        </div>
        </div>
      </form>
    </>
  )
}

export default Placeorder;
