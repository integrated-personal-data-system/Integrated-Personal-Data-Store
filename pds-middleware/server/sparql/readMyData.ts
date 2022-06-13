import fetch from "node-fetch"

const myDataQuery = `PREFIX cco:<http://www.ontologyrepository.com/CommonCoreOntologies/>

SELECT ?Person ?FirstName ?LastName ?p ?o
WHERE {
  ?Person a cco:Person;
    cco:designated_by ?PersonFullName. 
  
  ?PersonFullName a cco:PersonFullName;
    <http://purl.obolibrary.org/obo/BFO_0000051> ?PersonGivenName;
    <http://purl.obolibrary.org/obo/BFO_0000051> ?PersonFamilyName. 
  
  ?PersonFamilyName a cco:PersonFamilyName;
    <http://purl.obolibrary.org/obo/RO_0010001> ?PersonFamilyNameIBE. 
  
  ?PersonFamilyNameIBE cco:has_text_value ?LastName. 
  
  ?PersonGivenName a cco:PersonGivenName;
    <http://purl.obolibrary.org/obo/RO_0010001>  ?PersonGivenNameIBE . 
  ?PersonGivenNameIBE cco:has_text_value ?FirstName
}`

function readMyData(callback: ({ success: boolean, data: string }) => void) {
    fetch('http://localhost:3030/MyData/sparql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/sparql-query',
            'Accept': 'application/json'
        },
        body: myDataQuery
    }).then(res => res.text()).then(data => {
        let jsonResults = JSON.parse(data)
        callback({
            success: true,
            data: jsonResults.results.bindings[0]
        })
    }).catch((error) => {
        callback({
            success: false,
            data: error
        })
    })
}

export default readMyData 