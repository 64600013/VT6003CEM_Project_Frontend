import React, { useState } from 'react'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import CustomCard from '../component/custom_card.js'
import Axios from 'axios'
import Row from 'react-bootstrap/Row'

import deleteDogs from '../images/deleteDogs.png'
import dogdefault from '../images/dog01.jpg'

export default function DeleteDogs() {
    const [dogDataList, setDogDataList] = useState({})

    // Use to set the state to empty.
    const initialState = {}

    const [data, setData] = useState({id: "", name: "", age: "", sex: "", breed: "", location:"", image: ""})
    const url = "http://localhost:4000/dog/" + data.id
    const urlTwo = "http://localhost:4000/worker/dog/" + data.id

    // Set token
    const tokenTwo = 'Bearer ' + localStorage.getItem('accessToken') 
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
        console.log(headerTwo)
        Axios.get(urlTwo,{ id: data.id, headers: headerTwo
        }).then(res => {
            setDogDataList(res.data)
            if (res.dataTwo !== "undefined"){ 
                console.log('yes')
            }
        }).catch( function (error) {
            setDogDataList(initialState)
            alert("The dog record is not found, please re-try.")          
        })
    }

    /**
     * @function submitTwo
     * @description Submits the form and call two targeted API, then handles the data sent from the server. 
     * If the the get and delete function received a error status code, then the process will stop alert the user if the request is not successful.
     * If not then alert the user if the request is successful.
     * @param {eventObject} e The eventObject.
     * @returns {String|Status} The successful message sent from the server or the fail request error status code.
     */
    function submitTwo(e){
        e.preventDefault()
        console.log(data.id)
        var deleteError = false
        Axios.delete(url,{id: data.id, headers: headerTwo}).then(res => {
            console.log(data)
            alert(res.data)
            if (res.data !== "undefined"){ 
                console.log('yes')
            }
        }).catch( function (error) {
            deleteError = true
            alert("The delete did not go through, please re-try.")          
        })
        console.log(deleteError)
        if(deleteError === false){
            Axios.get(urlTwo,{ id: data.id, headers: headerTwo
            }).then(res => {
                alert("The delete of the dog record is sucessful!")
                if (res.data !== "undefined"){ 
                    console.log('yes')
                }
            }).catch( function (error) {
                setDogDataList(initialState)
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
    function handle(e){
        const inputData={...data}
        inputData[e.target.id] = e.target.value
        setData(inputData)
        console.log(inputData)
    }

    return (
        <div style={{backgroundColor: '#d6d6d6'}}>
            <Card>
                <Card.Img variant="top" src={deleteDogs} width={100} height={250} />
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
                    <Form onSubmit={(e)=>submitTwo(e)}>
                        <Form.Group className="mb-3" controlId="formBasicId">
                            <Form.Control onClick={(e)=>handle(e)} id="id" value={data.id} placeholder="Dog ID" type="hidden" />
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