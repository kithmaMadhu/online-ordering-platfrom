import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem,
    Button, Form, FormGroup, Label, Input, Col } from 'reactstrap';

class Register extends Component{

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            address: '',
            email: '',
            telnum: '',
            username: '',
            password: '',
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
    }

    /* callCreateCustomersAPI() {
        // Simple POST request with a JSON body using fetch
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: 'React POST Request Example' })
        };
        fetch('http://localhost:8000/customers', requestOptions)
            .then(response => response.json())
            .then(data => this.setState({ insertId: data.customer_id }));
    } */

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        const url = 'http://localhost:8000/customers'
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ customer_name: this.state.name, address: this.state.address, email: this.state.email, mobile_num: this.state.telnum, username: this.state.username
                , password: this.state.password })
        };
        fetch(url, requestOptions)
            .then(response => console.log('Submitted successfully'))
            .catch(error => console.log('Form submit error', error))

        /* console.log('Successfully registered: ' + JSON.stringify(this.state));
        alert('Successfully registered: ' + JSON.stringify(this.state)); */
    }

    render() {
        return(
                <div className="row row-content">
                    <div className="col-12">
                      <h3>Register</h3>
                   </div>
                   <div className="col-12 col-md-9">
                        <Form onSubmit={this.handleSubmit}>
                        <FormGroup row style={{"display": "block"}}>
                                <Label htmlFor="name" md={2}>Name</Label>
                                <Col md={10}>
                                    <Input type="text" id="name" name="name"
                                        placeholder="Name"
                                        value={this.state.name}
                                        onChange={this.handleInputChange} />
                                </Col>
                            </FormGroup>
                            <FormGroup row style={{"display": "block"}}>
                                <Label htmlFor="address" md={2}>Address</Label>
                                <Col md={10}>
                                    <Input type="text" id="address" name="address"
                                        placeholder="Address"
                                        value={this.state.address}
                                        onChange={this.handleInputChange} />
                                </Col>                        
                            </FormGroup>
                            <FormGroup row style={{"display": "block"}}>
                                <Label htmlFor="email" md={2}>Email</Label>
                                <Col md={10}>
                                    <Input type="email" id="email" name="email"
                                        placeholder="Email"
                                        value={this.state.email}
                                        onChange={this.handleInputChange} />
                                </Col>
                            </FormGroup>
                            <FormGroup row style={{"display": "block"}}>
                            <Label htmlFor="telnum" md={2}>Tel No.</Label>
                                <Col md={10}>
                                    <Input type="tel" id="telnum" name="telnum"
                                        placeholder="Tel. number"
                                        value={this.state.telnum}
                                        onChange={this.handleInputChange} />
                                </Col>
                            </FormGroup>
                            <FormGroup row style={{"display": "block"}}>
                                <Label htmlFor="username" md={2}>Username</Label>
                                <Col md={10}>
                                    <Input type="text" id="username" name="username"
                                        placeholder="Username"
                                        value={this.state.username}
                                        onChange={this.handleInputChange} />
                                </Col>
                            </FormGroup>
                            <FormGroup row style={{"display": "block"}}>
                                <Label htmlFor="password" md={2}>Password</Label>
                                <Col md={10}>
                                    <Input type="password" id="password" name="password"
                                        placeholder="Password"
                                        value={this.state.password}
                                        onChange={this.handleInputChange} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label md={2}></Label>
                                <Col md={{size: 10, offset: 2}}>
                                    <Button type="submit" color="primary">
                                        Register
                                    </Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </div>
                </div>
        )
    }
}

export default Register;   