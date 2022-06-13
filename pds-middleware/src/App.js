import React from "react";
import Container from "react-bootstrap/Container"
import Navbar from "react-bootstrap/Navbar"
import './css/App.css'
import PersonalDataCard from "./components/PersonalDataCard";
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import AddTripleTextArea from "./components/addTripleTextArea";
import readMyData from "./functions/readMyData";


class App extends React.Component {
    constructor(props) {
        super(props);


        this.state = {
            showing: "",
            myData: "secondary",
            creds: "secondary",
            toggleAddData: false,
            mydata: []
        }

        this.myData = {
            firstname: "Jane",
            lastname: "Doe",
            birthdate: "12/31/99",
            mailingstreet: "1234 Walnut St",
            mailingcity: "Springfield",
            mailingstate: "MO",
            mailingcountry: "USA",
            mailingpostcode: 12345,
            email: "janedoe@email.com",
            mobilephonenumber: "617-555-6789",
            homephonenumber: "555-456-7890",
            employeetitle: "Lead Developer",
            employername: "Tech Giant",
            employerindustry: "Financial Planning",
            employerstreet: "12345 Business Parkway Suite 100",
            employercity: "Springfield",
            employerstate: "MO",
            employerpostcode: 14521,
            employercountry: "USA",
            employeremail: "doe.jane@techgiant.org",
            employerphone: "555-222-4321",
            employerfax: "555-999-0987"
        };

        this.renderPersonalData = this.renderPersonalData.bind(this)
        this.renderDataOrCreds = this.renderDataOrCreds.bind(this)
    }

    async componentDidMount() {
        let myDataArray = await readMyData()

        // console.log('my Data Array: ' + myDataArray)

        this.setState({ mydata: myDataArray })
    }

    renderPersonalData() {
        let personalInformation = []
        // console.log(this.state.mydata)
        for (let item of this.state.mydata) {
            personalInformation.push(<PersonalDataCard key={item[Object.keys(item)] + Object.keys(item)} header={Object.keys(item)} value={item[Object.keys(item)]}></PersonalDataCard>)
        }
        return personalInformation
    }

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
                                variant="danger">Add Data +</Button>
                            <AddTripleTextArea toggleAddData={this.state.toggleAddData}></AddTripleTextArea>

                            <Row >
                                {this.renderPersonalData()}
                            </Row>
                        </Container>
                    </div>
                </Col>
            </Row>)
        } else if (this.state.showing === "creds") {
            return (<Row>
                <Col>
                    <div className="data-box">
                        Credentials
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
                            onClick={() => this.setState({ showing: "creds", myData: "secondary", creds: "primary" })}>Credentails</Button>{' '}
                    </Container>

                    {this.renderDataOrCreds()}




                </Container>



            </div >
        );
    }
}



export default App