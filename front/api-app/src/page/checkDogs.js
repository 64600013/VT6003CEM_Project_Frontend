import Axios from 'axios'
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import React, { useState } from 'react'
// bootstrap components
// import Card from 'react-bootstrap/Card';
// import Form from 'react-bootstrap/Form';
// import Button from 'react-bootstrap/Button';
// import register from '../images/register.png';

export default function CheckDogs() {
    const [data, setData] = useState({id: "", name: "", age: "", sex: "", breed: "", image: ""})
    const [dataTwo, setDataTwo] = useState({id: "", name: "", age: "", sex: "", breed: "", image: ""})
    const url = "http://localhost:5000/dog/" + data.id
    const token = 'Bearer ' + localStorage.getItem('accessToken') 
    console.log(token)
    const header = {
        'Authorization': token
    } 


    function submit(e){
        e.preventDefault();
        console.log(data.id)
        Axios.get(url,{id: data.id, headers: header}).then(res => {
            setData(res.data)
            console.log(data)
            if (res.data !== "undefined"){ 
                console.log('yes')
            }
        })
        
    }

    function submitTwo(e){
        e.preventDefault();
        Axios.put(url,{name: dataTwo.name, age: dataTwo.age, sex: dataTwo.sex, email: dataTwo.email, password: dataTwo.password, signup_code: dataTwo.signup_code
        }).then(res => {
            console.log(res.dataTwo)
            if (res.dataTwo !== "undefined"){ 
                console.log('yes')
            }
        })
        
    }


    function handle(e){
        const newdata={...data}
        newdata[e.target.id] = e.target.value
        setData(newdata)
        console.log(newdata)
    }

    function handleTwo(e){
        const newdata={...dataTwo}
        newdata[e.target.id] = e.target.value
        setDataTwo(newdata)
        console.log(newdata)
    }

    return (
        <div style={{backgroundColor: '#d6d6d6'}}>
            <br />
            <Card>
                <Card.Body>
                    <Form onSubmit={(e)=>submit(e)}>
                        <Form.Group className="mb-3" controlId="formBasicId">
                            <Form.Label>Dog ID</Form.Label>
                            <Form.Control onChange={(e)=>handle(e)} id="id" value={data.id} placeholder="Dog ID" type="text" />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Search
                        </Button>
                    </Form>
                    <br/>
                    <Form onSubmit={(e)=>submitTwo(e)}>
                        <br/>
                        <Form.Group className="mb-3" controlId="formBasicId">
                            <Form.Label>Dog ID</Form.Label>
                            <Form.Control onChange={(e)=>handleTwo(e)} id="id" value={data[0]?.id} placeholder="Dog ID" type="text" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Dog Name</Form.Label>
                            <Form.Control onChange={(e)=>handleTwo(e)} id="name" value={data[0]?.name} placeholder="Dog Name" type="text" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicAge">
                            <Form.Label>Dog Age</Form.Label>
                            <Form.Control onChange={(e)=>handleTwo(e)} id="age" value={data[0]?.age} placeholder="Dog Age" type="text" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicSex">
                            <Form.Label>Dog Sex</Form.Label>
                            <Form.Control onChange={(e)=>handleTwo(e)} id="sex" value={data[0]?.sex} placeholder="Dog Sex" type="text" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicBreed">
                            <Form.Label>Dog Breed</Form.Label>
                            <Form.Control onChange={(e)=>handleTwo(e)} id="breed" value={data[0]?.breed} placeholder="Dog Breed" type="text" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicImage">
                            <Form.Label>Image Link</Form.Label>
                            <Form.Control onChange={(e)=>handleTwo(e)} id="image" value={data[0]?.image} placeholder="Image Link" type="text" />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Update
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    )
}