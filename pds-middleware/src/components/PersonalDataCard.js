import * as React from "react";
import Card from "react-bootstrap/Card"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"


import "../css/PersonalDataCard.css"

class PersonalDataCard extends React.Component {

    render() {
        return (
            <Col >
                <Card className="card" border="warning" style={{ width: '15rem', margin: "1rem" }}>
                    <Card.Header>{this.props.header}</Card.Header>

                    <Card.Body>
                        <Card.Title>{this.props.value}</Card.Title>
                        <Card.Text>
                            Self-Signed Cert
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>


        )
    }
}

export default PersonalDataCard