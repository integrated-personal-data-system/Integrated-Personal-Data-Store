import express, { Request, Response } from "express";
import readMyData from "./sparql/readMydata";
import path from "path"

const app = express();
const port = 8080;

app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static("public"));

app.listen(port, () => {
    console.log(`Aries PDS Middleware software listening on port ${port}`);
});



app.get('/readMyData', (request: Request, response: Response) => {
    readMyData((result) => {
        if (result.success) {
            response.status(200).send(result.data)
        } else {
            response.status(500).send(result.data)
        }
    })
})
