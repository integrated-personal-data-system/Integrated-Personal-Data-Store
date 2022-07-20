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

        // let certs = await readMyCerts()

        if (personIRI.value == null) {
            let newUser = await createNewUser()

        }
        console.log(personIRI)
        this.setState({ personIRI: personIRI.value })
        // if (certs.length == 0) {
        //     console.log(this.state)
        //     let keyPairs = await createNewRSAKeys(this.state.personIRI, "Self-Cert", personIRI) // Need to make this passphrase more secure 
        //     this.setState({ keyPairs: keyPairs })
        // } else {
        //     this.setState({ keyPairs: certs })
        // }


    }


    loadingWallet() {
        if (this.state.personIRI == "") {
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
                    <p> Wallet ID: {this.state.walletIdI}</p>

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
                <Navbar expand="lg" style={{backgroundColor: "#D9F7FA"}} >
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
                    <Container className="data-box align-items-center justify-content-center" style={{ padding: ".5rem"}}>
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