import fetch from "node-fetch"
import validateQuery from "../queries/validateQuery"

/**
 * Create the update Query 
 * 
 * @param {string} walletId: The Id of the wallet 
 * @param {string} credentialName: The name of the Verifiable Credential
 * @param {string} credentialId: The Id of the Verifiable Credential
 * @returns: The update query that contains the triples for the Verifiable Credentials 
 * Status: Done
 * @CR
 */
function createQuery(walletId: string, credentialName: string, credentialId: string) {
    try {
        let updateQuery = `PREFIX cco: <http://www.ontologyrepository.com/CommonCoreOntologies/>
            PREFIX obo: <http://purl.obolibrary.org/obo/>
                
            INSERT DATA
            { 
                cco:DigitalWallet_${walletId} a cco:DigitalWallet ;
                    obo:RO_0001019 cco:VerifiableCredential_${credentialId} .

                cco:VerifiableCredential_${credentialId} a cco:VerifiableCredential ; 
                    cco:designated_by cco:VerifiableCredential_${credentialId}_CodeId ; 
                    cco:designated_by cco:VerifiableCredential_${credentialId}_Desc . 

                cco:VerifiableCredential_${credentialId}_CodeId a cco:CodeIdentifier;
                    cco:has_text_value "${credentialId}" . 

                cco:VerifiableCredential_${credentialId}_Desc a cco:DesignativeName;
                    cco:has_text_value "${credentialName}" . 
            }`
        return updateQuery
    } catch (error) {
        console.log("Could not create update query")
    }
}

/**
 * 
 * Creates the triples for a Verifiable Credential and uploads the triples into the triple store.
 * 
 * @param {string} walletId: The Id of the digital wallet
 * @param {string} credentialName: The name of the credential
 * @param {string }credentialId: the Id of the credential 
 * @param {function} callback: Callback function that handles 
 * Status: Need To Test
 * @CR
 */
async function createVerifiableCredentialsTriples(walletId: string, credentialName: string, credentialId: string, callback: ({ success: boolean, data: string }) => void) {
    try {
        let query = createQuery(walletId, credentialName, credentialId)
        let validatedQuery = validateQuery(query)
        fetch(`http://${process.env.API_LOCATION}:3030/MyData`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/sparql-update',
            },
            body: validatedQuery
        }).then(res => res).then(data => {
            callback({
                success: true,
                data: { "value": credentialId }
            })
        }).catch((error) => {
            callback({
                success: false,
                data: { "value": null }
            })
        })
    } catch (error) {
        console.log(error)
        callback({
            success: false,
            data: { "value": null }
        })
    }
}

export default createVerifiableCredentialsTriples