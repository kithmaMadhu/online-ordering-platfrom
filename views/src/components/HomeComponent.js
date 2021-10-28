import React from "react";
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle, Jumbotron } from 'reactstrap';

function Home(props) {
    return(
      <div className="row" style={{"margin-left": "initial"}}>
          <div className="col-12 col-md-4 m-1" style={{"padding-left": 0, "padding-right": 0}}>
            <Card>
                <CardImg src='assets/images/buffet.jpg' height="500" width="50" alt='Online Ordering Platform' />
            </Card>
          </div>
          <div className="col-12 col-md-4 m-1" style={{"padding-left": 0, "padding-right": 0}}>
            <Card>
                <CardImg src='assets/images/burger.jpeg' height="500" width="50" alt='Online Ordering Platform' />
            </Card>
          </div>
          <div className="col-12 col-md-3 m-1 align-self-center" style={{"padding-left": 0, "padding-right": 0}}>
            <div className="container justify-content-center">
                    <div className="row row-header">
                            <h1>What do you need to order?</h1>
                            <p>We take inspiration from the World's best cuisines, and create a unique fusion experience. Our lipsmacking creations will tickle your culinary senses!</p>
                    </div>
                </div>
          </div>
      </div>
    );
}

export default Home;   