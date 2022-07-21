import express, { Express, Handler, Request, Response } from "express";
import readMyData from "./apiFunctions/my-data/readMyData";
import { readMyCerts } from "./apiFunctions/my-certs/readMyCerts"
import bodyParser from 'body-parser'
import createMyData from "./apiFunctions/my-data/createMyData";
import deleteMyData from "./apiFunctions/my-data/deleteMyData";
import createRSAKeyPair from "./apiFunctions/my-certs/createRSAKeyPair";
import { updateMyData } from "./apiFunctions/my-data/updateMyData";
import createNewUser from "./apiFunctions/my-data/createNewUser";
import getPersonIRI from "./apiFunctions/my-data/getPersonIRI";
import { current_mapping, production } from './serverConfig'
import { createLogger, format, transports } from 'winston'
import createWallet from "./apiFunctions/my-wallet/createWallet";
import getWalletId from "./apiFunctions/my-wallet/getWalletId"
import { walletClient } from "./apiFunctions/my-wallet/wallet";
import getVerifiableCredentials from "./apiFunctions/my-wallet/getVerifiableCrendentials";
import 'dotenv/config'


import path from "path"
import fs from "fs"


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

const logger = createLogger({
    transports: [
        new transports.File({
            dirname: "logs",
            filename: "server.log",
        }),
    ],
    format: format.combine(
        format.timestamp(),
        format.printf(({ timestamp, level, message }) => {
            return `[${timestamp}] ${level}: ${message}`;
        })
    ),
});


app.use('/', router)


if (production) {
    let certificate = fs.readFileSync(`${process.env.SSL_CERT}`, 'utf8');
    let privateKey = fs.readFileSync(`${process.env.SSL_PRIVATE_KEY}`, 'utf8');

    let credentials = {
        key: privateKey,
        cert: certificate
    };
    var httpsServer = https.createServer(credentials, app);

    httpsServer.listen(443, async () => {
        logger.info("Started Server");
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

// Connections 
app.post('/api/listAllConnections', async (request: Request<string, any>, response: Response) => {
    try {
        let walletId = request.body.walletId
        let connections = await walletClient.listConnections(walletId);
        response.status(200).send(connections)
    } catch (error) {
        console.log(error)
        response.status(400).send("Could Not List Credentails")
    }
})

// Credentials
app.post('/api/listCredentialsInWallet', async (request: Request<string, any>, response: Response) => {
    try {
        let walletId = request.body.walletId
        if (walletId == null) {
            response.status(200).send("Missing Wallet Id")
        }
        let credentials = await walletClient.listCredentials(walletId);
        response.status(200).send(credentials)
    } catch (error) {
        console.log(error)
        response.status(400).send("Could Not List Credentials")
    }
})

app.post('/api/AcceptCredential', async (request: Request<string, any>, response: Response) => {
    try {
        let walletId = request.body.walletId
        let credentialData = request.body.credentialData
        let credential = await walletClient.acceptCredential(walletId, credentialData);
        response.status(200).send(credential)
    } catch (error) {
        console.log(error)
        response.status(400).send("Could Not Accept Credentail")
    }
})

// Wallets 
app.put('/api/createWallet', async (request: Request<string, any>, response: Response) => {
    try {

        logger.info("URL:" + request.url + " |  METHOD:" + request.method + " |  Headers:" + request.rawHeaders + " |  BODY: " + JSON.stringify(request.body));
        let wallets = await walletClient.listWallets();
        console.log(wallets)
        if (wallets.length == 0) {
            let wallet = await walletClient.createWallet({
                ownerName: process.env.WALLET_OWNER,
                walletId: null
            });
            response.status(200).send(wallet)
        } else {
            response.status(400).send("Wallet Already Created: " + wallets[0].walletId)
        }
    } catch (error) {
        response.status(400).send({ value: "Could Not Create Wallet" })
        console.log(error)
    }
})

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

app.get('/api/getWallet', async (request: Request<string, any>, response: Response) => {
    try {
        logger.info("URL:" + request.url + " |  METHOD:" + request.method + " |  Headers:" + request.rawHeaders + " |  BODY: " + JSON.stringify(request.body));
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
// My Credentials 
/////////////////////////////////

app.put('/api/createWalletKeyPair', (request: Request<string, any>, response: Response) => {
    try {
        let data = request.body
        if (data.person == undefined) {
            response.status(400).send("Missing Person IRI")
        }

        if (data.keyPairName == undefined) {
            response.status(400).send("Missing keyPairName")
        }

        if (data.passphrase == undefined) {
            response.status(400).send("Missing passphrase")
        }

        logger.info("URL:" + request.url + " |  METHOD:" + request.method + " |  Headers:" + request.rawHeaders + " |  BODY: " + JSON.stringify(request.body));
        createRSAKeyPair(request.body.person, request.body.keyPairName, request.body.passphrase, (result) => {
            if (result.success) {
                response.status(200).send({ data: result.data })
            } else {
                logger.error("URL:" + request.url + " |  METHOD:" + request.method + " | Error:" + result.data);
                response.status(500).send({ data: result.data })
            }
        })
    } catch (error) {
        logger.error("URL:" + request.url + " |  METHOD:" + request.method + " | Error:" + error);
    }
})

app.get('/api/readMyCerts', (request: Request, response: Response) => {
    try {
        logger.info("URL:" + request.url + " |  METHOD:" + request.method + " |  Headers:" + request.rawHeaders + " |  BODY: " + JSON.stringify(request.body));
        readMyCerts((result) => {
            if (result.success) {
                response.status(200).send(result.data)
            } else {
                logger.error("URL:" + request.url + " |  METHOD:" + request.method + " | Error:" + result.data);
                response.status(500).send(result.data)
            }
        })
    } catch (error) {
        logger.error("URL:" + request.url + " |  METHOD:" + request.method + " | Error:" + error);
    }

})


//////////////////////////////////
// My Data Endpoints
/////////////////////////////////

interface createMyDataBody {
    person: string,
    attribute: string,
    cert: string,
    value: string
}


app.get('/api/getPersonIRI', (request: Request<string, createMyDataBody>, response: Response) => {
    try {
        logger.info("URL:" + request.url + " METHOD:" + request.method + " Headers:" + request.rawHeaders);
        getPersonIRI((result) => {
            if (result.success) {
                response.status(200).send(result.data)
            } else {
                console.log(result.data)
                logger.error("URL:" + request.url + " |  METHOD:" + request.method + " | Error:" + result.data);
                response.status(500).send(result.data)
            }
        })
    } catch (error) {
        logger.error(error);
    }

})

app.put('/api/createNewUser', (request: Request<string, createMyDataBody>, response: Response) => {
    try {
        logger.info("URL:" + request.url + " METHOD:" + request.method + " Headers:" + request.rawHeaders + " |  BODY: " + JSON.stringify(request.body));
        getPersonIRI((result) => {
            if (result.success) {
                response.status(500).send("User Already Created: " + result.data.value)
            } else {
                createNewUser((result) => {
                    if (result.success) {
                        response.status(200).send(result.data)
                    } else {
                        logger.error("URL:" + request.url + " |  METHOD:" + request.method + " | Error:" + result.data);
                        response.status(500).send(result.data)
                    }
                })
            }
        })

    } catch (error) {
        logger.error(error);
    }

})


app.put('/api/createMyData', (request: Request<string, createMyDataBody>, response: Response) => {
    try {
        logger.info("URL:" + request.url + " METHOD:" + request.method + " Headers:" + request.rawHeaders + " |  BODY: " + JSON.stringify(request.body));
        let data = request.body
        if (data.person == undefined) {
            response.status(400).send("Missing Person IRI")
        }

        if (data.attribute == undefined) {
            response.status(400).send("Missing Data Attribute")
        }

        if (data.value == undefined) {
            response.status(400).send("Missing Data Value")
        }

        if (data.cert == undefined) {
            response.status(400).send("Missing Cert")
        }
        createMyData(data.person, data.attribute, data.value, data.cert, (result) => {
            if (result.success) {
                response.status(200).send("Successfully Uploaded " + data.attribute)
            } else {
                logger.error("URL:" + request.url + " |  METHOD:" + request.method + " | Error:" + result.data);
                response.status(500).send("Could Not Uploaded " + data.attribute)
            }
        })
    } catch (error) {
        logger.error("URL:" + request.url + " |  METHOD:" + request.method + " | Error:" + error);
    }

})

app.get('/api/readMappedAttributes', (request: Request, response: Response) => {
    try {
        logger.info("URL:" + request.url + " | METHOD:" + request.method + " |  Headers:" + request.rawHeaders + " |  BODY: " + JSON.stringify(request.body));
        response.status(200).send({ attrList: current_mapping })
    } catch (error) {
        logger.error("URL:" + request.url + " |  METHOD:" + request.method + " | Error:" + error);
    }

})

app.get('/api/readMyData', (request: Request, response: Response) => {
    try {
        logger.info("URL:" + request.url + "  |  METHOD:" + request.method + "  |  Headers:" + request.rawHeaders + " |  BODY: " + JSON.stringify(request.body));
        readMyData((result) => {
            if (result.success) {
                response.status(200).send(result.data)
            } else {
                logger.error("URL:" + request.url + " |  METHOD:" + request.method + " | Error:" + result.data);
                response.status(500).send({ data: "Failed to Read Data" })
            }
        })
    } catch (error) {
        logger.error("URL:" + request.url + " |  METHOD:" + request.method + " | Error:" + error);
    }

})

app.post('/api/updateMyData', (request: Request<string, createMyDataBody>, response: Response) => {
    try {
        logger.info("URL:" + request.url + "  |  METHOD:" + request.method + "  |  Headers:" + request.rawHeaders + " |  BODY: " + JSON.stringify(request.body));
        let data = request.body
        updateMyData(data.person, data.attribute, data.newDataValue, data.oldDataValue, (result) => {
            if (result.success) {
                response.status(200).send("Successfully Updated " + data.attribute)
            } else {
                logger.error("URL:" + request.url + " |  METHOD:" + request.method + " | Error:" + result.data);
                response.status(500).send("Could Not Update " + data.attribute)
            }
        })
    } catch (error) {
        logger.error("URL:" + request.url + " |  METHOD:" + request.method + " | Error:" + error);
    }

})

app.post('/api/deleteMyData', (request: Request<string, createMyDataBody>, response: Response,) => {
    try {
        logger.info("URL:" + request.url + " |  METHOD:" + request.method + " |  Headers:" + request.rawHeaders + " |  BODY: " + JSON.stringify(request.body));
        let data = request.body
        deleteMyData(data.attribute, data.value, (result) => {
            if (result.success) {
                response.status(200).send("Successfully Deleted " + data.attribute)
            } else {
                logger.error("URL:" + request.url + " |  METHOD:" + request.method + " | Error:" + result.data);
                response.status(500).send("Could Not Delete " + data.attribute)
            }
        })
    } catch (error) {
        logger.error("URL:" + request.url + " |  METHOD:" + request.method + " | Error:" + error);
    }

})


//////////////////////////////////
// Dev Endpoints
/////////////////////////////////



