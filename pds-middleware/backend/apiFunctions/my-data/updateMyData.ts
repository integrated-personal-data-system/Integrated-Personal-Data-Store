import fetch from "node-fetch"
import mappingUpdateFunction from "./mappings/updatePattern"
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

export function updateMyData(person: string, attribute: string, newDataValue: string, oldDataValue: string, callback: ({ success: boolean, data: string }) => void) {
    let query = mappingUpdateFunction(attribute, newDataValue, oldDataValue)
    let validatedQuery = validateUpdateQuery(query)

    if (validatedQuery != "") {
        fetch('http://iamtestingbed.com:3030/MyData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/sparql-update',
                "Accept": "*/*"
            },
            body: validatedQuery
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
            data: "The Query did not validate"
        })
    }
}

