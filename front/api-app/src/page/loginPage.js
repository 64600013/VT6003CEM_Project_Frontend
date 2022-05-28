import React, { useEffect, useState } from 'react'
import CustomTwo from '../component/custom_card.js'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import Axios from 'axios'

import employee from '../images/employee.png'
import dogdefault from '../images/dog01.jpg'

export default function LoginPage() {
    const [dogDataList, setDogDataList] = useState({})
    const url = 'http://localhost:4000/worker/dog'

    // Set token
    const token = 'Bearer ' + localStorage.getItem('accessToken') 
    console.log(token)
    const header = {
        'Authorization': token
    } 
    
    // Load all dog data upon loading the page
    useEffect( () => {
            Axios.get(url, {headers: header}).then(res => {
                setDogDataList(res.data)
            }).catch(err => {
                window.location.href="/" 
                console.log(err)
            })
    }, [])

    

    return (
        <div style={{backgroundColor: '#d6d6d6', justifyContent:'center'}}>
            <Card>
                <Card.Img variant="top" src={employee} width={100} height={250} />
            </Card>
            <br/>
            <>
                <span>&nbsp;&nbsp;</span><Button href="/checkDogs">Check Dogs</Button> 
                <span>&nbsp;&nbsp;</span><Button href="/deleteDogs">Delete Dogs</Button> 
                <span>&nbsp;&nbsp;</span><Button href="/addDogs">Add Dogs</Button> 
            </>
            <br/><br/>
            <Row xs={'auto'} md={'auto'} className="g-4 justify-content-md-center">
                {Array.from({ length: dogDataList.length }).map((_, index) => (
                    <div key={index}>
                        <CustomTwo
                            dogImg={dogDataList[index]?.image || dogdefault}
                            name={dogDataList[index]?.name || "Not Available"}
                            sex={dogDataList[index]?.sex || "Not Available"}
                            age={dogDataList[index]?.age || "Not Available"}
                            breed={dogDataList[index]?.breed || "Not Available"}
                            location={dogDataList[index]?.location || "Not Available"}>
                        </CustomTwo>
                    </div>
                ))}
            </Row>
            
        </div>
    )
}
