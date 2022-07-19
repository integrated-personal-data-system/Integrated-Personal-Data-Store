import fetch from "node-fetch"
import mappingDeleteFuction from "./mappings/deletePatterns"
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


function deleteMyData(attribute: string, value: string, callback: ({ success: boolean, data: string }) => void) {
    let query = mappingDeleteFuction(attribute, value)
    let vaildatedQuery = validateUpdateQuery(query)

    if (vaildatedQuery != "") {
        fetch(`http://${process.env.API_LOCATION}:3030/MyData`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/sparql-update',
                "Accept": "*/*"

            },
            body: query
        }).then(res => res).then(data => {
            callback({
                success: true,
                data: data
            })
        }).catch((error) => {
            callback({
                success: false,
                data: error
            })
        })
    } else {
        callback({
            success: false,
            data: "Query Was Empty"
        })
    }

}


export default deleteMyData