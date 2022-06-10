// import fetch from "node-fetch"

function createMyData() {
    let data = { updateTriples: "prefix cco: <http://www.ontologyrepository.com/CommonCoreOntologies/> select * where { ?s ?p ?o }" }
    fetch('/createMyData', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(res => res.text()).then(data => {
        console.log(data)
    }).catch((error) => {
        console.log(error)
    })
}

export default createMyData