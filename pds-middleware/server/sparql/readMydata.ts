import fetch from "node-fetch"


function readMyData(callback: ({ success: boolean, data: string }) => void) {
    fetch('http://localhost:3030/MyData/sparql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/sparql-query',
            'Accept': 'application/json'
        },
        body: "prefix cco: <http://www.ontologyrepository.com/CommonCoreOntologies/> select * where { ?s ?p ?o }"
    }).then(res => res.text()).then(data => {
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

export default readMyData