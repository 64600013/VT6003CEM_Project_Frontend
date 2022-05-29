import React, { useEffect, useState } from 'react'
import DogCardTwo from '../component/dogCardTwo.js'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import Axios from 'axios'

import employee from '../images/employee.png'
import dogdefault from '../images/dog01.jpg'

export default function LoginPage() {
    const [dogData, setDogData] = useState({})
    const url = 'http://localhost:4000/worker/dog'

    // Get the token stored in the browser local storage.
    const token = 'Bearer ' + localStorage.getItem('accessToken') 
    console.log(token)
    const header = {
        'Authorization': token
    } 
    
    // Call the GET dog API once the page is start loading
    // Then set the retrived data into the array for display.
    useEffect( () => {
            Axios.get(url, {headers: header}).then(res => {
                setDogData(res.data)
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
                {Array.from({ length: dogData.length }).map((_, index) => (
                    <div key={index}>
                        {
                            /* Import and used the dogCardTwo component. */
                            /* Using the data retrived to display it on the page. */
                            /* If any of the column in the data is missing, then it will be replaced with a default value. */
                        }
                        <DogCardTwo
                            dogImg={dogData[index]?.image || dogdefault}
                            name={dogData[index]?.name || "Not Available"}
                            sex={dogData[index]?.sex || "Not Available"}
                            age={dogData[index]?.age || "Not Available"}
                            breed={dogData[index]?.breed || "Not Available"}
                            location={dogData[index]?.location || "Not Available"}>
                        </DogCardTwo>
                    </div>
                ))}
            </Row>
            
        </div>
    )
}
