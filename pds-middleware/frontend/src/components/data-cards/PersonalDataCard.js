import React, { useState } from "react";
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import deleteMyData from "../../api-functions/my-data/deleteMyData";
import Modal from "react-bootstrap/Modal"
import Form from "react-bootstrap/Form"
import updateMyData from "../../api-functions/my-data/updateMyData";
import Image from "react-bootstrap/Image"
import lock from '../../assets/lock.png';
import Container from "react-bootstrap/Container"
import Col from "react-bootstrap/Col"
import Stack from 'react-bootstrap/Stack';
import Row from "react-bootstrap/Row"


import "../../css/PersonalDataCard.css"

function UpdateModal(props) {
    const [show, setShow] = useState(false);
    const [value, setValue] = useState("")


    const handleChange = (event) => {
        const valueNew = event.target.value;
        setValue(valueNew)
    };

    const handleSave = () => {
        let updateData = {
            person: props.person,
            header: props.header,
            newValue: value
        }
        updateMyData(props.person, props.header, value, props.oldValue)
    }


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="primary" style={{ float: "right" }} onClick={handleShow}>
                Edit
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update {props.header}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicText">
                            <Form.Label>New {props.header}</Form.Label>
                            <Form.Control type="text" placeholder="Enter New Value" onChange={(event) => handleChange(event)} />
                        </Form.Group>
                    </Form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

function ShowSignature(props) {
    const [show, setShow] = useState(false);


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (<>
        <Button variant="light" onClick={handleShow}>
            <Stack direction="horizontal" gap={1}>
                <Image
                    fluid={true}
                    src={lock}
                    style={{ height: "1rem" }}
                ></Image>
                <Card.Subtitle className="text-muted">
                    {props.keyPairName}
                </Card.Subtitle>
            </Stack>
        </Button>


        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Signed By {props.keyPairName} </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Row>
                        <Col>
                            <p class="text-justify">{props.signature}</p>
                        </Col>
                    </Row>
                </Container>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    </>)

}

class PersonalDataCard extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <>
                <Col >
                    <div>
                        <Card className="card" border="warning" style={{ width: '15rem', margin: "1rem" }}>
                            <Card.Header>{this.props.header}</Card.Header>

                            <Card.Body>
                                <Card.Title>{this.props.value}</Card.Title>

                                <ShowSignature keyPairName={this.props.keyPairName} signature={this.props.signature}></ ShowSignature>
                                <Container style={{ marginTop: "1rem" }}>
                                    <Button variant="danger" style={{ float: "left" }} onClick={() => deleteMyData(this.props.person, this.props.header, this.props.value)} >
                                        Delete
                                    </Button>
                                    <UpdateModal person={this.props.person} header={this.props.header} oldValue={this.props.value}></UpdateModal>
                                </Container>

                            </Card.Body>
                        </Card>
                    </div>
                </Col >

            </>


        )
    }
}

export default PersonalDataCard