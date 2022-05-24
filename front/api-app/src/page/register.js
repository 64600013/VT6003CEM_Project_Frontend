import Axios from 'axios'
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import React, { useState } from 'react'
// bootstrap components
// import Card from 'react-bootstrap/Card';
// import Form from 'react-bootstrap/Form';
// import Button from 'react-bootstrap/Button';
import register from '../images/register.png';

export default function Register() {
    const url = "http://localhost:5000/worker";
    const [data, setData] = useState({name: "", age: "", sex: "", email: "", password: "", signup_code: ""})

    function submit(e){
        e.preventDefault();
        Axios.post(url,{name: data.name, age: data.age, sex: data.sex, email: data.email, password: data.password, signup_code: data.signup_code
        }).then(res => {
            console.log(res.data)
            if (res.data !== "undefined"){ 
                console.log('yes')
                window.location.href="/login"
            }
        })
        
    }

    function handle(e){
        const newdata={...data}
        newdata[e.target.id] = e.target.value
        setData(newdata)
        console.log(newdata)
    }

    return (
        <div style={{backgroundColor: '#d6d6d6'}}>
            <br />
            <Card>
                <Card.Body>
                    <Card.Img variant="top" src={register} width={100} height={250} />
                    <br/>
                    <Form onSubmit={(e)=>submit(e)}>
                        <br/>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control onChange={(e)=>handle(e)} id="email" value={data.email} placeholder="Your Email" type="email" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>name</Form.Label>
                            <Form.Control onChange={(e)=>handle(e)} id="name" value={data.name} placeholder="Your Name" type="text" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicAge">
                            <Form.Label>age</Form.Label>
                            <Form.Control onChange={(e)=>handle(e)} id="age" value={data.age} placeholder="Your Age" type="text" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicSex">
                            <Form.Label>sex</Form.Label>
                            <Form.Control onChange={(e)=>handle(e)} id="sex" value={data.sex} placeholder="Your Sex" type="text" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>password</Form.Label>
                            <Form.Control onChange={(e)=>handle(e)} id="password" value={data.password} placeholder="Your Password" type="password" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicSignupCode">
                            <Form.Label>signup code</Form.Label>
                            <Form.Control onChange={(e)=>handle(e)} id="signup_code" value={data.signup_code} placeholder="Your Sign up code" type="text" />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Register Account
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    )
}
