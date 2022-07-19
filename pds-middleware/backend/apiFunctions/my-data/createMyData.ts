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

function createUpdateQuery(triples: string) {
    try {
        let updateQuery = `PREFIX cco: <http://www.ontologyrepository.com/CommonCoreOntologies/>
PREFIX obo: <http://purl.obolibrary.org/obo/>
       
INSERT DATA
{ 
${triples}
}
        `
        return updateQuery
    } catch (error) {
        console.log("Could not create update query")
    }
}

function createMyData(person: string, attribute: string, value: string, cert: string, callback: ({ success: boolean, data: string }) => void) {
    mappingFuction(person, attribute, value, cert, (result) => {
        let query = createUpdateQuery(result.data)
        let vaildatedQuery = validateUpdateQuery(query)
        if (vaildatedQuery != "") {
            // fetch('http://iamtestingbed.com:3030/MyData', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/sparql-update',
            //         "Accept": "*/*"

            //     },
            //     body: query
            // }).then(res => res).then(data => {
            //     callback({
            //         success: true,
            //         data: data
            //     })
            // }).catch((error) => {
            //     callback({
            //         success: false,
            //         data: error
            //     })
            // })
        } else {
            callback({
                success: false,
                data: "The Query did not validate"
            })
        }
    })
}

export default createMyData