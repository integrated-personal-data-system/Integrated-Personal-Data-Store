import express, { Request, Response } from "express";
import readMyData from "./sparql/readMyData";
import bodyParser from 'body-parser'
import createMyData from "./sparql/createMyData";
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
// Transformation Script
/////////////////////////////////


//////////////////////////////////
// SPARQL CRUD Operations 
/////////////////////////////////

interface createMyDataBody {
    person: string, 
    attribute: string,
    value: string
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
