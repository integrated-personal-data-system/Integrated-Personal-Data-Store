import * as React from "react";
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/esm/Container";
import createMyData from "../functions/createMyData";




class CreateNewDataForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            attribute: "",
            value: ""
        }
        this.handleToggle = this.handleToggle.bind(this)
    }

    handleToggle() {
        console.log(this.props)
        if (this.props.toggleAddData) {
            return <Container style={{ padding: "1rem", margin: "1rem", backgroundColor: "white", borderRadius: ".5rem" }}>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicText">
                        <Form.Label>Data Attribute</Form.Label>
                        <Form.Control type="text" placeholder="Enter Attribute" onChange={(event) => this.setState({ attribute: event.target.value })} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicText">
                        <Form.Label>Value</Form.Label>
                        <Form.Control type="text" placeholder="Value" onChange={(event) => this.setState({ value: event.target.value })} />
                    </Form.Group>
                    <Button variant="primary" onClick={() => createMyData(this.props.person, this.state.attribute, this.state.value)} >
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