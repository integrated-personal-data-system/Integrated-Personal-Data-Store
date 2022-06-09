import * as React from "react";
import Container from "react-bootstrap/Container"
import Navbar from "react-bootstrap/Navbar"
import './css/App.css'
import PersonalDataCard from "./components/PersonalDataCard";
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"


class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
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
    }

    renderPersonalData() {
        let personalInformation = []
        for (let item in this.state) {
            personalInformation.push(<PersonalDataCard header={item} value={this.state[item]}></PersonalDataCard>)
        }
        return personalInformation
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
                <Container fluid>
                    <Row>
                        <Col md={2} className="data-nav">
                            <Button size="lg" variant="info">Personal Info</Button>{' '}
                            <Button size="lg" variant="info">Credentials</Button>{' '}
                        </Col>
                        <Col md="auto">
                            <div className="card-box">
                                <Container >
                                    <Row >
                                        {this.renderPersonalData()}
                                    </Row>
                                </Container>
                            </div>
                        </Col>
                    </Row>
                </Container>



            </div >
        );
    }
}



export default App