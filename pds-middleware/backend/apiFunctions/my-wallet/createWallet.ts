import { walletClient } from "./wallet"
import fetch from "node-fetch"
import validateQuery from "../queries/validateQuery"


function createWalletQuery(person: string, walletId: string) {
    try {
        let updateQuery = `PREFIX cco: <http://www.ontologyrepository.com/CommonCoreOntologies/>
PREFIX obo: <http://purl.obolibrary.org/obo/>
       
INSERT DATA
{ 
         <${person}> a cco:Person;
              cco:agent_in cco:ActOfOwnership_DigitalWallet_${walletId} . 
      
        cco:ActOfOwnership_DigitalWallet_${walletId} a cco:ActOfOwnership;
                obo:RO_0000057 cco:DigitalWallet_${walletId} .
      
    cco:DigitalWallet_${walletId}  a cco:DigitalWallet;
                     cco:designated_by cco:DigitalWallet_${walletId}_Desc . 
      
    cco:DigitalWallet_${walletId}_Desc a cco:DesignativeName ; 
                         obo:RO_0010001 cco:DigitalWallet_${walletId}_DescIBE . 
      
        cco:DigitalWallet_${walletId}_DescIBE cco:has_text_value "${walletId}" . 
    
}
        `
        return updateQuery
    } catch (error) {
        console.log("Could not create update query")
    }
}



async function createWallet(person: string, callback: ({ success: boolean, data: string }) => void) {
    try {
        let wallet = await walletClient.createWallet({
            ownerName: process.env.WALLET_OWNER,
            walletId: null
        });

        let query = createWalletQuery(person, wallet.walletId)
        console.log(query)
        let vaildatedQuery = validateQuery(query)
        console.log(vaildatedQuery)
        fetch(`http://${process.env.API_LOCATION}:3030/MyData`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/sparql-update',
                "Accept": "*/*"

            },
            body: vaildatedQuery
        }).then(res => res).then(data => {
            callback({
                success: true,
                data: { "value": wallet.walletId }
            })
        }).catch((error) => {
            callback({
                success: false,
                data: error
            })
        })
    } catch (error) {
        console.log(error)
        callback({
            success: false,
            data: error
        })
    }
}

export default createWallet