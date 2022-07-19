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
import Alert from "react-bootstrap/Alert"
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
        // console.log(personIRI)

        // Gets the KeyPairs, Returns Null if there is no Key Pairs
        let keyPairs = await readMyCerts()

        // Gets the WalletId, Returns Null if there is no Key Pairs
        let walletID = await getWalletID()

        if (personIRI == null) {
            personIRI = await createNewUser()
        }

        if (keyPairs == null) {
            let newKeyPair = await createNewRSAKeys(personIRI, "Self-Cert", personIRI) // Need to make this passphrase more secure 
            keyPairs = newKeyPair
        }

        if (walletID == null) {
            let newWallet = await createNewWallet(personIRI)
            walletID = newWallet.value
        }

        this.setState({ personIRI: personIRI, keyPairs: keyPairs, walletID: walletID })
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
                        <Alert key={this.state.keyPairs} variant='info'>
                            Keypair ID: {this.state.keyPairs}
                        </Alert>
                        <Alert key={this.state.walletID} variant='info'>
                            Wallet ID: {this.state.walletID}
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