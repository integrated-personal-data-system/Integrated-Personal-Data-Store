import fetch from "node-fetch"
import { mappingFuction } from "./mappings/createPatterns"
import { v4 as uuidv4 } from 'uuid'

import { Parser, Generator } from "sparqljs"


function validateUpdateQuery(query: string) {
    try {
        if (query == "") {
            return "Query is empty"
        }
        let parser = new Parser()
        var parsedQuery = parser.parse(query)
        var generator = new Generator()
        return generator.stringify(parsedQuery)
    } catch (error) {
        console.log("Your query has a syntax error")
        return ""

    }
}

function createUpdateQuery(personGuid: string) {
    try {
        let updateQuery = `PREFIX cco: <http://www.ontologyrepository.com/CommonCoreOntologies/>
PREFIX obo: <http://purl.obolibrary.org/obo/>
       
INSERT DATA
{ 
    <${personGuid}> a cco:Person . 
}
        `
        return updateQuery
    } catch (error) {
        console.log("Could not create update query")
    }
}

function createNewUser(callback: ({ success: boolean, data: string }) => void) {
    let personGuid = "http://www.cubrc.org/Data/Person1_" + uuidv4();
    let query = createUpdateQuery(personGuid)
    let vaildatedQuery = validateUpdateQuery(query)

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