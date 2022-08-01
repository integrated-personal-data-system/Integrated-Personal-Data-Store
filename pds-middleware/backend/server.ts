/**
 * Server for the Integrated Personal Data Store
 * July 26, 2022
 * @CR
 */

//////////////////////////
// NPM Imports 
/////////////////////////
import express, { Express, Handler, Request, Response } from "express";
import bodyParser from 'body-parser'
import 'dotenv/config'
import path from "path"
import fs from "fs"


//////////////////////////
// Server Imports 
/////////////////////////
import readMyData from "./endpoints/my-data/readMyData";
import createMyData from "./endpoints/my-data/createMyData";
import createNewUser from "./endpoints/my-data/createNewUser";
import getPersonIRI from "./endpoints/my-data/getPersonIRI";
import { current_mapping, production } from './utils/serverConfig'
import { requestLogger, errorLogger, catchErrorLogger } from "./utils/logger";
import createVerifiableCredentialsTriples from "./endpoints/my-wallet/createVerifiableCredentials"
import { walletClient } from "./endpoints/my-wallet/wallet";
import createWalletTriples from "./endpoints/my-wallet/createWallet";

var https = require('https');
const app = express();
var router = express.Router();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "../frontend", "build")));
app.use(express.static("public"));


app.get('/wallet', (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "build", "index.html"));
});

app.use('/', router)

/**
 * Production Mode Runs the Server over https using the TSL Certificate
 */
if (production) {
    let certificate = fs.readFileSync(`${process.env.SSL_CERT}`, 'utf8');
    let privateKey = fs.readFileSync(`${process.env.SSL_PRIVATE_KEY}`, 'utf8');

    let credentials = {
        key: privateKey,
        cert: certificate
    };
    var httpsServer = https.createServer(credentials, app);

    httpsServer.listen(443, async () => {
        console.log(`Aries PDS Middleware software listening on port in Production mode ${443}`);
    });
} else {
    app.listen(80, () => {
        console.log(`Aries PDS Middleware software listening on port in testing Mode ${80}`);
    })
}


//////////////////////////////////
// My Wallet Enpoint
/////////////////////////////////

/**
 *  Sends a request to the Trinsic API to list all the credentials. 
 *  @param {string} walletId: The Wallet Id
 *  Status: Done
 *  @CR
 */
app.post('/api/listAllConnections', async (request: Request<string, any>, response: Response) => {
    try {
        let walletId = request.body.walletId
        let connections = await walletClient.listConnections(walletId);
        response.status(200).send(connections)
    } catch (error) {
        console.log(error)
        response.status(400).send("Could Not List Credentials")
    }
})

/**
 * Sends a request to Trinisc API to list all the credential in a wallet
 * @param {string} walletId: The Wallet Id
 * Status: Done
 * @CR
 */
app.post('/api/listCredentialsInWallet', async (request: Request<string, any>, response: Response) => {
    try {
        let walletId = request.body.walletId
        if (walletId == null) {
            response.status(400).send("Missing Wallet Id")
        } else {
            let credentials = await walletClient.listCredentials(walletId);
            response.status(200).send(credentials)
        }
    } catch (error) {
        console.log(error)
        response.status(400).send("Could Not List Credentials")
    }
})

/**
 *  Sends a request to Trinisc API to get a specific credential given a credential Id
 * @param {string} walletId: The Wallet Id
 * @param {string} credentialId: The credential Id
 * Status: Done
 * @CR
 */
app.post('/api/getCredentialInWallet', async (request: Request<string, any>, response: Response) => {
    try {
        let walletId = request.body.walletId
        let credentialId = request.body.credentialId
        if (walletId == null) {
            response.status(400).send("Missing Wallet Id")
        } else if (credentialId == null) {
            response.status(400).send("Missing Credential ID")
        }
        else {
            let credential = await walletClient.getCredential(walletId, credentialId);
            response.status(200).send(credential)
        }
    } catch (error) {
        console.log(error)
        response.status(400).send("Could Not List Credentials")
    }
})


/**
 * Sends a request to the Trinsic API to delete a given credential given a credential Id
 * @param {string} walletId: The Wallet Id
 * @param {string} credentialId: The credential Id
 * Status: Done
 * @CR
 */
app.delete('/api/deleteCredential', async (request: Request<string, any>, response: Response) => {
    try {
        let walletId = request.body.walletId
        let credentialId = request.body.credentialId
        if (walletId == null) {
            response.status(400).send("Missing Wallet Id")
        } else if (credentialId == null) {
            response.status(400).send("Missing Credential ID")
        } else {
            walletClient.deleteCredential(walletId, credentialId);
            response.status(200).send("Delete Credential: " + credentialId)
        }
    } catch (error) {
        console.log(error)
        response.status(400).send("Could Not Delete Credential")
    }
})

/**
 * Sends a request to the Trinsic API to delete a given credential given a credential Id
 * @param {string} walletId: The Wallet Id
 * @param {string} credentialData: The url for the Credn
 * Status: Done
 * @CR
 */
app.post('/api/AcceptCredential', async (request: Request<string, any>, response: Response) => {
    try {
        let walletId = request.body.walletId
        let credentialData = request.body.credentialData
        if (walletId === null) response.status(400).send("Missing WalletId")
        if (credentialData === null) response.status(400).send("Missing Crendential Data")

        let credential = await walletClient.acceptCredential(walletId, credentialData);
        let credentialId = credential.credentialId
        let credentialName = credential.schemaId.match(/(?<=\:[0-9]\:)(.*?)(?=\:)/g)[0]
        createVerifiableCredentialsTriples(walletId, credentialName, credentialId, (result) => {
            if (result) {
                response.status(200).send("Created Verifiable Credential: " + result.data.value)
            } else {
                response.status(200).send("Could not create Verifiable Credential")
            }
        })
    } catch (error) {
        console.log(error)
        response.status(400).send("Could Not Accept Credential")
    }
})

/**
 * Sends a request to the Trinsic Wallet to create a digital Wallet. If there already is a wallet,
 * sends a response indicating the current wallet
 * Status: Done
 * @CR
 */
app.put('/api/createWallet', async (request: Request<string, any>, response: Response) => {
    try {
        let personIRI = request.body.personIRI
        if (personIRI === undefined) {
            response.status(400).send("Missing personIRI")
        } else {
            requestLogger(request.url, request.method, request.rawHeaders, JSON.stringify(request.body))
            let wallets = await walletClient.listWallets();
            if (wallets.length == 0) {
                let wallet = await walletClient.createWallet({
                    ownerName: process.env.WALLET_OWNER,
                    walletId: null
                });
                console.log(wallet)
                createWalletTriples(personIRI, wallet.walletId, (result) => {
                    if (result.success) {
                        response.status(200).send(result.data)
                    } else {
                        response.status(400).send("Could not create the triples for a wallet")
                    }
                })
            } else {
                response.status(400).send("Wallet Already Created: " + wallets[0].walletId)
            }
        }


    } catch (error) {
        response.status(400).send({ value: "Could Not Create Wallet" })
        console.log(error)
    }
})

/**
 * Sends a request to the Trinsic API to delete a cloud wallet 
 * @param {string} walletId: The ID for the digital Wallet
 * Status: Update the triples 
 * @CR
 */
app.delete('/api/DeleteCloudWallet', async (request: Request<string, any>, response: Response) => {
    try {
        let walletId = request.body.walletId
        await walletClient.deleteWallet(walletId);
        response.status(200).send("Successfully Deleted Wallet: " + walletId)
    } catch (error) {
        console.log(error)
        response.status(400).send("Could Not Delete Wallet")
    }

})
/**
 * Sends a request to the Trinsic API to delete ALL cloud wallet 
 * Status: Update the triples 
 * @CR
 */
app.delete('/api/DeleteAllCloudWallet', async (request: Request<string, any>, response: Response) => {
    try {
        let wallets = await walletClient.listWallets();
        for (let wallet of wallets) {
            await walletClient.deleteWallet(wallet.walletId);
        }
        response.status(200).send("Successfully Deleted All Wallets")
    } catch (error) {
        console.log(error)
        response.status(400).send("Could Not Delete All Wallets")
    }

})


/**
 * Sends a request to the Trinsic API to get the current wallet
 * Status: Done
 * @CR
 */
app.get('/api/getWallet', async (request: Request<string, any>, response: Response) => {
    try {
        requestLogger(request.url, request.method, request.rawHeaders, JSON.stringify(request.body))
        let wallets = await walletClient.listWallets();
        let trinsicWallets = []
        for (let wallet of wallets) {
            trinsicWallets.push(wallet.walletId)
        }
        response.status(200).send(trinsicWallets)
    } catch (error) {
        console.log(error)
        response.status(400).send("Could Not List Cloud Wallets")
    }
})

//////////////////////////////////
// My Data Endpoints
/////////////////////////////////


/**
 * Sends a query to the triple store to get the IRI for the Person
 * Status: Done
 * @CR
 */
app.get('/api/getPersonIRI', (request: Request<string, any>, response: Response) => {
    try {
        requestLogger(request.url, request.method, request.rawHeaders, JSON.stringify(request.body))
        getPersonIRI((result) => {
            if (result.success) {
                response.status(200).send(result.data)
            } else {
                errorLogger(request.url, request.method, result.data)
                response.status(200).send(result.data)
            }
        })
    } catch (error) {
        catchErrorLogger(request.url, request.method, error)
    }
})

/**
 * Creates a new user in the triple store. If there is already a user, sends the IRI 
 * of the current person
 * Status: Done 
 * @CE 
 */
app.put('/api/createNewUser', (request: Request<string, any>, response: Response) => {
    try {
        requestLogger(request.url, request.method, request.rawHeaders, JSON.stringify(request.body))
        getPersonIRI((result) => {
            if (result.success) {
                response.status(500).send("User Already Created: " + result.data.value)
            } else {
                createNewUser((result) => {
                    if (result.success) {
                        response.status(200).send(result.data)
                    } else {
                        errorLogger(request.url, request.method, result.data)
                        response.status(200).send(result.data)
                    }
                })
            }
        })
    } catch (error) {
        catchErrorLogger(request.url, request.method, error)
    }
})

/**
 * Creates triples for the an attribute in the Verifiable Credential and uploads the data into the triple store
 * @param {string} person: The IRI of the person 
 * @param {string} attribute: The attribte that you want to create
 * @param {string} value: The value of the attribute
 * @param {string} verifiableCredentialId: The id for the Verifiable Credential
 * Status: In Progress Fix createMyDataFunction and test
 * @CR
 */
app.put('/api/createMyData', (request: Request<string, any>, response: Response) => {
    try {
        requestLogger(request.url, request.method, request.rawHeaders, JSON.stringify(request.body))
        let data = request.body
        if (data.person == undefined) response.status(400).send("Missing Person IRI")
        if (data.attribute == undefined) response.status(400).send("Missing Data Attribute")
        if (data.value == undefined) response.status(400).send("Missing Data Value")
        if (data.verifiableCredentialId == undefined) response.status(400).send("Missing Verifiable Credential")
        console.log(data)
        createMyData(data.person, data.attribute, data.value, data.verifiableCredentialId, (result) => {
            if (result.success) {
                response.status(200).send("Successfully Uploaded " + data.attribute)
            } else {
                errorLogger(request.url, request.method, result.data)
                response.status(500).send("Could Not Uploaded " + data.attribute)
            }
        })
    } catch (error) {
        catchErrorLogger(request.url, request.method, error)
    }

})

/**
 * Sends the current attribute that have been mapped in the My Data Ontology
 * Status: Done 
 * @Cr
 */
app.get('/api/readMappedAttributes', (request: Request, response: Response) => {
    try {
        requestLogger(request.url, request.method, request.rawHeaders, JSON.stringify(request.body))
        response.status(200).send({ attrList: current_mapping })
    } catch (error) {
        catchErrorLogger(request.url, request.method, error)
    }
})


/**
 * Queries the triple store to get all a person's data 
 * Status: Done
 * @CR
 */
app.get('/api/readMyData', (request: Request, response: Response) => {
    try {
        requestLogger(request.url, request.method, request.rawHeaders, JSON.stringify(request.body))
        readMyData((result) => {
            if (result.success) {
                response.status(200).send(result.data)
            } else {
                errorLogger(request.url, request.method, result.data)
                response.status(500).send({ data: "Failed to Read Data" })
            }
        })
    } catch (error) {
        catchErrorLogger(request.url, request.method, error)
    }

})


