import { CloudWalletAnalyticsContract } from "@trinsic/service-clients/dist/provider/models/mappers";
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
    fetch(`http://${process.env.API_LOCATION}:3030/MyData/sparql`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/sparql-query',
            'Accept': 'application/json'
        },
        body: myDataQuery
    }).then(res => res.text()).then(data => {
        let jsonResults = JSON.parse(data)
        let walletArray = []
        for (let result of jsonResults.results.bindings) {
            walletArray.push(result.DigitalWalletId.value)
        }
        console.log(walletArray)
        callback({
            success: true,
            data: walletArray
        })

    }).catch((error) => {
        console.log(error)
        callback({
            success: false,
            data: { "value": null }
        })
    })
}

export default getWalletId