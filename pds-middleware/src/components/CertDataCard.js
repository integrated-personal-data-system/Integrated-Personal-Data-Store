import React from "react"
import Col from "react-bootstrap/esm/Col"
import Card from "react-bootstrap/esm/Card"

class CertDataCard extends React.Component {

    render() {
        return (
            <Col >
                <Card className="card" border="warning" style={{ width: '15rem', margin: "1rem" }}>
                    <Card.Header>{this.props.header}</Card.Header>

                    <Card.Body>

                        <Card.Text>
                            Self-Signed Cert
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>
        )
    }


}

export default CertDataCard