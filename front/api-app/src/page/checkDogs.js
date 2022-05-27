import React, { useState } from 'react'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Axios from 'axios'


export default function CheckDogs() {
    const [data, setData] = useState({id: "", name: "", age: "", sex: "", breed: "", location:"", image: ""})

    /**
     * @constant dataTwo 
     * @description Data for storing all the relevant dogs records.
     * @type {Array}
     */
    const [dataTwo, setDataTwo] = useState({id: "", name: "", age: "", sex: "", breed: "", location:"", image: ""})
    const url = "http://localhost:4000/worker/dog/" + data.id
    const urlTwo = "http://localhost:4000/dog/" + dataTwo.id
    const token = 'Bearer ' + localStorage.getItem('accessToken') 
    const header = {
        'Authorization': token
    } 
    const tokenTwo = 'Bearer ' + localStorage.getItem('accessToken') 
    console.log(tokenTwo)
    const headerTwo = {
        'Authorization': tokenTwo
    } 


    /**
     * @function submit
     * @description Submits the form and call the targeted API, then handles the data sent from the server.
     * @param {eventObject} e The eventObject.
     * @returns {Object|Status} The rows of dog data retreived from the database or the fail request error status code.
     */
    function submit(e){
        e.preventDefault()
        console.log(data.id)
        Axios.get(url,{id: data.id, headers: header}).then(res => {
            setData(res.data)
            console.log(data)
            if (res.data !== "undefined"){ 
                console.log('yes')
            }
        })
    }

    /**
     * @function submitTwo
     * @description Submits the form and call the targeted API, then handles the data sent from the server. 
     * Then alert the user if the request is successful.
     * @param {eventObject} e The eventObject.
     * @returns {String|Status} The successful message sent from the server or the fail request error status code.
     */
    function submitTwo(e){
        e.preventDefault()
        console.log(headerTwo)
        console.log(dataTwo)
        Axios.put(urlTwo,{ 
            id: dataTwo.id, 
            name: dataTwo.name, 
            age: dataTwo.age, 
            sex: dataTwo.sex, 
            breed: dataTwo.breed, 
            location: dataTwo.location, 
            image: dataTwo.image },{
            headers: headerTwo
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

    /**
     * @function handleTwo
     * @description Handles the data inputted in the input fields, and insert the data into a array for storage.
     * @param {Object} e The eventObject.
     * @returns {Object} The inputData array.
     * 
     */
    function handleTwo(e){
        const inputData={...dataTwo}
        inputData[e.target.id] = e.target.value
        setDataTwo(inputData)
        console.log(inputData)
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
                            <Form.Control onClick={(e)=>handleTwo(e)} id="id" value={data[0]?.id} placeholder="Dog ID" type="text" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Dog Name</Form.Label>
                            <Form.Control onClick={(e)=>handleTwo(e)} id="name" defaultValue={data[0]?.name} placeholder="Dog Name" type="text" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicAge">
                            <Form.Label>Dog Age</Form.Label>
                            <Form.Control onClick={(e)=>handleTwo(e)} id="age" defaultValue={data[0]?.age} placeholder="Dog Age" type="text" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicSex">
                            <Form.Label>Dog Sex</Form.Label>
                            <Form.Control onClick={(e)=>handleTwo(e)} id="sex" defaultValue={data[0]?.sex} placeholder="Dog Sex" type="text" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicBreed">
                            <Form.Label>Dog Breed</Form.Label>
                            <Form.Control onClick={(e)=>handleTwo(e)} id="breed" defaultValue={data[0]?.breed} placeholder="Dog Breed" type="text" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicLocation">
                            <Form.Label>Dog Location</Form.Label>
                            <Form.Control onClick={(e)=>handleTwo(e)} id="location" defaultValue={data[0]?.location} placeholder="Dog Location" type="text" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicImage">
                            <Form.Label>Image Link</Form.Label>
                            <Form.Control onClick={(e)=>handleTwo(e)} id="image" defaultValue={data[0]?.image} placeholder="Image Link" type="text" />
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