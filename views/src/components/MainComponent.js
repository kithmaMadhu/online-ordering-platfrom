import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Menu from './MenuComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import ProductDetail from './ProductDetailComponent';
import Register from './RegisterComponent';
import Login from './LoginComponent';
import { Switch, Route, Redirect } from 'react-router-dom';


class Main extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            products: [], 
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

    render() {

    const HomePage = () => {
        return(
            <Home />
        );
    }

     const ProductWithId = ({match}) => {
        return(
            <ProductDetail product={this.state.products.filter((product) => product.product_id === parseInt(match.params.productId,10))[0]} />
        );
    }; 
        
    return (
        <div>
        <Header />
        <Switch>
            <Route path='/home' component={HomePage} />
            <Route path='/login' component={Login} /> 
            <Route path='/register' component={Register} /> 
            <Route exact path='/menu' component={Menu} />
            <Route path='/menu/:productId' component={ProductWithId} /> 
            <Route exact path='/contactus' component={Contact} />
            <Redirect to="/home" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default Main;