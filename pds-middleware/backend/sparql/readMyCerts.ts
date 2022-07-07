import fetch from "node-fetch"
import { createBootstrapComponent } from "react-bootstrap/esm/ThemeProvider"

const myDataQuery = `PREFIX cco: <http://www.ontologyrepository.com/CommonCoreOntologies/>

select ?Person ?KeyPair ?PublicKey ?PrivateKey where{
 	?Person a cco:Person;
          cco:agent_in ?ActOfOwnerShip. 
  
 	?ActOfOwnerShip a cco:ActOfOwnership ;
  		cco:has_object ?RSAKeyPair. 
  
  	?RSAKeyPair a cco:RSAKeyPair ;
               cco:designated_by  ?KeyPairDesc ;
               cco:has_object ?PublicKeyIBA;
               cco:has_object ?PrivateKeyIBA. 
  
  ?KeyPairDesc a cco:DesignativeName;
               <http://purl.obolibrary.org/obo/RO_0010001> ?KeyPairDescIBE.
  
  ?KeyPairDescIBE cco:has_text_value ?KeyPair . 
  
    ?PublicKeyIBA a cco:RSAPublicKey;
               cco:has_text_value ?PublicKey.
  
  ?PrivateKeyIBA a cco:RSAPrivateKey;
               cco:has_text_value ?PrivateKey.
}`

function readMyCerts(callback: ({ success: boolean, data: string }) => void) {
    fetch('http://iamtestingbed.com:3030/MyData/sparql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/sparql-query',
            'Accept': 'application/json'
        },
        body: myDataQuery
    }).then(res => res.text()).then(data => {
        let jsonResults = JSON.parse(data)
        let keyPairArray = []
        for (let keyPairs of jsonResults.results.bindings) {
            let ParseKeyPairObj = {
                person: keyPairs["Person"].value,
                keyPairName: keyPairs["KeyPair"].value,
                publicKey: keyPairs["PublicKey"].value
            }
            keyPairArray.push(ParseKeyPairObj)
        }

        callback({
            success: true,
            data: keyPairArray
        })
    }).catch((error) => {
        callback({
            success: false,
            data: error
        })
    })
}

export default readMyCerts