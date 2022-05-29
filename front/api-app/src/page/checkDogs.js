import React, { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Axios from 'axios'

import checkDogs from '../images/checkDogs.png'

export default function CheckDogs() {
    // Get the token stored in the browser local storage.
    const token = 'Bearer ' + localStorage.getItem('accessToken') 
    const header = {
        'Authorization': token
    } 
    const tokenTwo = 'Bearer ' + localStorage.getItem('accessToken') 
    console.log(tokenTwo)
    const headerTwo = {
        'Authorization': tokenTwo
    } 

    const urlCheck = "http://localhost:4000/checkToken"

    // Call the GET checkDog API once the page is start loading
    // Verify if the user have the worker access or not. 
    // If not then re-route the apge.
    useEffect(() => {
        Axios.get(urlCheck, {
            headers: header
        }).then(res => {}).catch(err => {
            window.location.href = "/"
            console.log(err)
        })
    })

    /**
     * @constant data 
     * @description Data for storing all the relevant dogs records.
     * @type {Array}
     */
    const [data, setData] = useState({id: "", name: "", age: "", sex: "", breed: "", location:"", image: ""})

    const initialState = {id: "", name: "", age: "", sex: "", breed: "", location:"", image: ""}
    /**
     * @constant dataTwo 
     * @description Data for storing all the relevant dogs records.
     * @type {Array}
     */
    const [dataTwo, setDataTwo] = useState({id: "", name: "", age: "", sex: "", breed: "", location:"", image: ""})

    // API url to call
    const url = "http://localhost:4000/worker/dog/" + data.id
    const urlTwo = "http://localhost:4000/dog/" + dataTwo.id


    /**
     * @function submit
     * @description Submits the form and call the targeted API, then handles the data sent from the server. 
     * This is used to get dog record using id by calling the get API.
     * Then the data will be retrived from the server if the request is sucessful, 
     * if not an error message will be alerted to notify the user that it failed.
     * @param {eventObject} e The eventObject.
     * @returns {Object|Status} The rows of dog data retreived from the database or the fail request error status code.
     */
    function submit(e){
        e.preventDefault()
        console.log(data.id)

        // This calls the get API and try to retrive the data.
        Axios.get(url,{id: data.id, headers: header}).then(res => {
            setData(initialState)
            setData(res.data)
            console.log(data)
            if (res.data !== "undefined"){ 
                console.log('yes')
            }
        }).catch( function (error) {
            alert("The dog record is not found, please re-try.")          
        })
    }

    /**
     * @function submitTwo
     * @description Submits the form and call the targeted API, then handles the data sent from the server. 
     * This is used to update dog record using id by calling the post API. 
     * The inputted data will be sent to the server and update the dog record, 
     * if not an error message will be sent back and alerted to notify the user that it failed.
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
            <Card>
                <Card.Img variant="top" src={checkDogs} width={100} height={250} />
            </Card>
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