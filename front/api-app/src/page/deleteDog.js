import React, { useState } from 'react'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import CustomCard from '../component/custom_card.js'
import Axios from 'axios'

import Row from 'react-bootstrap/Row'
import dogdefault from '../images/dog01.jpg'

export default function DeleteDogs() {
    const [dogDataList, setDogDataList] = useState({})
    const [data, setData] = useState({id: "", name: "", age: "", sex: "", breed: "", location:"", image: ""})
    const url = "http://localhost:4000/dog/" + data.id
    const urlTwo = "http://localhost:4000/worker/dog/" + data.id

    const tokenTwo = 'Bearer ' + localStorage.getItem('accessToken') 
    //console.log(token)
    const headerTwo = {
        'Authorization': tokenTwo
    } 

    function submit(e){
        e.preventDefault()
        console.log(headerTwo)
        Axios.get(urlTwo,{ id: data.id, headers: headerTwo
        }).then(res => {
            console.log(res.dataTwo)
            setDogDataList(res.data)
            if (res.dataTwo !== "undefined"){ 
                console.log('yes')
            }
        })
        
    }

    function submitTwo(e){
        e.preventDefault()
        console.log(data.id)
        Axios.delete(url,{id: data.id, headers: headerTwo}).then(res => {
            //setData(res.data)
            console.log(data)
            alert(res.data)
            if (res.data !== "undefined"){ 
                console.log('yes')
            }
        })
        Axios.get(urlTwo,{ id: data.id, headers: headerTwo
        }).then(res => {
            console.log(res.data)
            setDogDataList(res.data)
            if (res.dataTwo !== "undefined"){ 
                console.log('yes')
            }
        })
    }

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