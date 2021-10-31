import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle,
    Breadcrumb, BreadcrumbItem  } from 'reactstrap';
import { Link } from 'react-router-dom';


class Orders extends Component {

    constructor(props) {
        super(props);

        this.state = {
            orders: [], 
            selectedOrder: null,
            orderProductCount: [],
            newId: "",
            rowSpanCount: 0
        };
    }

    callgetOrdersAPI() {
        fetch("http://localhost:8000/orders")
            .then(res => res.text())
            .then(res => this.setState({ orders: JSON.parse(res) }));
    }

    callgetOrderProductCountAPI() {
        fetch("http://localhost:8000/ordersProductCount")
            .then(res => res.text())
            .then(res => this.setState({ orderProductCount: JSON.parse(res) }));
    }

    componentWillMount() {
        this.callgetOrdersAPI();
        this.callgetOrderProductCountAPI();
    }

    onProductSelect(order){
        this.setState({selectedOrder: order});
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

    getSpanCount(orderId, map){
        if (this.state.newId != orderId){
            this.setState({rowSpanCount: map.get(orderId)});
            this.setState({newId: orderId});
        }else{
        this.setState({rowSpanCount: 0});
        } 
        console.log(this.state.rowSpanCount);
    }  

    render() {
        const dateOptions = { month: "long", day: "numeric", year: "numeric" };
        const map1 = new Map();

        this.state.orderProductCount.map((count) => {
            map1.set(count.order_id, count.product_count);
        });
        
        const orders = this.state.orders.map((order) => {
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
        });

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
                                    {this.state.orders.map(order => 
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
                                                        <button className="btn" 
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

}

export default Orders;