import React, { useEffect, useState } from 'react'
// custom components
import CustomCard from '../component/custom_card.js';
// bootstrap components
import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import Container from 'react-bootstrap/Container';
// import CardGroup from 'react-bootstrap/CardGroup';
 import Card from 'react-bootstrap/Card';
// image
import dogdefault from '../images/dog01.jpg';
import doglist from '../images/doglist.png';

import axios from 'axios';

export default function Home() {
    const [dogDataList, setDogDataList] = useState({})

    useEffect(() => {
        axios.get('http://localhost:5000/dog')
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
                    <Card.Img variant="top" src={doglist} width={100} height={200} />
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
                                breed={dogDataList[index]?.breed || "Not Available"}>
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