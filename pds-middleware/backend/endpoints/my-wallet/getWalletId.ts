import fetch from "node-fetch"
import { walletClient } from "./wallet"

const myDataQuery = `PREFIX cco: <http://www.ontologyrepository.com/CommonCoreOntologies/>
PREFIX obo: <http://purl.obolibrary.org/obo/>

select ?DigitalWalletId  where{
    ?Person a cco:Person;
    cco:agent_in ?ActOfOwnership_DigitalWallet . 

    ?ActOfOwnership_DigitalWallet  a cco:ActOfOwnership;
      obo:RO_0000057 ?DigitalWallet .

    ?DigitalWallet  a cco:DigitalWallet;
           cco:designated_by ?DigitalWallet_Desc . 

    ?DigitalWallet_Desc a cco:DesignativeName ; 
    obo:RO_0010001 ?DigitalWallet_DescIBE . 

    ?DigitalWallet_DescIBE cco:has_text_value ?DigitalWalletId . 
 	
}`


async function getWalletId(callback: ({ success: boolean, data: string }) => void) {
    let wallets = await walletClient.listWallets();
    let trinsicWallets = []
    for (let wallet of wallets) {
        trinsicWallets.push(wallet.walletId)
    }
    console.log(trinsicWallets)

    callback({
        success: true,
        data: { "value": trinsicWallets }
    })
}

export default getWalletId