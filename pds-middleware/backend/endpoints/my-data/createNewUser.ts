import fetch from "node-fetch"
import { v4 as uuidv4 } from 'uuid'
import validateQuery from "../queries/validateQuery"
import { Parser, Generator } from "sparqljs"


function createUpdateQuery(personGuid: string) {
    try {
        let updateQuery = `PREFIX cco: <http://www.ontologyrepository.com/CommonCoreOntologies/>
PREFIX obo: <http://purl.obolibrary.org/obo/>
       
INSERT DATA
{ 
    ${personGuid} a cco:Person . 
}
        `
        return updateQuery
    } catch (error) {
        console.log("Could not create update query")
    }
}

function createNewUser(callback: ({ success: boolean, data: string }) => void) {
    let personGuid = "cco:Person1_" + uuidv4();
    let query = createUpdateQuery(personGuid)
    let vaildatedQuery = validateQuery(query)

    if (vaildatedQuery != "") {
        fetch(`http://${process.env.API_LOCATION}:3030/MyData`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/sparql-update',
                'Accept': 'application/json'

            },
            body: query
        }).then(res => res).then(data => {
            callback({
                success: true,
                data: { "value": personGuid }
            })
        }).catch((error) => {
            console.log(error)
            callback({
                success: false,
                data: { "value": null }
            })
        })
    } else {
        callback({
            success: false,
            data: { "value": null }
        })
    }
}

export default createNewUser