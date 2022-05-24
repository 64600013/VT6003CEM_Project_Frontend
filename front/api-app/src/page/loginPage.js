import React, { useEffect, useState } from 'react'
// custom components
import CustomTwo from '../component/custom_card.js';
// bootstrap components
import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import Container from 'react-bootstrap/Container';
// import CardGroup from 'react-bootstrap/CardGroup';
//import Form from 'react-bootstrap/Form';
//import Button from 'react-bootstrap/Button';
//import Card from 'react-bootstrap/Card';
// image
import dogdefault from '../images/dog01.jpg';
//import doglist from '../images/doglist.png';

import Axios from 'axios';

export default function LoginPage() {
    const [dogDataList, setDogDataList] = useState({})
    const token = 'Bearer ' + localStorage.getItem('accessToken') 
    console.log(token)
    const header = {
        'Authorization': token
    } 
    
    useEffect(() => {
        Axios.get('http://localhost:5000/worker/dog', {headers: header}).then(res => {
                setDogDataList(res.data)
            }).catch(err => {
                console.log(err)
            })
    }, [])

    

    return (
        <div style={{backgroundColor: '#d6d6d6'}}>
            <Row xs={'auto'} md={'auto'} className="g-4 justify-content-md-center">
                {Array.from({ length: dogDataList.length }).map((_, index) => (
                    <div key={index}>
                        <CustomTwo
                            dogImg={dogDataList[index]?.image || dogdefault}
                            name={dogDataList[index]?.name || "Not Available"}
                            sex={dogDataList[index]?.sex || "Not Available"}
                            age={dogDataList[index]?.age || "Not Available"}
                            breed={dogDataList[index]?.breed || "Not Available"}>
                        </CustomTwo>
                        
                    </div>
                ))}
            </Row>
            
        </div>
    )
}
