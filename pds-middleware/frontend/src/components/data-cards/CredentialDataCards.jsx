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
import ListGroup from 'react-bootstrap/ListGroup';
import groupIcon from "../../assets/groupIcon.png"

function ShowCredModal(props) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const renderCredentialValues = (credentials) => {
        let valuesInCredential = []
        for (let credential in credentials) {
            valuesInCredential.push(
                <ListGroup.Item>
                    <p> {credential}</p>
                    <p>{credentials[credential]}</p>
                </ListGroup.Item>

            )
        }
        return valuesInCredential
    }

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                View Credential
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{props.schemaId}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicText">
                            <Form.Label>Credential ID:  {props.credentialId}</Form.Label>
                            <Form.Label>State:  {props.state}</Form.Label>
                        </Form.Group>
                    </Form>
                    <ListGroup>
                        {renderCredentialValues(props.credentials)}
                    </ListGroup>
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

class CredentialDataCard extends React.Component {
    render() {
        return (
            <Col >
                <Card className="card text-center" border="warning" style={{ width: '15rem', margin: "1rem" }}>
                    <Card.Img variant="top" src={groupIcon} />
                    <Card.Header>{this.props.schemaId}</Card.Header>

                    <Card.Body>
                        <Card.Text>
                            <ShowCredModal
                                credentials={this.props.credentials}
                                credentialId={this.props.credentialId}
                                state={this.props.state}
                                schemaId={this.props.schemaId}
                            ></ShowCredModal>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>
        )
    }


}

export default CredentialDataCard