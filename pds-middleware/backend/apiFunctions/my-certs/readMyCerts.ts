import fetch from "node-fetch"

const allCertsQuery = `PREFIX cco: <http://www.ontologyrepository.com/CommonCoreOntologies/>
PREFIX obo: <http://purl.obolibrary.org/obo/>

select ?Person ?KeyPairName where{
 	?Person a cco:Person;
          cco:agent_in ?ActOfOwnerShip. 
  
  ?ActOfOwnerShip a cco:ActOfOwnership;
  obo:RO_0000057 ?RSAKeyPairIRI .
  
  ?RSAKeyPairIRI a cco:RSAKeyPair ;
                cco:designated_by ?RSAKeyPairDESC . 

  
  ?RSAKeyPairDESC a cco:DesignativeName;
                  obo:RO_0010001  ?RSAKeyPairDESCIBE . 
            
  ?RSAKeyPairDESCIBE cco:has_text_value ?KeyPairName
           
}`

function createCertQuery(certName) {
    let query = `PREFIX cco: <http://www.ontologyrepository.com/CommonCoreOntologies/>
    PREFIX obo: <http://purl.obolibrary.org/obo/>
    
    select ?KeyPairName ?PrivateKey ?PublicKey where{
         ?Person a cco:Person;
              cco:agent_in ?ActOfOwnerShip. 
      
      ?ActOfOwnerShip a cco:ActOfOwnership;
        obo:RO_0000057 ?RSAKeyPairIRI .
      
      ?RSAKeyPairIRI a cco:RSAKeyPair ;
        obo:RO_0000057 ?PrivateKeyIRI ; 
        obo:RO_0000057 ?PublicKeyIRI ; 
                    cco:designated_by ?RSAKeyPairDESC . 
    
      
      ?PrivateKeyIRI a cco:RSAPrivateKey ; 
            cco:has_text_value ?PrivateKey .
      
      ?PublicKeyIRI a cco:RSAPublicKey;
                   cco:has_text_value ?PublicKey .
      
      
      ?RSAKeyPairDESC a cco:DesignativeName;
                      obo:RO_0010001  ?RSAKeyPairDESCIBE . 
                
      ?RSAKeyPairDESCIBE cco:has_text_value "${certName.replace(/\s/g, '')}" .
               
      
         
    }`
    return query
}

export function readCertByName(certName: string, callback: ({ success: boolean, data: string }) => void) {
    let query = createCertQuery(certName)
    fetch(`http://${process.env.API_LOCATION}:3030/MyData/sparql`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/sparql-query',
            'Accept': 'application/json'
        },
        body: query
    }).then(res => res.text()).then(data => {
        let jsonResults = JSON.parse(data)
        console.log(jsonResults.results.bindings[0])
        if (jsonResults.results.bindings[0] != undefined) {
            callback({
                success: true,
                data: jsonResults.results.bindings[0]
            })
        } else {
            callback({
                success: false,
                data: ""
            })
        }


    }).catch((error) => {
        callback({
            success: false,
            data: error
        })
    })
}

export function readMyCerts(callback: ({ success: boolean, data: string }) => void) {
    fetch(`http://${process.env.API_LOCATION}:3030/MyData/sparql`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/sparql-query',
            'Accept': 'application/json'
        },
        body: allCertsQuery
    }).then(res => res.text()).then(data => {
        let jsonResults = JSON.parse(data)
        if (jsonResults.results.bindings[0] != undefined) {
            let keyPairArray = []
            for (let keyPairs of jsonResults.results.bindings) {
                keyPairArray.push(keyPairs["KeyPairName"].value)
            }
            callback({
                success: true,
                data: { "value": keyPairArray }
            })
        } else {
            callback({
                success: true,
                data: { "value": [] }
            })
        }

    }).catch((error) => {
        console.log(error)
        callback({
            success: false,
            data: { "value": "Could Not Read Data" }
        })
    })
}

