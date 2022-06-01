import express, { Express, Handler, Request, Response } from "express"

const app = express();
const port = 8080;

app.listen(port, () => {
    console.log(`Aries PDS Middleware software listening on port ${port}`)
});