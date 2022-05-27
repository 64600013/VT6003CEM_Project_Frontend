import React, { useState} from 'react'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import CustomCard from '../component/custom_card.js'
import Row from 'react-bootstrap/Row'
import Axios from 'axios'

import dogdefault from '../images/dog01.jpg'

export default function SearchDogs() {
    const [dogDataList, setDogDataList] = useState({})
    const [data, setData] = useState({ breed: "", location:""})
    const url = "http://localhost:4000/dog/breed/" + data.breed
    const urlTwo = "http://localhost:4000/dog/age/" + data.age
    const urlThree = "http://localhost:4000/dog/location/" + data.location

    /**
     * @function sds
     * Submits the form and call the targeted API, then handles the data sent from the server.
     * @param {eventObject} e The eventObject.
     * @returns {Object} The rows of dog data retreived from the database.
     */
    function submit(e){
        e.preventDefault()
        Axios.get(url,{ breed: data.breed
        }).then(res => {
            setDogDataList(res.data)
            if (res.data !== "undefined"){ 
                console.log('yes')
            }
        }) 
    }
    function submitTwo(e){
        e.preventDefault()
        Axios.get(urlTwo,{ age: data.age
        }).then(res => {
            setDogDataList(res.data)
            if (res.data !== "undefined"){ 
                console.log('yes')
            }
        }) 
    }
    function submitThree(e){
        e.preventDefault()
        Axios.get(urlThree,{ location: data.location
        }).then(res => {
            setDogDataList(res.data)
            if (res.data !== "undefined"){ 
                console.log('yes')
            }
        }) 
    }

    
    /**
     * Handles the data inputted in the input fields, and insert the data into a array for storage.
     * @param {Object} e The eventObject.
     * @returns {Object} setData.
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
                    <Row xs={'auto'} className="g-4 justify-content-md-center">
                        {Array.from({ length: dogDataList.length }).map((_, index) => (
                            <div key={index}> 
                                <CustomCard
                                    name={dogDataList[index]?.name || "Not Available"}
                                    dogImg={dogDataList[index]?.image || dogdefault}
                                    sex={dogDataList[index]?.sex || "Not Available"}
                                    age={dogDataList[index]?.age || "Not Available"}
                                    breed={dogDataList[index]?.breed || "Not Available"}
                                    location={dogDataList[index]?.location || "Not Available"}>
                                </CustomCard>
                            </div>
                        ))}
                    </Row>
                    <br/><br/><br/>
                    
                </Card.Body>
            </Card>
        </div>
    )
}