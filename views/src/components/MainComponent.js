import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Menu from './MenuComponent';
import Home from './HomeComponent';
import { Switch, Route, Redirect } from 'react-router-dom';


class Main extends Component {
    render() {

    const HomePage = () => {
        return(
            <Home />
        );
    }
        
    return (
        <div>
        <Header />
        <Switch>
            <Route path='/home' component={HomePage} />
            <Route exact path='/menu' component={Menu} />
            <Redirect to="/home" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default Main;