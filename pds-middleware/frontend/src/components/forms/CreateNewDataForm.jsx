import * as React from "react";
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/esm/Container";
import createMyData from "../../api-functions/my-data/createMyData";




class CreateNewDataForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            selectedCredential: "",
            selectedAttr: "",
            value: "",
            cert: ""
        }

        this.handleToggle = this.handleToggle.bind(this)
        this.getCredentialList = this.getCredentialList.bind(this)
        this.getAttributesFromCredential = this.getAttributesFromCredential.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.getValueFromAttribute = this.getValueFromAttribute.bind(this)
    }

    getCredentialList() {
        let credentails = []
        credentails.push(<option>Select A Credential</option>)
        for (let credential of this.props.credentials) {
            credentails.push(<option value={credential.schemaId.match(/(?<=\:[0-9]\:)(.*?)(?=\:)/g)}>{credential.schemaId.match(/(?<=\:[0-9]\:)(.*?)(?=\:)/g)}</option>)
        }
        return credentails
    }

    getAttributesFromCredential() {
        let attributeList = []
        let attributeOptions = []
        if (this.state.selectedCredential !== "") {
            for (let credential of this.props.credentials) {
                if (credential.schemaId.match(/(?<=\:[0-9]\:)(.*?)(?=\:)/g)[0] === this.state.selectedCredential) {
                    attributeList = credential.values
                }
            }
        }
        attributeOptions.push(<option>Select An Attribute</option>)
        for (let attribute in attributeList) {
            attributeOptions.push(<option value={attribute}>{attribute}</option>)
        }
        return attributeOptions
    }

    getValueFromAttribute() {
        let value = ""
        if (this.state.selectedCredential !== "" && this.state.selectedAttr !== "") {
            for (let credential of this.props.credentials) {
                if (credential.schemaId.match(/(?<=\:[0-9]\:)(.*?)(?=\:)/g)[0] === this.state.selectedCredential) {
                    value = credential.values[this.state.selectedAttr]
                }
            }
        }
        return value
    }

    async handleSubmit() {
        console.log(this.state.selectedCredential)
        console.log(this.state.selectedAttr)
        console.log(this.state.value)
        // if (this.state.selectedCredential !== "" && this.state.selectedAttr !== "" && this.state.value !== "") {

        //     // createMyData(this.props.person, this.state.attribute, this.state.value, this.state.cert, (data) => {
        //     //     this.props.refreshData()
        //     // })

        // } else {
        //     alert("Fill out all the fields")
        // }

    }

    handleToggle() {
        if (this.props.toggleAddData) {
            return <Container style={{ padding: "1rem", margin: "1rem", backgroundColor: "white", borderRadius: ".5rem" }}>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicText">
                        <Form.Label>Select a Credential to Map</Form.Label>
                        <Form.Select onChange={(event) => this.setState({ selectedCredential: event.target.value })} aria-label="Select An Attribute">
                            {this.getCredentialList()}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicText">
                        <Form.Label>Attribute</Form.Label><Form.Select onChange={(event) => this.setState({
                            selectedAttr: event.target.value,
                        })} aria-label="Select An Attribute">
                            {this.getAttributesFromCredential()}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Value</Form.Label>
                        <Form.Control placeholder={this.getValueFromAttribute()} disabled />
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