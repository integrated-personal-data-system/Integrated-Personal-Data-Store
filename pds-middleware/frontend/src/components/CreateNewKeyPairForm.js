import * as React from "react";
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/esm/Container";
import createMyData from "../functions/createMyData";
import createNewRSAKeys from "../functions/createNewRSAKey";
import Alert from "react-bootstrap/Alert"





class CreateNewKeyPairForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            passwordsNotMatch:false,
            keyPairName: "",
            passphrase: "",
            confirmPassphrase: "-1",
        }
        this.handleToggle = this.handleToggle.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.passwordsNotMatchAlert = this.passwordsNotMatchAlert.bind(this)
    }

    handleSubmit(){
        if(this.state.passphrase === this.state.confirmPassphrase){
            this.setState({passwordsNotMatch: false})
            console.log(this.props.person, this.state.keyPairName, this.state.passphrase)
            createNewRSAKeys(this.props.person, this.state.keyPairName, this.state.passphrase)
        }else{
            this.setState({passwordsNotMatch: true})
        }
        
    }

    passwordsNotMatchAlert(){
        if(this.state.passwordsNotMatch){
            return (<Alert key={"danger"} variant={"danger"}>
            The Passwords Do Not Match
        </Alert>)
        }else{
            return ""
        }
    }

    handleToggle() {
        if (this.props.toggleAddKeyPair) {
            return <Container style={{ padding: "1rem", margin: "1rem", backgroundColor: "white", borderRadius: ".5rem" }}>
                <Form>
               {this.passwordsNotMatchAlert()}
                
                    <Form.Group className="mb-3" controlId="formBasicText">
                        <Form.Label>Key Pair Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Key Pair Name" onChange={(event) => this.setState({ keyPairName: event.target.value })} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicText">
                        <Form.Label>Passphrase Key Pair</Form.Label>
                        <Form.Control type="password" placeholder="Enter Passphrase" onChange={(event) => this.setState({ passphrase: event.target.value })} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicText">
                        <Form.Label>Confirm Passphrase</Form.Label>
                        <Form.Control type="password" placeholder="Enter Passphrase" onChange={(event) => this.setState({ confirmPassphrase: event.target.value })} />
                    </Form.Group>
                    <Button variant="primary" onClick={() => this.handleSubmit() } >
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

export default CreateNewKeyPairForm