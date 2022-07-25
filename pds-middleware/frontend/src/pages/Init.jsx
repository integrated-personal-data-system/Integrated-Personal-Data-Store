import React from "react";
import Container from "react-bootstrap/Container"
import Navbar from "react-bootstrap/Navbar"
import '../css/App.css'
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Spinner from 'react-bootstrap/Spinner';
import getPersonIRI from "../api-functions/my-data/getPersonIRI.jsx";
import createNewUser from "../api-functions/my-data/createNewUser.jsx";
import getWalletID from "../api-functions/my-wallet/getWalletId.jsx";
import createNewWallet from "../api-functions/my-wallet/createWallet.jsx"
import Alert from "react-bootstrap/Alert"
import { Link } from "react-router-dom"


class Init extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            personIRI: "",
            walletId: "",
            keyPairs: ""
        }
        this.loadingWallet = this.loadingWallet.bind(this)
    }

    async componentDidMount() {
        let personIRI = await getPersonIRI()
        let walletId = await getWalletID()

        if (personIRI === null) {
            personIRI = await createNewUser()
        }

        if (walletId === null) {
            let newWallet = await createNewWallet(personIRI)
            walletId = newWallet.value
        }
        sessionStorage.setItem('personIRI', personIRI)
        sessionStorage.setItem('walletId', JSON.stringify(walletId))
        this.setState({ personIRI: personIRI, walletId: walletId })
    }


    loadingWallet() {
        if (this.state.personIRI === "") {
            return (
                <>
                    <Spinner animation="grow" variant="primary" />
                    <Spinner animation="grow" variant="secondary" />
                    <Spinner animation="grow" variant="success" />
                    <Spinner animation="grow" variant="danger" />
                    <Spinner animation="grow" variant="warning" />
                    <Spinner animation="grow" variant="info" />
                    <Spinner animation="grow" variant="dark" />
                </>)
        } else {
            return (
                <Row style={{ margin: "1rem" }}>
                    <Col>
                        <Alert key={this.state.personIRI} variant='info'>
                            Person IRI: {this.state.personIRI}
                        </Alert>
                        <Alert key={this.state.walletID} variant='info'>
                            Wallet ID: {this.state.walletId}
                        </Alert>
                        <Link to={{
                            pathname: "/wallet",
                        }} className="btn btn-warning">Go To Wallet</Link>
                    </Col>
                </Row>
            )
        }
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
                        {this.loadingWallet()}
                    </Container>
                </Container>
            </div >
        );
    }
}




export default Init