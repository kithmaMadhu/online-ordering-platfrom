import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle,
    Breadcrumb, BreadcrumbItem  } from 'reactstrap';
import { Link } from 'react-router-dom';

function RenderProduct({product}){
        return(
            <div className="col-12 col-md-5 m-1">
            <Card>
                <CardImg width="100%" src={product.image} alt={product.product_name} />
                <CardBody>
                    <CardTitle>Item Name : {product.product_name}</CardTitle>
                    <CardTitle>Unit Price(Rs.) : {product.unit_price}</CardTitle>
                    <CardTitle>Stock available : {product.units_in_store}</CardTitle>
                </CardBody>
            </Card>
            </div>
        );
}

const ProductDetail = (props) => {
    if (props.product != null){
        return(
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.product.product_name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.product.product_name}</h3>
                        <hr />
                    </div> 
                </div>
                <div className="row">
                    <RenderProduct product={props.product} />
                </div>
            </div>
        )
    }
    else{
        return(
            <div></div>
        )
    }
}

export default ProductDetail; 
