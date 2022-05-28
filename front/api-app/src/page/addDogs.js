import React, { useState } from 'react'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Axios from 'axios'

import addDogs from '../images/addDogs.png'

export default function AddDogs() {
    const [data, setData] = useState({name: "", age: "", sex: "", breed: "",location: "", image: ""})
    const url = "http://localhost:4000/dog/"
    var resMsg = ''

    // Set token
    const token = 'Bearer ' + localStorage.getItem('accessToken') 
    const header = {
        'Authorization': token
    } 

    /**
     * @function submit
     * @description Submits the form and call the targeted API, then handles the data sent from the server. 
     * Then alert the user if the request is successful.
     * @param {eventObject} e The eventObject.
     * @returns {String|Status} The successful message sent from the server or the fail request error status code.
     */
    function submit(e){
        e.preventDefault()
        console.log(header)
        console.log(data)
        Axios.post(url,{ 
            name: data.name, 
            age: data.age, 
            sex: data.sex, 
            breed: data.breed, 
            location: data.location, 
            image: data.image},{
            headers: header
        }).then(res => {
            alert(res.data)
            if (res.data !== "undefined"){ 
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
            <Card>
                <Card.Img variant="top" src={addDogs} width={100} height={250} />
            </Card>
            <br />
            <Card>
                <Card.Body>
                    <br/>
                    {resMsg}
                    <Form onSubmit={(e)=>submit(e)}>
                        <br/>
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Dog Name</Form.Label>
                            <Form.Control onChange={(e)=>handle(e)} id="name" defaultValue={data.name} placeholder="Dog Name" type="text" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicAge">
                            <Form.Label>Dog Age</Form.Label>
                            <Form.Control onChange={(e)=>handle(e)} id="age" defaultValue={DataTransferItem.age} placeholder="Dog Age" type="text" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicSex">
                            <Form.Label>Dog Sex</Form.Label>
                            <Form.Control onChange={(e)=>handle(e)} id="sex" defaultValue={data.sex} placeholder="Dog Sex" type="text" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicBreed">
                            <Form.Label>Dog Breed</Form.Label>
                            <Form.Control onChange={(e)=>handle(e)} id="breed" defaultValue={data.breed} placeholder="Dog Breed" type="text" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicLocation">
                            <Form.Label>Dog Location</Form.Label>
                            <Form.Control onChange={(e)=>handle(e)} id="location" defaultValue={data.location} placeholder="Dog Location" type="text" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicImage">
                            <Form.Label>Image Link</Form.Label>
                            <Form.Control onChange={(e)=>handle(e)} id="image" defaultValue={data.image} placeholder="Image Link" type="text" />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Add Dogs
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    )
}