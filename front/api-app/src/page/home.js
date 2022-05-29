import React, { useEffect, useState } from 'react'
import DogCard from '../component/dogCard.js'
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'
import axios from 'axios'

import dogdefault from '../images/dog01.jpg'
import doglist from '../images/doglist.png'


export default function Home() {
    const [dogData, setDogData] = useState({})

    // API Path
    const url = 'http://localhost:4000/dog'

    // Call the GET dog API once the page is start loading
    // Then set the retrived data into the array for display.
    useEffect(() => {
        axios.get(url)
            .then(res => {
                setDogData(res.data)
            }).catch(err => {
                console.log(err)
            })
    }, [])

    return (
        <>
            <br />
            <div style={{backgroundColor: '#d6d6d6'}}>
                <Card>
                    <Card.Img variant="top" src={doglist} width={100} height={250} />
                </Card>
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
            </div>
            <br />
            <br />
            <br />
        </>
    )
}