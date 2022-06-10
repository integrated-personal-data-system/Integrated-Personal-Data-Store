import * as React from "react";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/esm/Container";
import createMyData from "../functions/createMyData";



class AddTripleTextArea extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            text: ""
        }
        this.handleToggle = this.handleToggle.bind(this)
    }

    handleToggle() {
        if (this.props.toggleAddData) {
            return <Container style={{ padding: "1rem", margin: "1rem" }}>
                <FloatingLabel controlId="floatingTextarea2" label="Triples">
                    <Form.Control
                        as="textarea"
                        placeholder="Leave a comment here"
                        style={{ height: '10rem' }}
                        onChange={(event) => { this.setState({ text: event.target.value }) }}
                    />

                </FloatingLabel>
                <Button variant="outline-primary" style={{ marginTop: ".5rem" }} onClick={() => createMyData(this.state.text)}>Save</Button>
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

export default AddTripleTextArea