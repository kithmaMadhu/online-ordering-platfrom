import React, { Component, useEffect, useState } from 'react';
import { Breadcrumb, BreadcrumbItem,
    Button, Form, FormGroup, Label, Input, Col } from 'reactstrap';

function Register(props) {
        
        const [name, setName] = useState();
        const [address, setAddress] = useState();
        const [email, setEmail] = useState();
        const [telnum, setTelnum] = useState();
        const [username, setUsername] = useState();
        const [password, setPassword] = useState();

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

    const handleSubmit = (event) => {
        event.preventDefault();

        const url = 'http://localhost:8000/customers'
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ customer_name: name, address: address, email: email, mobile_num: telnum, username: username
                , password: password })
        };
        fetch(url, requestOptions)
            .then(response => console.log('Submitted successfully'))
            .catch(error => console.log('Form submit error', error))

        console.log('Successfully registered: ' + JSON.stringify(name));
        alert('Successfully registered: ' + JSON.stringify(name)); 
    }

    return(
        <div className="row row-content">
            <div className="col-12">
                <h3>Register</h3>
            </div>
            <div className="col-12 col-md-9">
                <Form onSubmit={handleSubmit}>
                <FormGroup row style={{"display": "block"}}>
                        <Label htmlFor="name" md={2}>Name</Label>
                        <Col md={10}>
                            <Input type="text" id="name" name="name"
                                placeholder="Name"
                                value={name}
                                onChange={(e) => {
                                    setName(e.target.value);
                                }} />
                        </Col>
                    </FormGroup>
                    <FormGroup row style={{"display": "block"}}>
                        <Label htmlFor="address" md={2}>Address</Label>
                        <Col md={10}>
                            <Input type="text" id="address" name="address"
                                placeholder="Address"
                                value={address}
                                onChange={(e) => {
                                    setAddress(e.target.value);
                                }} />
                        </Col>                        
                    </FormGroup>
                    <FormGroup row style={{"display": "block"}}>
                        <Label htmlFor="email" md={2}>Email</Label>
                        <Col md={10}>
                            <Input type="email" id="email" name="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }} />
                        </Col>
                    </FormGroup>
                    <FormGroup row style={{"display": "block"}}>
                    <Label htmlFor="telnum" md={2}>Tel No.</Label>
                        <Col md={10}>
                            <Input type="tel" id="telnum" name="telnum"
                                placeholder="Tel. number"
                                value={telnum}
                                onChange={(e) => {
                                    setTelnum(e.target.value);
                                }} />
                        </Col>
                    </FormGroup>
                    <FormGroup row style={{"display": "block"}}>
                        <Label htmlFor="username" md={2}>Username</Label>
                        <Col md={10}>
                            <Input type="text" id="username" name="username"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => {
                                    setUsername(e.target.value);
                                }} />
                        </Col>
                    </FormGroup>
                    <FormGroup row style={{"display": "block"}}>
                        <Label htmlFor="password" md={2}>Password</Label>
                        <Col md={10}>
                            <Input type="password" id="password" name="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }} />
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

export default Register;   