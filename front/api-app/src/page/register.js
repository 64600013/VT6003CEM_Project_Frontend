import React, { useState } from 'react'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Axios from 'axios'

import register from '../images/register.png'

export default function Register() {
    const url = "http://localhost:4000/worker"
    
    const [data, setData] = useState({name: "", age: "", sex: "", email: "", password: "", signup_code: ""})

    /**
     * @function submit
     * @description Submits the form and call the targeted API, then handles the data sent from the server.
     * @param {eventObject} e The eventObject.
     * @returns {Object|Status} The rows of dog data retreived from the database or the fail request error status code.
     */
    function submit(e){
        e.preventDefault()
        Axios.post(url,{name: data.name, age: data.age, sex: data.sex, email: data.email, password: data.password, signup_code: data.signup_code
        }).then(res => {
            console.log(res.data)
            if (res.data !== "undefined"){ 
                window.location.href="/login"
                console.log('yes')
            }
        })
        
    }
    
    /**
     * @function handle
     * @description Handles the data inputted in the input fields, and insert the data into a array for storage.
     * @param {Object} e The eventObject.
     * @returns {Object} The inputData array.
     * 
     */
    function handle(e){
        const inputData={...data}
        inputData[e.target.id] = e.target.value
        setData(inputData)
        console.log(inputData)
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
