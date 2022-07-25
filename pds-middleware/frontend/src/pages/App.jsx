import React from "react";
import Container from "react-bootstrap/Container"
import Navbar from "react-bootstrap/Navbar"
import PersonalDataCard from "../components/data-cards/PersonalDataCard";
import CredentialDataCard from "../components/data-cards/CredentialDataCards";
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import CreateNewDataForm from "../components/data-forms/CreateNewDataForm.jsx";
import readMyData from "../api-functions/my-data/readMyData.jsx";
import readMyCerts from "../api-functions/my-creds/readMyCerts.jsx"
import readMappedAttributes from "../api-functions/my-data/readMappedAttributes.jsx"
import { Navigate } from "react-router-dom"
import AcceptCredentialForm from "../components/data-forms/AcceptCredentialForm.jsx"
import getVerifiableCredentials from "../api-functions/my-wallet/getVerifiableCredentials.jsx"
import Alert from "react-bootstrap/Alert"


import '../css/App.css'


class App extends React.Component {
    constructor(props) {
        super(props);
        let personIRI = sessionStorage.getItem('personIRI')
        let walletId = JSON.parse(sessionStorage.getItem('walletId'))

        this.state = {
            showing: "",
            myData: "secondary",
            credentials: "secondary",
            toggleAddData: false,
            toggleAddKeyPair: false,
            person: personIRI,
            mydata: [],
            mappedAttributes: [],
            walletId: walletId[0],
            credentialsInWallet: []
        }

        this.renderPersonalData = this.renderPersonalData.bind(this)
        this.renderHandler = this.renderHandler.bind(this)
        this.refreshData = this.refreshData.bind(this)
        this.isStateSet = this.isStateSet.bind(this)
        this.renderCredentials = this.renderCredentials.bind(this)
    }

    /**
     * When all the components mount into the DOM, send a query to the database
     * to get all the user's data. Sets the state to an array of user's data. 
     * @CR
     */
    async componentDidMount() {
        let myDataArray = await readMyData()
        let mappedAttributesArray = await readMappedAttributes()
        let credentialsInWallet = await getVerifiableCredentials(this.state.walletId)
        this.setState({ mydata: myDataArray, mappedAttributes: mappedAttributesArray, credentialsInWallet: credentialsInWallet })
    }

    isStateSet() {
        if (this.state.person === null || this.state.walletId == null) {
            return < Navigate to="/" />
        } else {
            return ""
        }
    }


    async refreshData() {
        this.setState({ mydata: [] })
        let myDataArray = await readMyData()
        this.setState({ mydata: myDataArray })
    }

    /**
     * Renders all the elements in this.state.mydata as personal Information Cards
     * @CR
     */
    renderPersonalData() {
        let personalInformation = []
        for (let item of this.state.mydata) {
            if (Object.keys(item)[0] !== "Person") {
                personalInformation.push(
                    <PersonalDataCard
                        key={item.data.attribute + item.data.value}
                        person={this.state.person}
                        header={item.data.attribute}
                        value={item.data.value}
                        keyPairName={item.keyPairName}
                        signature={item.signature}
                        refreshData={this.refreshData}>
                    </PersonalDataCard>)
            }
        }
        return personalInformation
    }

    /**
     * Renders all the elements in this.state.Cert as Cert Data Cards
     * @CR
     */
    renderCredentials() {
        let credentials = []
        for (let credential of this.state.credentialsInWallet) {
            let parsedSchema = credential.schemaId.match(/(?<=\:[0-9]\:)(.*?)(?=\:)/g)
            credentials.push(<CredentialDataCard
                key={credential.credentialId}
                header={credential.schemaId}
                credentials={credential.values}
                credentialId={credential.credentialId}
                state={credential.state}
                schemaId={parsedSchema[0]}
                issuedAtDate={credential.issuedAtUtc}
                acceptedAtDate={credential.acceptedAtUtc}
            ></CredentialDataCard>)
        }
        return credentials
    }



    /**
     * Renders the Data cards or Credentials Cards depending on this.state.showing.
     * @returns My Data or Credentials
     */
    renderHandler() {
        if (this.state.showing === "my-data") {
            return (<Row>
                <Col>
                    <div className="data-box">
                        <Container >
                            <Button onClick={() => {
                                if (!this.state.toggleAddData) {
                                    this.setState({ toggleAddData: true })
                                } else {
                                    this.setState({ toggleAddData: false })
                                }
                            }}
                                variant="success"
                                style={{ margin: ".5rem" }}>Add Data +</Button>
                            <Button onClick={async () => {
                                this.setState({ mydata: [] })
                                let myDataArray = await readMyData()
                                this.setState({ mydata: myDataArray })
                            }}
                                variant="warning"
                                style={{ margin: ".5rem" }}>Refresh</Button>


                            <CreateNewDataForm
                                person={this.state.person}
                                toggleAddData={this.state.toggleAddData}
                                credentials={this.state.credentialsInWallet}
                                attributes={this.state.mappedAttributes}
                                refreshData={this.refreshData}
                            >

                            </CreateNewDataForm>

                            <Row >
                                {this.renderPersonalData()}
                            </Row>
                        </Container>
                    </div>
                </Col>
            </Row >)
        } else if (this.state.showing === "credentials") {
            return (<Row>
                <Col>
                    <div className="data-box">

                        <Container >
                            <Button onClick={() => {
                                if (!this.state.toggleAddKeyPair) {
                                    this.setState({ toggleAddKeyPair: true })
                                } else {
                                    this.setState({ toggleAddKeyPair: false })
                                }
                            }}
                                variant="success"
                                style={{ margin: ".5rem" }}>Accept New Credentials +</Button>
                            <Button onClick={async () => {
                                this.setState({ mycerts: [] })
                                let myCertsArray = await readMyCerts()
                                this.setState({ mycerts: myCertsArray })
                            }}
                                variant="warning"
                                style={{ margin: ".5rem" }}>Refresh</Button>


                            <AcceptCredentialForm
                                person={this.state.person}
                                walletId={this.state.walletId}
                                toggleAddKeyPair={this.state.toggleAddKeyPair}>
                            </AcceptCredentialForm>
                            <Row >
                                {this.renderCredentials()}
                            </Row>
                        </Container>
                    </div>
                </Col>
            </Row>)
        } else {
            return (<Row>
                <Col>
                    <div className="data-box">
                        Select a tab
                    </div>
                </Col>
            </Row>)
        }
    }


    render() {
        return (
            <>
                {this.isStateSet()}
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
                <Container style={{ padding: "2rem" }} fluid="md">
                    <Alert key={this.state.person} variant='info'>
                        Person IRI: {this.state.person}
                    </Alert>
                    <Alert key={this.state.walletID} variant='info'>
                        Wallet ID: {this.state.walletId}
                    </Alert>

                    <Container style={{ padding: ".5rem" }}>
                        <Button id="creds-btn"
                            variant={this.state.credentials}
                            onClick={() => this.setState({ showing: "credentials", myData: "secondary", credentials: "primary" })}>Verifiable Credentials</Button>{' '}
                        <Button id="my-data-btn"
                            variant={this.state.myData}
                            onClick={() => this.setState({ showing: "my-data", myData: "primary", credentials: "secondary" })}>My Data</Button>{' '}

                    </Container>
                    {this.renderHandler()}
                </Container>
            </ >
        );
    }
}



export default App