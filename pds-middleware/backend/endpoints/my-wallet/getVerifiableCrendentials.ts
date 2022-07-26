import { CloudWalletAnalyticsContract } from "@trinsic/service-clients/dist/provider/models/mappers";
import fetch from "node-fetch"
import { walletClient, credentialsClient } from "./wallet"




async function getVerifiableCredentials(walletId: string, callback: ({ success: boolean, data: string }) => void) {
    console.log(walletId)

    let wallets = await walletClient.listWallets();
    let credentials = await walletClient.listCredentials("Cm5dqpvaYm4Speu9Bbv1uibWJbQ0KRbMK");
    console.log(credentials)
    // console.log(connections)
    // callback({
    //     success: true,
    //     data: { "value": credentials }
    // })

    // fetch(`http://${process.env.API_LOCATION}:3030/MyData/sparql`, {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/sparql-query',
    //         'Accept': 'application/json'
    //     },
    //     body: myDataQuery
    // }).then(res => res.text()).then(data => {
    //     let jsonResults = JSON.parse(data)
    //     let walletArray = []
    //     for (let result of jsonResults.results.bindings) {
    //         walletArray.push(result.DigitalWalletId.value)
    //     }
    //     callback({
    //         success: true,
    //         data: { "value": walletArray }
    //     })

    // }).catch((error) => {
    //     console.log(error)
    //     callback({
    //         success: false,
    //         data: { "value": null }
    //     })
    // })
}

export default getVerifiableCredentials