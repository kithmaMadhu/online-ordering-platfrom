import React, { Component, useState, useEffect } from 'react';
import CartItem from './CartItemComponent';

function Cart(props){

  const [maxOrderId, setMaxOrderId] = useState("");
  const [productCount, setProductCount] = useState([]);

    const getCurrentDate = () => {
      const current = new Date();
      const date = `${current.getFullYear()}-${current.getMonth()+1}-${current.getDate()}`;
      return date;
    };
    
    const callgetOrderIdAPI = () => {
      fetch("http://localhost:8000/getMaxOrderId")
          .then(res => res.text())
          .then(res => setProductCount(JSON.parse(res) ));
    }

    useEffect(() => {
      callgetOrderIdAPI();
    }, [])
    
    const callPlaceOrder = (orderId, customerId) => {
    
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
    
    const callPlaceOrderProducts = (orderId, productId, quantity) => {
    
      const url = 'http://localhost:8000/orderProducts'
      const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ order_id: orderId, product_id: productId, quantity: quantity})
      };
      fetch(url, requestOptions)
          .then(response => console.log('Ordered successfully'))
          .catch(error => console.log('Error occured while ordering', error))
    
      console.log('Placed order '  /*  + JSON.stringify(orderId) */ );
    };
    const calculateTotal = (items) =>
      items.reduce((ack, item) => ack + item.quantity * item.unit_price, 0);
  
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
        <h2>Total: Rs.{calculateTotal(props.cartItems).toFixed(2)}</h2>
        <button className="btn" onClick={() => { callPlaceOrder(productCount[0].maxId+1,2);
                                props.cartItems.map(item => (
                                  callPlaceOrderProducts(productCount[0].maxId+1,item.product_id, 2)
                                )); }} style={{"background-color": "#0d6efda8"}}>Place Order</button>
      </div>
    );
  };
  
export default Cart;