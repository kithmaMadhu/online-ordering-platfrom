import React, { Component, useState } from 'react';
import { Breadcrumb, BreadcrumbItem,
    Button, Form, FormGroup, Label, Input, Col } from 'reactstrap';

function Login() {

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

        const url = 'http://localhost:8000/login'
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: username , password: password })
        };
        fetch(url, requestOptions)
            .then(response => console.log(response))
            .catch(error => console.log('Login error', error))

        /* console.log('Successfully registered: ' + JSON.stringify(this.state));
        alert('Successfully registered: ' + JSON.stringify(this.state)); */
    }

    return(
            <div className="row row-content">
                <div className="col-12">
                    <h3>Login</h3>
                </div>
                <div className="col-12 col-md-9">
                    <Form onSubmit={handleSubmit}>
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
                                    Login
                                </Button>
                            </Col>
                        </FormGroup>
                    </Form>
                </div>
            </div>
    )
}

export default Login;   