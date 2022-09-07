import { walletClient } from "./wallet"
import fetch from "node-fetch"
import validateQuery from "../queries/validateQuery"

/**
 * Creates the update query to insert the triples for a persons Digital Wallet
 * 
 * @param {string} personIRI: The IRI of the person
 * @param {string} walletId: The ID of the digital wallet
 * @returns {string} The update query with the digital wallet triples
 * Status: Done
 * @CR
 */
function createQuery(personIRI: string, walletId: string) {
    try {
        let updateQuery = `PREFIX cco: <http://www.ontologyrepository.com/CommonCoreOntologies/>
            PREFIX obo: <http://purl.obolibrary.org/obo/>
                
            INSERT DATA
            { 
                <${personIRI}> cco:agent_in  cco:ActOfOwnership_DigitalWallet_${walletId}   .
                
                 cco:ActOfOwnership_DigitalWallet_${walletId}   a cco:ActOfOwnership ; 
                    obo:RO_0000057  cco:DigitalWallet_${walletId}  . 

                 cco:DigitalWallet_${walletId}   a cco:DigitalWallet ;
                    cco:designated_by  cco:DigitalWallet_${walletId}_Desc  . 

                 cco:DigitalWallet_${walletId}_Desc  a cco:DesignativeName;
                    obo:RO_0010001  cco:DigitalWallet_${walletId}_Desc_IBE  .

                 cco:DigitalWallet_${walletId}_Desc_IBE  a cco:InformationBearingEntity ;
                    cco:has_text_value "${walletId}" . 
            }`
        return updateQuery
    } catch (error) {
        console.log("Could not create update query")
    }
}

/**
 * 
 * Creates the triples for a Digital Wallet and uploads the triples into the triple store.
 * 
 * @param {string} personIRI: The IRI for the person
 * @param {string} walletId: The Id of the digital wallet
 * @param {function} callback: Callback function that handles 
 * Status: Need To Test
 * @CR
 */
async function createWalletTriples(personIRI: string, walletId: string, callback: ({ success: boolean, data: string }) => void) {
    try {
        let query = createQuery(personIRI, walletId)
        let validatedQuery = validateQuery(query)
        console.log(validatedQuery)
        if (validatedQuery !== "") {
            fetch(`http://${process.env.API_LOCATION}:3030/MyData`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/sparql-update',
                },
                body: validatedQuery
            }).then(res => res).then(data => {
                console.log(data)
                callback({
                    success: true,
                    data: { "value": walletId }
                })
            }).catch((error) => {
                callback({
                    success: false,
                    data: { "value": null }
                })
            })
        }
    } catch (error) {
        console.log(error)
        callback({
            success: false,
            data: { "value": null }
        })
    }
}



export default createWalletTriples