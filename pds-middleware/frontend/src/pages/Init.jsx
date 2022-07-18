import React from "react";
import Container from "react-bootstrap/Container"
import Navbar from "react-bootstrap/Navbar"
import '../css/App.css'
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Spinner from 'react-bootstrap/Spinner';


class Init extends React.Component {
    constructor(props) {
        super(props);


    }

    initWallet() {
        setTimeout('', 5000);

    }

    render() {
        return (
            <div className="App" >
                <Navbar expand="lg" bg="primary" variant="dark" >
                    <Container className="navbar-top">
                        <Navbar.Brand href="#home">My Data</Navbar.Brand>
                        <Navbar.Toggle />
                        <Navbar.Collapse className="justify-content-end">
                            <Navbar.Text>
                                Powered By: <a href="https://github.com/I-AM-project">IAM Project</a>
                            </Navbar.Text>

                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                <Container style={{ padding: "2rem" }} fluid>
                    <Container className="data-box align-items-center justify-content-center" style={{ padding: ".5rem" }}>
                        <Row>
                            <Col>
                                <h1> Powering On Wallet</h1>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Spinner animation="grow" variant="primary" />
                                <Spinner animation="grow" variant="secondary" />
                                <Spinner animation="grow" variant="success" />
                                <Spinner animation="grow" variant="danger" />
                                <Spinner animation="grow" variant="warning" />
                                <Spinner animation="grow" variant="info" />
                                <Spinner animation="grow" variant="dark" />
                            </Col>
                        </Row>
                    </Container>
                </Container>
            </div >
        );
    }
}




export default Init