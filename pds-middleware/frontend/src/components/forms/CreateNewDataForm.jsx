import * as React from "react";
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/esm/Container";
import createMyData from "../../api-functions/my-data/createMyData";
import readMappedAttributes from "../../api-functions/my-data/readMappedAttributes";




class CreateNewDataForm extends React.Component {
    constructor(props) {
        super(props)


        this.state = {
            mappedAttributes: [],
            selectedCredentialName: "",
            selectedCredentialId: "",
            selectedAttr: "",
            selectedMappedAttr: "",
            value: "",
        }

        this.handleToggle = this.handleToggle.bind(this)
        this.getCredentialList = this.getCredentialList.bind(this)
        this.getAttributesFromCredential = this.getAttributesFromCredential.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.selectAttributes = this.selectAttributes.bind(this)
        this.getMappedAttributeList = this.getMappedAttributeList.bind(this)
    }

    async componentDidMount() {
        let mappedAttributes = await readMappedAttributes()
        this.setState({ mappedAttributes: mappedAttributes })
    }
    /**
     * Creates the drop down menu for the Credentails to map
     * 
     * @returns Array of Credential Options that get loaded into drop down menu
     */
    getCredentialList() {
        let credentails = []
        credentails.push(<option>Select A Credential</option>)
        for (let credential of this.props.credentials) {
            credentails.push(
                <option value={credential.schemaId.match(/(?<=\:[0-9]\:)(.*?)(?=\:)/g)}>{credential.schemaId.match(/(?<=\:[0-9]\:)(.*?)(?=\:)/g)}</option>)
        }
        return credentails
    }

    getMappedAttributeList() {
        let mappedAttributes = []
        mappedAttributes.push(<option>Select A Mapped Attribute</option>)
        for (let attr of this.state.mappedAttributes) {
            mappedAttributes.push(<option value={attr}>{attr}</option>)
        }
        return mappedAttributes
    }

    /**
     * Creates the drop down menu for the attributes in a credential
     * 
     * @returns Array of attribute options that get loaded into drop down menu
     */
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

    /**
     * When a user selects an attribute from the drop down menu, parse the value for the attribute and 
     * set the state with the selected attribute and value
     * 
     * @param {string} attribute: the selected attribute
     */
    selectAttributes(attribute) {
        let value = ""
        let selectedCredentialId = ""
        for (let credential of this.props.credentials) {
            if (credential.schemaId.match(/(?<=\:[0-9]\:)(.*?)(?=\:)/g)[0] === this.state.selectedCredential) {
                selectedCredentialId = credential.credentialId
                value = credential.values[attribute]
            }
        }
        this.setState({
            selectedCredentialId: selectedCredentialId,
            selectedAttr: attribute,
            value: value
        })
    }


    /**
     * Once the form is filled out, call the createMyData Function to send the selected data to the server.
     */
    async handleSubmit() {
        if (this.state.selectedCredentialId !== "" && this.state.selectedMappedAttr !== "" && this.state.value !== "") {
            createMyData(this.props.person, this.state.selectedMappedAttr, this.state.value, this.state.selectedCredentialId, (data) => {
                this.props.refreshData()
            })

        } else {
            alert("Fill out all the fields")
        }

    }

    /**
     * 
     * If the Add my Data button is presses on App.jsx, render the creates data form. Else, render the empty string
     * 
     * @returns elements based on the toggle button
     */
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
                        <Form.Label>Attribute</Form.Label><Form.Select onChange={(event) => this.selectAttributes(event.target.value)}
                            aria-label="Select An Attribute to Map">
                            {this.getAttributesFromCredential()}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Value</Form.Label>
                        <Form.Control placeholder={this.state.value} disabled />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicText">
                        <Form.Label>Mapped Attribute</Form.Label><Form.Select onChange={(event) => this.setState({ selectedMappedAttr: event.target.value })}
                            aria-label="Map to A MyData Attribute ">
                            {this.getMappedAttributeList()}
                        </Form.Select>
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={() => this.handleSubmit()} >
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