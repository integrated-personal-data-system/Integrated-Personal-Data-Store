import { generateKeyPairSync, createPrivateKey, createPublicKey, createSign, createVerify } from "crypto"
import fetch from "node-fetch"
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

function uploadRSAKeys(person: string, keyPairName: string, publicKey: string, encryptedPrivateKey: string) {
    try {

        let query = `PREFIX cco: <http://www.ontologyrepository.com/CommonCoreOntologies/>
        PREFIX obo: <http://purl.obolibrary.org/obo/>
            
        INSERT DATA
        { 
            <${person}> a cco:Person ;
                cco:agent_in cco:ActOfOwnership_${keyPairName} . 

            cco:ActOfOwnership_${keyPairName} a cco:ActOfOwnership;
                cco:has_object cco:RSAKeyPair_${keyPairName} . 
            
            cco:RSAKeyPair_${keyPairName} a cco:RSAKeyPair ;
                cco:has_object cco:RSAPublicKey_${keyPairName} ;
                cco:has_object cco:RSAPrivateKey_${keyPairName} ; 
                cco:designated_by cco:RSAKeyPairDesc_${keyPairName} . 

            cco:RSAKeyPairDesc_${keyPairName} a cco:DesignativeName;
                obo:RO_0010001 cco:InformationBearingEntity_RSAKeyPairDesc_${keyPairName} .
            
            cco:InformationBearingEntity_RSAKeyPairDesc_${keyPairName} a cco:InformationBearingEntity ;
            cco:has_text_value "${keyPairName}". 

            cco:RSAPublicKey_${keyPairName} a cco:RSAPublicKey ; 
                cco:has_text_value "${publicKey}". 

            cco:RSAPrivateKey_${keyPairName} a cco:RSAPrivateKey ; 
            cco:has_text_value "${encryptedPrivateKey}". 
        }
        `

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
                console.log("uploaded Key Pair")
                return true
            }).catch((error) => {
                console.log(console.log(error))
                return false
            })
        }

    } catch (error) {
        console.log(error)
        return false
    }
}

function createRSAKeyPair(person: string, keyPairName: string, passphrase: string, callback: ({ success: boolean, data: string }) => void) {
    try {
        // TODO Hash and salt passphrase
        const {
            publicKey,
            privateKey,
        } = generateKeyPairSync('rsa', {
            modulusLength: 4096,
            publicKeyEncoding: {
                type: 'spki',
                format: 'pem'
            },
            privateKeyEncoding: {
                type: 'pkcs8',
                format: 'pem',
            }
        });


        let sparqlReadyPrivateKey = privateKey.replace(/[\n]/g, "")
        let sparqlReadyPublicKey = publicKey.replace(/[\n]/g, "")

        // let two = cleanPrivateKey.replace("-----BEGIN PRIVATE KEY-----", "-----BEGIN PRIVATE KEY-----\n")
        // let three = two.replace("-----END PRIVATE KEY-----", "\n-----END PRIVATE KEY-----")

        // // let privateKeyTest = createPrivateKey(three)
        // // console.log(privateKeyTest)
        // // const sign = createSign('SHA256');
        // // sign.update('some data to sign');
        // // sign.end();
        // // const signature = sign.sign(privateKey, "hex");
        // // console.log(signature)

        // // const verify = createVerify('SHA256');
        // // verify.update('some data to sign');
        // // verify.end();
        // // console.log(verify.verify(publicKey, signature, "hex"));

        // // let pubkicKeyTest = createPublicKey(publicKey)

        // // console.log(privateKeyTest)
        // // console.log(pubkicKeyTest)

        uploadRSAKeys(person, keyPairName, sparqlReadyPublicKey, sparqlReadyPrivateKey)


    } catch (error) {
        console.log(error)
    }
}


export default createRSAKeyPair