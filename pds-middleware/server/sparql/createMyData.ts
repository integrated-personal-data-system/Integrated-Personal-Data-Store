import fetch from "node-fetch"
import { Parser, Generator } from "sparqljs"

function validateUpdateQuery(query: string) {
    try {
        let parser = new Parser()
        var parsedQuery = parser.parse(query)
        console.log(parsedQuery)
        var generator = new Generator()
        return generator.stringify(parsedQuery)
    } catch (error) {
        console.log("Your query has a syntax error")

    }
}

function createMyData(updateQuery: string, callback: ({ success: boolean, data: string }) => void) {
    let vaildatedQuery = validateUpdateQuery(updateQuery)
    fetch('http://localhost:3030/MyData/sparql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/sparql-query',
            'Accept': 'application/json'
        },
        body: vaildatedQuery
    }).then(res => res.text()).then(data => {
        console.log(data)
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
}

export default createMyData