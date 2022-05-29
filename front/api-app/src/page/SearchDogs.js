import React, { useState} from 'react'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import DogCard from '../component/dogCard.js'
import Row from 'react-bootstrap/Row'
import Axios from 'axios'

import dogdefault from '../images/dog01.jpg'
import searchDogs from '../images/searchDogs.png'

export default function SearchDogs() {
    /**
     * @constant dogData 
     * @description Data for storing all the relevant dogs records.
     * @type {Array}
     */
    const [dogData, setDogData] = useState({})

    /**
     * @constant data 
     * @description Data needed for filtering results.
     * @type {Array}
     */
    const [data, setData] = useState({ breed: "", location:""})

    // Use to set the state to empty.
    const initialState = {}

    // API Path
    const url = "http://localhost:4000/dog/breed/" + data.breed
    const urlTwo = "http://localhost:4000/dog/age/" + data.age
    const urlThree = "http://localhost:4000/dog/location/" + data.location

    /**
     * @function submit
     * @description Submits the form and call the targeted API, then handles the data sent from the server.
     * This is used to fetch the dog data by calling the GET API using the breed data. 
     * If the request is sucessful, the dog record will be stored in the array.
     * If the request failed, the error message will be alerted to notify users and clear the dog record array to make sure it is empty.
     * @param {eventObject} e The eventObject.
     * @returns {Object|Status} The rows of dog data retreived from the database or the fail request error status code.
     */
    function submit(e){
        e.preventDefault()
        Axios.get(url,{ breed: data.breed
        }).then(res => {
            setDogData(res.data)
            if (res.data !== "undefined"){ 
                console.log('yes')
            }
        }).catch( function (error) {
            setDogData(initialState)
            alert("The dog record is not found, please re-try.")          
        })  
    }

    /**
     * @function submitTwo
     * @description Submits the form and call the targeted API, then handles the data sent from the server.
     * This is used to fetch the dog data by calling the GET API using the age data. 
     * If the request is sucessful, the dog record will be stored in the array.
     * If the request failed, the error message will be alerted to notify users and clear the dog record array to make sure it is empty.
     * @param {eventObject} e The eventObject.
     * @returns {Object|Status} The rows of dog data retreived from the database or the fail request error status code.
     */
    function submitTwo(e){
        e.preventDefault()
        Axios.get(urlTwo,{ age: data.age
        }).then(res => {
            setDogData(res.data)
            if (res.data !== "undefined"){ 
                console.log('yes')
            }
        }).catch( function (error) {
            setDogData(initialState)
            alert("The dog record is not found, please re-try.")          
        }) 
    }

    /**
     * @function submitThree
     * @description Submits the form and call the targeted API, then handles the data sent from the server.
     * This is used to fetch the dog data by calling the GET API using the location data. 
     * If the request is sucessful, the dog record will be stored in the array.
     * If the request failed, the error message will be alerted to notify users and clear the dog record array to make sure it is empty.
     * @param {eventObject} e The eventObject.
     * @returns {Object|Status} The rows of dog data retreived from the database or the fail request error status code.
     */
    function submitThree(e){
        e.preventDefault()
        Axios.get(urlThree,{ location: data.location
        }).then(res => {
            setDogData(res.data)
            if (res.data !== "undefined"){ 
                console.log('yes')
            }
        }).catch( function (error) {
            setDogData(initialState)
            alert("The dog record is not found, please re-try.")          
        })  
    }

    /**
     * @function submitFour
     * @description Clear the search result form the page for the user.
     * This is used to clear the DogData array to be completely empty, in order to refresh the search result.
     * @param {eventObject} e The eventObject.
     * 
     */
     function submitFour(e){
        e.preventDefault()
        setDogData(initialState)
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
                <Card.Img variant="top" src={searchDogs} width={100} height={250} />
            </Card>
            <br />
            <Card>
                <Card.Body>
                    <Form onSubmit={(e)=>submit(e)}>
                        <Form.Group className="mb-3" controlId="formBasicBreed">
                            <Form.Label>Dog Breed</Form.Label>
                            <Form.Control onChange={(e)=>handle(e)} id="breed" defaultValue={data.breed} placeholder="Dog Breed" type="text" />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Search
                        </Button>
                    </Form>
                    <Form onSubmit={(e)=>submitTwo(e)}>
                        <Form.Group className="mb-3" controlId="formBasicAge">
                            <Form.Label>Dog Age</Form.Label>
                            <Form.Control onChange={(e)=>handle(e)} id="age" defaultValue={data.age} placeholder="Dog Age" type="text" />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Search
                        </Button>
                    </Form>
                    <Form onSubmit={(e)=>submitThree(e)}>
                        <Form.Group className="mb-3" controlId="formBasicLocation">
                            <Form.Label>Dog Location</Form.Label>
                            <Form.Control onChange={(e)=>handle(e)} id="location" defaultValue={data.location} placeholder="Dog Location" type="text" />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Search
                        </Button>
                    </Form>
                    <br/>
                    <Form onSubmit={(e)=>submitFour(e)}>
                        <Button variant="primary" type="submit">
                            Clear Search
                        </Button>
                    </Form>
                    <br/>
                    <Row xs={'auto'} className="g-4 justify-content-md-center">
                        {Array.from({ length: dogData.length }).map((_, index) => (
                            <div key={index}> 
                                {
                                    /* Import and used the dogCard component. */
                                    /* Using the data retrived to display it on the page. */
                                    /* If any of the column in the data is missing, then it will be replaced with a default value. */
                                }
                                <DogCard
                                    name={dogData[index]?.name || "Not Available"}
                                    dogImg={dogData[index]?.image || dogdefault}
                                    sex={dogData[index]?.sex || "Not Available"}
                                    age={dogData[index]?.age || "Not Available"}
                                    breed={dogData[index]?.breed || "Not Available"}
                                    location={dogData[index]?.location || "Not Available"}>
                                </DogCard>
                            </div>
                        ))}
                    </Row>
                    <br/><br/><br/>
                    
                </Card.Body>
            </Card>
        </div>
    )
}