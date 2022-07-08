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




function ShowCredModal(props) {
    const [show, setShow] = useState(false);
    const [value, setValue] = useState("")


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                View Public Key
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update {props.header}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicText">
                            <Form.Label>New {props.header}</Form.Label>

                        </Form.Group>
                    </Form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

class CertDataCard extends React.Component {

    render() {
        return (
            <Col >
                <Card className="card" border="warning" style={{ width: '15rem', margin: "1rem" }}>
                    <Card.Header>{this.props.header}</Card.Header>

                    <Card.Body>

                        <Card.Text>
                            <ShowCredModal></ShowCredModal>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>
        )
    }


}

export default CertDataCard