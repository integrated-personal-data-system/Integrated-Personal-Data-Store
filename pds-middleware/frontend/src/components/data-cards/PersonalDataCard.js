import React, { useState } from "react";
import Card from "react-bootstrap/Card"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import deleteMyData from "../../server-request-functions/deleteMyData";


import "../../css/PersonalDataCard.css"

class PersonalDataCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            show: true
        }
        this.handleClose = this.handleClose.bind(this)
        this.handleShow = this.handleShow.bind(this)
    }

    handleClose() { this.setState({ show: false }) };
    handleShow() { this.setState({ show: true }) };


    render() {
        return (
            <Col >
                <div onClick={() => { this.handleShow() }}>
                    <Card className="card" border="warning" style={{ width: '15rem', margin: "1rem" }}>
                        <Card.Header>{this.props.header}</Card.Header>

                        <Card.Body>
                            <Card.Title>{this.props.value}</Card.Title>
                            <Card.Text>
                                Self-Signed Cert
                            </Card.Text>
                            <Button variant="danger" onClick={() => deleteMyData(this.props.person, this.props.header, this.props.value)} >
                                Delete
                            </Button>
                        </Card.Body>
                    </Card>
                </div>
            </Col >

        )
    }
}

export default PersonalDataCard