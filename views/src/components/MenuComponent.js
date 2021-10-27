import React, { Component } from 'react';
import { Media } from 'reactstrap';
class Menu extends Component {

    constructor(props) {
        super(props);

        this.state = {
            products: [] 
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
        
        const menu = this.state.products.map((product) => {
            return (
                <div key={product.product_id} className="col-12 mt-5">
                    <Media tag="li">
                        <Media left middle>
                            <Media object src={product.image} alt={product.product_name} />
                        </Media>
                        <Media body className="ml-5">
                            <Media heading>{product.product_name}</Media>
                            <p>Unit price: {product.unit_price}</p>
                        </Media>
                    </Media>
                </div>
            );
        });

        return (
          <div className="container">
              <div className="row">
                <Media list>
                    {menu}
                </Media>
              </div>
          </div>
        );
    }

}

export default Menu;