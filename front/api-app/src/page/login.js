import Axios from 'axios'
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import React, { useState } from 'react'
import user from '../images/login-icon.png';

export default function Login() {
  const url = "http://localhost:5000/login";
    const [data, setData] = useState({email: "", password: ""})

    function submit(e){
        e.preventDefault();
        Axios.post(url,{
            email: data.email,
            password: data.password
        }).then(res => {
            console.log(res.data)
            //const test = JSON.parse(res.data)
            console.log(res.data.accessToken)
            localStorage.setItem('accessToken', res.data.accessToken)
            //localStorage.setItem('refreshToken', res.data.refreshToken)
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
          <Card.Img variant="top" src={user} width={100} height={250} />
          
          <Form onSubmit={(e)=>submit(e)}>
            <br/>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control onChange={(e)=>handle(e)} id="email" value={data.email} placeholder="Email Address" type="email" />
              <Form.Text id="passwordHelpBlock" muted>
                Your email must be contain the @ characters long, and
                must not contain spaces, special characters, or emoji.
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>
                Password
              </Form.Label>
              <Form.Control onChange={(e)=>handle(e)} id="password" value={data.password} placeholder="Password" type="password" />
              <Form.Text id="passwordHelpBlock" muted>
                Your password must be 8-20 characters long, and
                must not contain spaces, special characters, or emoji.
              </Form.Text>
            </Form.Group>
            
            
            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  )
}
