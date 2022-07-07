import React from "react";
import Container from "react-bootstrap/Container"
import Navbar from "react-bootstrap/Navbar"
import './css/App.css'
import PersonalDataCard from "./components/data-cards/PersonalDataCard";
import CertDataCard from "./components/data-cards/CertDataCard";
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import CreateNewDataForm from "./components/data-forms/CreateNewDataForm";
import readMyData from "./server-request-functions/my-data/readMyData";
import readMyCerts from "./server-request-functions/my-creds/readMyCerts"

import CreateNewKeyPairForm from "./components/data-forms/CreateNewKeyPairForm"


class App extends React.Component {
    constructor(props) {
        super(props);


        this.state = {
            showing: "",
            myData: "secondary",
            creds: "secondary",
            toggleAddData: false,
            toggleAddKeyPair: false,
            person: "",
            mydata: [],
            mycerts: []
        }

        this.renderCerts = this.renderCerts.bind(this)
        this.renderPersonalData = this.renderPersonalData.bind(this)
        this.renderDataOrCreds = this.renderDataOrCreds.bind(this)
    }

    /**
     * When all the components mount into the DOM, send a query to the database
     * to get all the user's data. Sets the state to an array of user's data. 
     * @CR
     */
    async componentDidMount() {
        let myDataArray = await readMyData()
        let myCertsArray = await readMyCerts()

        let person = ""
        for (let item of myDataArray) {
            if (Object.keys(item)[0] === "Person") {
                person = item[Object.keys(item)]
            }
        }
        this.setState({ mydata: myDataArray, person: person, mycerts: myCertsArray })
    }

    /**
     * Renders all the elements in this.state.mydata as personal Information Cards
     * @CR
     */
    renderPersonalData() {
        let personalInformation = []
        for (let item of this.state.mydata) {
            if (Object.keys(item)[0] !== "Person") {
                personalInformation.push(<PersonalDataCard key={item[Object.keys(item)] + Object.keys(item)} person={this.state.person} header={Object.keys(item)[0]} value={item[Object.keys(item)]}></PersonalDataCard>)
            }
        }
        return personalInformation
    }

    /**
     * Renders all the elements in this.state.Cert as Cert Data Cards
     * @CR
     */
    renderCerts() {
        let certInformation = []
        for (let cert of this.state.mycerts) {
            certInformation.push(<CertDataCard key={cert.keyPairName} header={cert.keyPairName}></CertDataCard>)
        }
        return certInformation
    }

    /**
     * Renders the Data cards or Credentials Cards depending on this.state.showing.
     * @returns My Data or Credentials
     */
    renderDataOrCreds() {
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


                            <CreateNewDataForm person={this.state.person} toggleAddData={this.state.toggleAddData}></CreateNewDataForm>

                            <Row >
                                {this.renderPersonalData()}
                            </Row>
                        </Container>
                    </div>
                </Col>
            </Row >)
        } else if (this.state.showing === "creds") {
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
                                style={{ margin: ".5rem" }}>Add Key Pair +</Button>
                            <Button onClick={async () => {
                                this.setState({ mycerts: [] })
                                let myCertsArray = await readMyCerts()
                                this.setState({ mycerts: myCertsArray })
                            }}
                                variant="warning"
                                style={{ margin: ".5rem" }}>Refresh</Button>


                            <CreateNewKeyPairForm person={this.state.person} toggleAddKeyPair={this.state.toggleAddKeyPair}></CreateNewKeyPairForm>

                            <Row >
                                {this.renderCerts()}
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
                <Container style={{ padding: "2rem" }} fluid="md">
                    <Container style={{ padding: ".5rem" }}>
                        <Button id="my-data-btn"
                            variant={this.state.myData}
                            onClick={() => this.setState({ showing: "my-data", myData: "primary", creds: "secondary" })}>My Data</Button>{' '}
                        <Button id="creds-btn"
                            variant={this.state.creds}
                            onClick={() => this.setState({ showing: "creds", myData: "secondary", creds: "primary" })}>Credentials</Button>{' '}
                    </Container>
                    {this.renderDataOrCreds()}
                </Container>
            </div >
        );
    }
}



export default App