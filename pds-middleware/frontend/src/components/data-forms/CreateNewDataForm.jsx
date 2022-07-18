import * as React from "react";
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/esm/Container";
import createMyData from "../../api-functions/my-data/createMyData";




class CreateNewDataForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            attribute: "",
            value: "",
            cert: ""
        }
        this.handleToggle = this.handleToggle.bind(this)
        this.getCertList = this.getCertList.bind(this)
        this.getAttributeList = this.getAttributeList.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    getAttributeList() {
        let attrOptions = []
        attrOptions.push(<option>Select An Attribute</option>)
        for (let attribute of this.props.attributes) {
            attrOptions.push(<option value={attribute}>{attribute}</option>)
        }
        return attrOptions
    }

    getCertList() {
        let certOptions = []
        certOptions.push(<option>Select A Cert</option>)
        for (let cert of this.props.certs) {
            certOptions.push(<option value={cert.keyPairName}>{cert.keyPairName}</option>)
        }
        return certOptions
    }

    async handleSubmit() {
        if (this.state.attribute != "Select An Attribute" && this.state.value != "" && this.state.cert != "Select A Cert") {
            createMyData(this.props.person, this.state.attribute, this.state.value, this.state.cert, (data) => {
                this.props.refreshData()
            })

        } else {
            alert("Fill out all the fields")
        }

    }

    handleToggle() {
        if (this.props.toggleAddData) {
            return <Container style={{ padding: "1rem", margin: "1rem", backgroundColor: "white", borderRadius: ".5rem" }}>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicText">
                        <Form.Label>My Data Attribute</Form.Label>
                        <Form.Select onChange={(event) => this.setState({ attribute: event.target.value })} aria-label="Select An Attribute">
                            {this.getAttributeList()}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicText">
                        <Form.Label>Value</Form.Label>
                        <Form.Control type="text" placeholder="Value" onChange={(event) => this.setState({ value: event.target.value })} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicText">
                        <Form.Label>Certificate</Form.Label>
                        <Form.Select onChange={(event) => this.setState({ cert: event.target.value })} aria-label="Select A Cert">
                            {this.getCertList()}
                        </Form.Select>
                    </Form.Group>


                    <Button variant="primary" onClick={() => this.handleSubmit()} >
                        Save
                    </Button>
                </Form>
            </Container >
        } else {
            return ""
        }

    }


    render() {
        return (
            <div>
                {this.handleToggle()}
            </div>
        )
    }
}

export default CreateNewDataForm