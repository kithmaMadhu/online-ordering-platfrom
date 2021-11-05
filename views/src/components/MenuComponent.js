import React, { Component, useState } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle,
    Breadcrumb, BreadcrumbItem, Input  } from 'reactstrap';
import Drawer from '@material-ui/core/Drawer';
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import styled from 'styled-components';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Badge from '@material-ui/core/Badge';
import Cart from './CartComponent';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';


class Menu extends Component {

    constructor(props) {
        super(props);

        this.state = {
            products: [], 
            selectedProduct: null,
            cartOpen: false,
            cartItems: [],
            quantity: 1
        };

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
    }

    callgetProductsAPI() {
        fetch("http://localhost:8000/products")
            .then(res => res.text())
            .then(res => this.setState({ products: JSON.parse(res) }));
    }

    componentWillMount() {
        this.callgetProductsAPI();
    }

    onProductSelect(product){
        this.setState({selectedProduct: product});
    }

    /* renderProduct(product){
        if (product != null){
            return(
                <div className="col-12 col-md-10 m-1">
                <Card>
                    <CardImg width="100%" src={product.image} alt={product.product_name} />
                    <CardBody>
                        <CardTitle>{product.product_name}</CardTitle>
                        <CardText>Unit Price(Rs.) : {product.unit_price}</CardText>
                    </CardBody>
                </Card>
                </div>
            )
        }
        else{
            return(
                <div></div>
            )
        }
    } */

    render() {
        console.log(this.state.cartItems);
        const StyledButton = styled(IconButton)`
            position: fixed;
            z-index: 100;
            right: 20px;
            top: 20px;
        `;

        const getTotalItems = (items) => 
            items.reduce((ack, item) => ack + item.quantity, 0);

        /* const handleAddToCart = (clickedItem) => {
            this.setState({cartItems: (prev => {
                const isItemInCart = prev.find(item => item.product_id === clickedItem.product_id)
                if(isItemInCart){
                    return prev.map(item => 
                        item.product_id === clickedItem.product_id ? {...item, quantity: item.quantity + 1}
                        : item
                    );
                }

                return [...prev, {...clickedItem, quantity: 1}];
            })
            })
        }; */

        const handleRemoveFromCart = () => null;

        
        const menu = this.state.products.map((product) => {
            return (
                <div key={product.product_id} className="col-12 col-md-5 m-1">
                    <Drawer variant="temporary" anchor='right' open={this.state.cartOpen} onClose={() => this.setState({cartOpen: false})}>
                    <Cart
                    cartItems={this.state.cartItems}
                    //addToCart={handleAddToCart}
                    removeFromCart={handleRemoveFromCart}
                    />
                    </Drawer>
                    <StyledButton onClick={() => this.setState({cartOpen: true})}>
                        <Badge badgeContent color='error'>
                            <AddShoppingCartIcon />
                        </Badge>
                    </StyledButton>
                    <Card>
                        <Link to={`/menu/${product.product_id}`} >
                            <CardImg width="100%" src={product.image} alt={product.product_name} />
                        <CardImgOverlay body className="ml-5">
                            <CardTitle>{product.product_name}</CardTitle>
                        </CardImgOverlay>
                        </Link>
                        <Card>Enter quantity: <Input type="text" id="quantity" name="quantity"
                                        placeholder="Quantity"
                                        onChange={this.handleInputChange} /></Card>
                        <Card>
                        <button className="btn"  onClick={() => {product.quantity = this.state.quantity; this.setState({cartItems: this.state.cartItems.filter(item => item.product_id != product.product_id).concat(product), 
                        cartOpen: true});}} style={{"background-color": "#0d6efda8"}}>Add to Cart</button>
                        </Card>
                    </Card>
                </div>
            );
        });

        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Menu</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>Menu</h3>
                        <hr />
                    </div>                
                </div>
                <div className="row">
                        {menu}
                </div>
                {/* <div className="row">
                        {this.renderProduct(this.state.selectedProduct)}
                </div> */}
            </div>
        );
    }

}

export default Menu;