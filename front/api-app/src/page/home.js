import React, { useEffect, useState } from 'react'
import CustomCard from '../component/custom_card.js'
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'
import axios from 'axios'

import dogdefault from '../images/dog01.jpg'
import doglist from '../images/doglist.png'


export default function Home() {
    const [dogDataList, setDogDataList] = useState({})
    const url = 'http://localhost:4000/dog'

    // Load all dog record once the page is loading
    useEffect(() => {
        axios.get(url)
            .then(res => {
                setDogDataList(res.data)
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
            </div>
            <br />
            <br />
            <br />
        </>
    )
}