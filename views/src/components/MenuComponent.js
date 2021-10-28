import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';

class Menu extends Component {

    constructor(props) {
        super(props);

        this.state = {
            products: [], 
            selectedProduct: null
        };
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

    renderProduct(product){
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
    }

    render() {
        
        const menu = this.state.products.map((product) => {
            return (
                <div key={product.product_id} className="col-12 col-md-5 m-1">
                    <Card onClick={() => this.onProductSelect(product)}>
                            <CardImg width="100%" src={product.image} alt={product.product_name} />
                        <CardImgOverlay body className="ml-5">
                            <CardTitle>{product.product_name}</CardTitle>
                        </CardImgOverlay>
                    </Card>
                </div>
            );
        });

        return (
            <div className="container">
                <div className="row">
                        {menu}
                </div>
                <div className="row">
                        {this.renderProduct(this.state.selectedProduct)}
                </div>
            </div>
        );
    }

}

export default Menu;