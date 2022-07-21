import * as React from "react";
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/esm/Container";
import createMyData from "../../api-functions/my-data/createMyData";
import AcceptCredential from "../../api-functions/my-wallet/AcceptCredential";
import Alert from "react-bootstrap/Alert"





class AcceptCredentialForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            offerLink: ""
        }
        this.handleToggle = this.handleToggle.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit() {
        if (this.state.offerLink !== "") {
            AcceptCredential(this.props.walletId, this.state.offerLink)
        }

    }

    handleToggle() {
        if (this.props.toggleAddKeyPair) {
            return <Container style={{ padding: "1rem", margin: "1rem", backgroundColor: "white", borderRadius: ".5rem" }}>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Wallet Id</Form.Label>
                        <Form.Control placeholder={this.props.walletId} disabled />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicText">
                        <Form.Label>Offer Link</Form.Label>
                        <Form.Control type="text" placeholder="Enter Offer Link" onChange={(event) => this.setState({ offerLink: event.target.value })} />
                    </Form.Group>

                    <Button variant="primary" onClick={() => this.handleSubmit()} >
                        Accept
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

export default AcceptCredentialForm