import React from 'react'
// bootstrap components
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function CustomCardTwo({ dogImg, name, sex, age, breed}) {
    return (
        <Col>
            <Card border="dark">
                <Card.Img variant="top" src={dogImg} width={480} height={270} />
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <br />
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
                </Card.Body>
            </Card>
        </Col>
    )
}