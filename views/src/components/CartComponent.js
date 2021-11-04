import React, { Component, useState } from 'react';
import CartItem from './CartItemComponent';

function getCurrentDate(){
  const current = new Date();
  const date = `${current.getFullYear()}-${current.getMonth()+1}-${current.getDate()}`;
  return date;
};

function callPlaceOrder(orderId, customerId) {

  const url = 'http://localhost:8000/orders'
  const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ order_id: orderId, customer_id: customerId, order_date: getCurrentDate(), status: "active" })
  };
  fetch(url, requestOptions)
      .then(response => console.log('Ordered successfully'))
      .catch(error => console.log('Error occured while ordering', error))

  console.log('Placed order '  /*  + JSON.stringify(orderId) */ );
  alert('Successfully ordered '  /* + JSON.stringify(orderId) */ ); 
};

const Cart = (props) => {
    const calculateTotal = (items) =>
      items.reduce((ack, item) => ack + item.amount * item.price, 0);
  
    return (
        <div className="container">
        <h2>Your Shopping Cart</h2>
        {props.cartItems.length === 0 ? <p>No items in cart.</p> : null}
        {props.cartItems.map(item => (
          <CartItem 
          key={item.product_id}
          item={item}
          addToCart={props.addToCart}
          removeFromCart={props.removeFromCart}/>
        ))}
        <h2>Total: ${calculateTotal(props.cartItems).toFixed(2)}</h2>
        <button className="btn" onClick={() => callPlaceOrder(7,2)} style={{"background-color": "#0d6efda8"}}>Place Order</button>
      </div>
    );
  };
  
export default Cart;