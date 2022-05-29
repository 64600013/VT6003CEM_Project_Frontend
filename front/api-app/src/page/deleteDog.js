import React, { useState } from 'react'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import CustomCard from '../component/dogCard.js'
import Axios from 'axios'
import Row from 'react-bootstrap/Row'

import deleteDogs from '../images/deleteDogs.png'
import dogdefault from '../images/dog01.jpg'

export default function DeleteDogs() {
    /**
     * @constant dogData
     * @description Data for storing all the relevant dogs records.
     * @type {Array}
     */
    const [dogData, setDogData] = useState({})

    // Use to set the state to empty.
    const initialState = {}

    const [data, setData] = useState({ id: "", name: "", age: "", sex: "", breed: "", location: "", image: "" })

    // API Path
    const url = "http://localhost:4000/dog/" + data.id
    const urlTwo = "http://localhost:4000/worker/dog/" + data.id

    // Get the token stored in the browser local storage.
    const tokenTwo = 'Bearer ' + localStorage.getItem('accessToken')
    const headerTwo = {
        'Authorization': tokenTwo
    }

    /**
     * @function submit
     * @description Submits the form and call the targeted API, then handles the data sent from the server. 
     * This is used to get the single dog record by calling the GET API with the id data.
     * If the record is found the data will be stored in array and display. 
     * If the record is not found then the array will be cleared and alert the not found message.
     * @param {eventObject} e The eventObject.
     * @returns {Object|Status} The rows of dog data retreived from the database or the fail request error status code.
     */
    async function submit(e) {
        try {
            e.preventDefault()
            console.log(headerTwo)
            const res = await Axios.get(urlTwo, {
                id: data.id, headers: headerTwo
            })
            setDogData(res.data)
            if (res.dataTwo !== "undefined") {
                console.log('yes')
            }
        } catch (err) {
            setDogData(initialState)
            alert("The dog record is not found, please re-try.")
        }
    }

    /**
     * @function submitTwo
     * @description Submits the form and call two targeted API, then handles the data sent from the server. 
     * This is used to delete the corrsponding dog record in the database using the id passed by calling the delete API.
     * If the get and delete request did not found any data or error, an error message will be alerted to notify user to re-try.
     * If the requests is successful, then the sucessful message will be alerted.
     * @param {eventObject} e The eventObject.
     * @returns {String|Status} The successful message sent from the server or the fail request error status code.
     */
    function submitTwo(e) {
        e.preventDefault()
        console.log(data.id)
        var deleteError = false
        Axios.delete(url, { id: data.id, headers: headerTwo }).then(res => {
            console.log(data)
            alert(res.data)
            if (res.data !== "undefined") {
                console.log('yes')
            }
        }).catch(function (error) {
            deleteError = true
            alert("The delete did not go through, please re-try.")
        })
        console.log(deleteError)
        if (deleteError === false) {
            Axios.get(urlTwo, {
                id: data.id, headers: headerTwo
            }).then(res => {
                alert("The delete of the dog record is sucessful!")
                if (res.data !== "undefined") {
                    console.log('yes')
                }
            }).catch(function (error) {
                setDogData(initialState)
                alert("The dog record is not exist in the database anymore.")
            })
        }
    }

    /**
     * @function handle
     * @description Handles the data inputted in the input fields, and insert the data into a array for storage.
     * @param {Object} e The eventObject.
     * @returns {Object} The inputData array.
     * 
     */
    function handle(e) {
        const inputData = { ...data }
        inputData[e.target.id] = e.target.value
        setData(inputData)
        console.log(inputData)
    }

    return (
        <div style={{ backgroundColor: '#d6d6d6' }}>
            <Card>
                <Card.Img variant="top" src={deleteDogs} width={100} height={250} />
            </Card>
            <br />
            <Card>
                <Card.Body>
                    <Form onSubmit={(e) => submit(e)}>
                        <Form.Group className="mb-3" controlId="formBasicId">
                            <Form.Label>Dog ID</Form.Label>
                            <Form.Control onChange={(e) => handle(e)} id="id" value={data.id} placeholder="Dog ID" type="text" />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Search
                        </Button>
                    </Form>
                    <br />
                    <Row xs={'auto'} className="g-4 justify-content-md-center">
                        {Array.from({ length: dogData.length }).map((_, index) => (
                            <div key={index}>
                                <CustomCard
                                    name={dogData[index]?.name || "Not Available"}
                                    dogImg={dogData[index]?.image || dogdefault}
                                    sex={dogData[index]?.sex || "Not Available"}
                                    age={dogData[index]?.age || "Not Available"}
                                    breed={dogData[index]?.breed || "Not Available"}
                                    location={dogData[index]?.location || "Not Available"}>
                                </CustomCard>
                            </div>
                        ))}
                    </Row>
                    <br /><br /><br />
                    <Form onSubmit={(e) => submitTwo(e)}>
                        <Form.Group className="mb-3" controlId="formBasicId">
                            <Form.Control onClick={(e) => handle(e)} id="id" value={data.id} placeholder="Dog ID" type="hidden" />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Confirm Delete
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    )
}