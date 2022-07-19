import React from "react";
import Container from "react-bootstrap/Container"
import Navbar from "react-bootstrap/Navbar"
import '../css/App.css'
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Spinner from 'react-bootstrap/Spinner';
import readMyCerts from "../api-functions/my-creds/readMyCerts";
import getPersonIRI from "../api-functions/my-data/getPersonIRI";
import createNewUser from "../api-functions/my-data/createNewUser";
import createNewRSAKeys from "../api-functions/my-creds/createNewRSAKey";
import getWalletID from "../api-functions/my-wallet/getWalletID";
import createNewWallet from "../api-functions/my-wallet/createWallet"
import { Link } from "react-router-dom"


class Init extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            personIRI: "",
            walletID: "",
            keyPairs: ""
        }
        this.loadingWallet = this.loadingWallet.bind(this)
    }
    async componentDidMount() {
        // Gets the Person IRI, Returns Null if there is not Person 
        let personIRI = await getPersonIRI()

        // Gets the KeyPairs, Returns Null if there is no Key Pairs
        let keyPairs = await readMyCerts()
        console.log(keyPairs)
        // Gets the WalletId, Returns Null if there is no Key Pairs
        let walletID = await getWalletID()

        if (personIRI.value == null) {
            let newUser = await createNewUser()
            personIRI = newUser
        }

        if (keyPairs == null) {
            let newKeyPair = await createNewRSAKeys(personIRI.value, "Self-Cert", personIRI.value) // Need to make this passphrase more secure 
            keyPairs = newKeyPair
        }

        if (walletID == null) {
            let newWallet = await createNewWallet(personIRI.value)
            walletID = newWallet.value
        }

        this.setState({ personIRI: personIRI.value, keyPairs: keyPairs, walletID: walletID })
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
                <>

                    <p> Person IRI: {this.state.personIRI}</p>
                    <p> Keypair ID: {this.state.keyPairs}</p>
                    <p> Wallet ID: {this.state.walletID}</p>

                    <Link to={{
                        pathname: "/wallet",
                    }} className="btn btn-primary">Go To Wallet</Link>

                </>
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
                        <Row>
                            <Col>
                                {this.loadingWallet()}
                            </Col>
                        </Row>

                    </Container>
                </Container>
            </div >
        );
    }
}




export default Init