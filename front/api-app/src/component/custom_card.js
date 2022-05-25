import React from 'react'
// bootstrap components
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


export default function CustomCard({ dogImg, name, sex, age, breed, location}) {
    
    return (
        
        <Col>
            <Card border="dark">
                <br/>
                <Card.Header className="g-4 justify-content-md-center" >
                    {name}
                </Card.Header>
                <Card.Img variant="top" src={dogImg} width={150} height={300} />
                <Card.Body>
                    <Row>
                        <Col>
                            <Card.Text>
                                Sex: {sex}
                            </Card.Text>
                        </Col>
                        <Col>
                            <Card.Text>
                                Age: {age}
                            </Card.Text>
                        </Col>
                        <Col>
                            <Card.Text>
                                Breed: {breed}
                            </Card.Text>
                            
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Card.Text>
                                Location: {location}
                            </Card.Text>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Col>
    )
}