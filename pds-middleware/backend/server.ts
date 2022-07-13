import express, { Express, Handler, Request, Response } from "express";
import readMyData from "./serverFunctions/my-data/readMyData";
import { readMyCerts } from "./serverFunctions/my-certs/readMyCerts"
import bodyParser from 'body-parser'
import createMyData from "./serverFunctions/my-data/createMyData";
import deleteMyData from "./serverFunctions/my-data/deleteMyData";
import createRSAKeyPair from "./serverFunctions/my-certs/rsaKeyGen";
import createNewUser from "./serverFunctions/my-data/createNewUser";
import { current_mapping, production } from './serverConfig'
import winston, { createLogger, format, transports } from 'winston'
import expressWinston from "express-winston"

import path from "path"
import fs from "fs"


var https = require('https');
const app = express();
var router = express.Router();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static(path.join(__dirname, "../frontend", "build")));
app.use(express.static("public"));

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

app.use(expressWinston.logger({
    transports: [,
        new winston.transports.File({ filename: "./logs/server.log" })
    ],
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.json(),
    ),
    meta: true, // optional: control whether you want to log the meta data about the request (default to true)
    msg: "HTTP {{req.method}} {{req.url}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
    expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
    colorize: false, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
    ignoreRoute: function (req, res) { return false; } // optional: allows to skip some log messages based on request and/or response
}));


app.use('/', router)



if (production) {
    let certificate = fs.readFileSync("/etc/letsencrypt/live/iamtestingbed.com/cert.pem", 'utf8');
    let privateKey = fs.readFileSync("/etc/letsencrypt/live/iamtestingbed.com/privkey.pem", 'utf8');

    let credentials = {
        key: privateKey,
        cert: certificate
    };
    var httpsServer = https.createServer(credentials, app);

    httpsServer.listen(443, () => {
        logger.info("Started Server");
        console.log(`Aries PDS Middleware software listening on port in Production mode ${443}`);
    });
} else {
    app.listen(80, () => {
        console.log(`Aries PDS Middleware software listening on port in testing Mode ${80}`);
    })
}



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
            console.log("Data Read failed: " + result.data)
            response.status(500).send("Failed to Read Data")
        }
    })
})


app.post('/updateMyData', (request: Request<string, createMyDataBody>, response: Response) => {
    try {
        response.status(500).send("Cound Not Update Data")
        throw new Error("Yooooo");
    } catch (error) {
        logger.error(error);
    }

})


app.post('/deleteMyData', (request: Request<string, createMyDataBody>, response: Response,) => {
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


