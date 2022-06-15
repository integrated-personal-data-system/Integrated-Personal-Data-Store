import express, { application, Request, Response } from "express";
import readMyData from "./sparql/readMyData";
import bodyParser from 'body-parser'
import createMyData from "./sparql/createMyData";
import createRSAKeyPair from "./rsa/rsaKeyGen";
import path from "path"
import fs from "fs"
var https = require('https');


const app = express();


let certificate = fs.readFileSync("/etc/letsencrypt/live/iamtestingbed.com/cert.pem", 'utf8');
let privateKey = fs.readFileSync("/etc/letsencrypt/live/iamtestingbed.com/privkey.pem", 'utf8');


let credentials = {
    key: privateKey,
    cert: certificate
};

var httpsServer = https.createServer(credentials, app);

httpsServer.listen(443, () => {
    console.log(`Aries PDS Middleware software listening on port ${443}`);
});

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static("public"));

//////////////////////////////////
// Key Generation
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



//////////////////////////////////
// SPARQL CRUD Operations 
/////////////////////////////////

interface createMyDataBody {
    person: string, 
    attribute: string,
    value: string
}

interface deleteMyDataBody {
    
}

app.get('/readMyData', (request: Request, response: Response) => {
    readMyData((result) => {
        if (result.success) {
            response.status(200).send(result.data)
        } else {
            response.status(500).send(result.data)
        }
    })
})

app.post('/createMyData', (request: Request<string, createMyDataBody>, response: Response) => {
    let data = request.body

    createMyData(data.person, data.attribute, data.value, (result) => {
        if (result.success) {
            response.status(200).send(result.data)
        } else {
            response.status(500).send(result.data)
        }
    })
})

// app.delete('/deleteMyData', (request: Request<string, createMyDataBody>, response: Response) )
