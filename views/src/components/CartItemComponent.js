import React, { Component, useState } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle,
    Breadcrumb, BreadcrumbItem, Input  } from 'reactstrap';
import Button from '@material-ui/core/Button';
// Types

function addToCart(product) {
    product.quantity = product.quantity + 1;
}

const CartItem = (props) => {
    if (props.item != null){
        props.item.quantity = 1;
        return(
            <div className="col-12 col-md-5 m-1">
                <div>
                    <h3>{props.item.product_name}</h3>
                    <div className='information'>
                        <p>Price: Rs.{props.item.unit_price}</p>
                        {/* <p>Enter Quantity: </p><Input type="text" id="quatity" name="quantity"
                                        placeholder="quantity"
                                        onChange={(e) => props.item.quantity=e.target.value} /> */}
                        <p>Total: Rs.{(props.item.quantity * props.item.unit_price).toFixed(2)}</p>
                    </div>
                    <div className='buttons'>
                        <Button
                        size='small'
                        disableElevation
                        variant='contained'
                        onClick={() => props.removeFromCart(props.item.product_id)}
                        >
                        -
                        </Button>
                        <p>{props.item.quantity}</p>
                        <Button
                        size='small'
                        disableElevation
                        variant='contained'
                        onClick={() => addToCart(props.item)}
                        >
                        +
                        </Button>
                    </div> 
                </div>
                <Card>
                <img src={props.item.image} alt={props.item.product_name} />
                </Card>
            </div>
        )
    }
    else{
        return(
            <div></div>
        )
    }
}

export default CartItem;