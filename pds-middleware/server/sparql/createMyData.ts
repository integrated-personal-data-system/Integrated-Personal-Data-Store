import fetch from "node-fetch"
import mappingFuction from "../transformation/mapping"
import { Parser, Generator } from "sparqljs"


function validateUpdateQuery(query: string) {
    try {
        let parser = new Parser()
        var parsedQuery = parser.parse(query)
        var generator = new Generator()
        return generator.stringify(parsedQuery)
    } catch (error) {
        console.log("Your query has a syntax error")
        return ""

    }
}

function createUpdateQuery(triples: string){
    try{
        let updateQuery = `PREFIX cco: <http://www.ontologyrepository.com/CommonCoreOntologies/>
PREFIX obo: <http://purl.obolibrary.org/obo/>
       
INSERT DATA
{ 
${triples}
}
        `
        return updateQuery
    }catch(error){
        console.log("Could not create update query")
    }
}

function createMyData(person: string , attribute: string, value: string, callback: ({ success: boolean, data: string }) => void) {

    let triples = mappingFuction(person, attribute, value)
    let query = createUpdateQuery(triples)
    let vaildatedQuery = validateUpdateQuery(query)
    console.log(vaildatedQuery)
    if(vaildatedQuery != ""){
        fetch('http://localhost:3030/MyData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/sparql-update',
                "Accept": "*/*"

            },
            body: query
        }).then( res => res).then(data => {

            callback({
                success: true,
                data: data
            })
        }).catch((error) => {
            console.log(console.log(error) )
            callback({
                
                success: false,
                data: error
            })
        })
    }else{
        callback({
            success: false,
            data: "The Query did not validate"
        })
    }
   
}

export default createMyData