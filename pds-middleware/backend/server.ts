import express, { application, Request, Response } from "express";
import readMyData from "./serverFunctions/my-data/readMyData";
import { readMyCerts } from "./serverFunctions/my-certs/readMyCerts"
import bodyParser from 'body-parser'
import createMyData from "./serverFunctions/my-data/createMyData";
import deleteMyData from "./serverFunctions/my-data/deleteMyData";
import createRSAKeyPair from "./serverFunctions/my-certs/rsaKeyGen";
import createNewUser from "./serverFunctions/my-data/createNewUser";
import { current_mapping } from './serverConfig'
import path from "path"
import fs from "fs"

let production = false

var https = require('https');
const app = express();

if (production) {
    let certificate = fs.readFileSync("/etc/letsencrypt/live/iamtestingbed.com/cert.pem", 'utf8');
    let privateKey = fs.readFileSync("/etc/letsencrypt/live/iamtestingbed.com/privkey.pem", 'utf8');

    let credentials = {
        key: privateKey,
        cert: certificate
    };
    var httpsServer = https.createServer(credentials, app);

    httpsServer.listen(443, () => {
        console.log(`Aries PDS Middleware software listening on port in Production mode ${443}`);
    });
} else {
    app.listen(8080, () => {
        console.log(`Aries PDS Middleware software listening on port in testing Mode ${8080}`);
    })
}


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static(path.join(__dirname, "../frontend", "build")));
app.use(express.static("public"));

//////////////////////////////////
// Credentials Endpoints
/////////////////////////////////

app.post('/createWalletKeyPair', (request: Request<string, any>, response: Response) => {
    createRSAKeyPair(request.body.person, request.body.keyPairName, request.body.passphrase, (result) => {
        if (result.success) {
            response.status(200).send(result.data)
        } else {
            response.status(500).send(result.data)
        }
    })
})

app.get('/readMyCerts', (request: Request, response: Response) => {
    readMyCerts((result) => {
        if (result.success) {
            response.status(200).send(result.data)
        } else {
            response.status(500).send(result.data)
        }
    })
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

app.post('/createNewUser', (request: Request<string, createMyDataBody>, response: Response) => {
    createNewUser((result) => {
        if (result.success) {
            response.status(200).send(result.data)
        } else {
            response.status(500).send("Could not create person")
        }
    })
})

app.post('/createMyData', (request: Request<string, createMyDataBody>, response: Response) => {
    let data = request.body
    createMyData(data.person, data.attribute, data.value, data.cert, (result) => {
        if (result.success) {
            response.status(200).send("Successfully Uploaded " + data.attribute)
        } else {
            response.status(500).send("Could Not Uploaded " + data.attribute)
        }
    })
})

app.get('/readMappedAttributes', (request: Request, response: Response) => {
    response.status(200).send({ attrList: current_mapping })
})


app.get('/readMyData', (request: Request, response: Response) => {
    readMyData((result) => {
        if (result.success) {
            response.status(200).send(result.data)
        } else {
            response.status(500).send(result.data)
        }
    })
})


app.post('/updateMyData', (request: Request<string, createMyDataBody>, response: Response) => {
    let data = request.body

    console.log(data)
})


app.post('/deleteMyData', (request: Request<string, createMyDataBody>, response: Response) => {
    let data = request.body
    console.log(request.body)
    deleteMyData(data.attribute, data.value, (result) => {
        if (result.success) {
            response.status(200).send("Successfully Deleted " + data.attribute)
        } else {
            response.status(500).send("Could Not Delete " + data.attribute)
        }
    })
})
