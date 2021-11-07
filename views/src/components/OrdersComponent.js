import React, { Component, useState, useEffect } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle,
    Breadcrumb, BreadcrumbItem  } from 'reactstrap';
import { Link } from 'react-router-dom';


function Orders() {

    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState();
    const [orderProductCount, setOrderProductCount] = useState([]);
    const [newId, setNewId] = useState();
    const [rowSpanCount, setRowSpanCount] = useState();
    
    const callgetOrdersAPI = () => {
        fetch("http://localhost:8000/orders")
            .then(res => res.text())
            .then(res => setOrders(JSON.parse(res)));
    }

    const callgetOrderProductCountAPI = () => {
        fetch("http://localhost:8000/ordersProductCount")
            .then(res => res.text())
            .then(res => setOrderProductCount(JSON.parse(res)));
    }

    useEffect(()=>{
        callgetOrdersAPI();
        callgetOrderProductCountAPI();
      },[])

    const onProductSelect = (order) => {
        this.setSelectedOrder(order);
    }

    const callcancelOrderAPI = (param, customerId, orderDate) => {

        const url = 'http://localhost:8000/orders/'+param
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ customer_id: customerId, order_date: orderDate, status: "deleted" })
        };
        fetch(url, requestOptions)
            .then(response => console.log('Order was cancelled'))
            .catch(error => console.log('Error while cancelling order: ', error))

        console.log('Cancelled order: ' + JSON.stringify(param));
        alert('Cancelled order: ' + JSON.stringify(param)); 
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

    const getSpanCount = (orderId, map) => {
        if (newId != orderId){
            setRowSpanCount(map.get(orderId));
            setNewId(orderId);
        }else{
            setRowSpanCount(0);
        } 
        console.log(rowSpanCount);
    }  

    const dateOptions = { month: "long", day: "numeric", year: "numeric" };
    const map1 = new Map();

    orderProductCount.map((count) => {
        map1.set(count.order_id, count.product_count);
    });
    
    /* const allOrders = orders.map((order) => {
        return (
            <div key={order.order_id} className="col-12 col-md-5 m-1">
                <Card>
                    <Link to={`/order/${order.order_id}`} >
                        <CardImg width="100%" src={order.image} alt={order.product_name} />
                    <CardImgOverlay body className="ml-5">
                        <CardTitle>{order.customer_name}</CardTitle>
                    </CardImgOverlay>
                    </Link>
                </Card>
            </div>
        );
    }); */

    return (
        <div class="container"> 
            <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Orders</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>Orders</h3>
                        <hr />
                    </div>                
            </div>

            <div class="row row-content">
                <div class="col">
                    <div class="table-responsive">
                        <table class="table table-striped">
                            <thead class="thead-dark">
                                <tr>
                                    <th>Order Id</th>
                                    <th>Customer Id/ Name</th>
                                    <th>Order Date</th>
                                    <th>Items</th>
                                    <th>Quantity</th>
                                    
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map(order => 
                                    <>
                                    {/* {this.getSpanCount(order.order_id, map1)} */}
                                        <tr>
                                            <td><span className="responsive-mobile-heading"></span>{order.order_id}</td>
                                            <td><span className="responsive-mobile-heading"></span>{order.customer_id}/ {order.customer_name}</td>
                                            <td><span className="responsive-mobile-heading"></span>{new Intl.DateTimeFormat("en-US", dateOptions).format(new Date(order.order_date))}</td>
                                            <td><span className="responsive-mobile-heading"></span>{<div className="col-12 col-md-5 m-1">
                                                    <Card>
                                                        <Link to={`/order/${order.order_id}`} > 
                                                            <CardImg width="100%" src={order.image} alt={order.product_name} />
                                                        <CardImgOverlay body className="ml-5">
                                                            <CardTitle>{order.product_name}</CardTitle>
                                                        </CardImgOverlay>
                                                        </Link>
                                                    </Card>
                                                </div>}
                                            </td>
                                            <td><span className="responsive-mobile-heading"></span>{order.quantity}</td>
                                            <td><span className="responsive-mobile-heading"></span>{<div className="row">
                                                    <button className="btn" onClick={() => {
                                                        callcancelOrderAPI(order.order_id, order.customer_id);
                                                        window.location.reload();
                                                    }}
                                                            title="Delete Order">
                                                    <i className="fa fa-trash fa-lg"/>
                                                    </button>
                                                </div>}
                                            </td>
                                        </tr>
                                    </>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="col-12 col-sm-3">
                </div>
            </div> 

        </div>

        // <div className="container">
        //     <div className="row">
        //         <Breadcrumb>
        //             <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
        //             <BreadcrumbItem active>Orders</BreadcrumbItem>
        //         </Breadcrumb>
        //         <div className="col-12">
        //             <h3>Orders</h3>
        //             <hr />
        //         </div>                
        //     </div>
        //     <div className="row">
        //             {orders}
        //     </div>
        //     {/* <div className="row">
        //             {this.renderProduct(this.state.selectedProduct)}
        //     </div> */}
        // </div>
    );
}

export default Orders;