import fetch from "node-fetch"


const myDataQuery = `PREFIX cco: <http://www.ontologyrepository.com/CommonCoreOntologies/>
PREFIX obo: <http://purl.obolibrary.org/obo/>
select ?Person where{
  ?Person a cco:Person . 
}`


function getPersonIRI(callback: ({ success: boolean, data: string }) => void) {
    fetch(`http://${process.env.API_LOCATION}:3030/MyData/sparql`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/sparql-query',
            'Accept': 'application/json'
        },
        body: myDataQuery
    }).then(res => res.text()).then(data => {
        let jsonResults = JSON.parse(data)
        if (jsonResults.results.bindings[0] != undefined) {
            callback({
                success: true,
                data: { "value": jsonResults.results.bindings[0].Person.value }
            })
        } else {
            callback({
                success: true,
                data: { "value": null }
            })
        }


    }).catch((error) => {
        callback({
            success: false,
            data: { "value ": "Failed to Read Person IRI" }
        })
    })
}

export default getPersonIRI