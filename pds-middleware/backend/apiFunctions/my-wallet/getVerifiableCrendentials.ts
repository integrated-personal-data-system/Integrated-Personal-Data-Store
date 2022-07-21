import { CloudWalletAnalyticsContract } from "@trinsic/service-clients/dist/provider/models/mappers";
import fetch from "node-fetch"
import { walletClient, credentialsClient } from "./wallet"




async function getVerifiableCredentials(walletId: string, callback: ({ success: boolean, data: string }) => void) {
    console.log(walletId)
    // let credentials = await walletClient.listCredentials(walletId);
    // let invitation = "https://trinsic.studio/url/345571af-a237-46de-b86f-8c507a11a109"
    // let connections = await walletClient.listConnections(walletId);
    let connectionId = null; // Can be null | <connection identifier>
    let state = null; // Can be null | "Offered" | "Requested" | "Issued" | "Rejected" | "Revoked"
    // let definitionId = null; // Can be null | <definition identifier>
    // let credentials = await credentialsClient.listCredentials(connectionId, state);
    // let credential = await walletClient.acceptCredentialOffer(walletId, );
    // let credential = await walletClient.acceptCredential("Cm5dqpvaYm4Speu9Bbv1uibWJbQ0KRbMK", "https://trinsic.studio/url/e6b92711-2752-40c5-94d0-90fbb667f9f0");
    // let credential = await walletClient.acceptCredentialOffer(walletId, "FRbz26DBS4CjRxQDdaUgjc:2:MISMO Mortgage Loans:1.0");
    // let credential = await walletClient.acceptCredential(walletId, credentialData);
    let wallets = await walletClient.listWallets();
    // console.log(credential)
    // console.log(wallets)

    // let credential = await walletClient.acceptCredentialOffer(walletId, btoa("FRbz26DBS4CjRxQDdaUgjc:3:CL:51565:Default"));
    // let connection = await walletClient.acceptInvitation(walletId, invitation);
    // let credential = await walletClient.acceptCredential(walletId, "FRbz26DBS4CjRxQDdaUgjc:3:CL:51565:Default");
    // let connections = await walletClient.listConnections(walletId);
    // walletClient.deleteCredential("Cm5dqpvaYm4Speu9Bbv1uibWJbQ0KRbMK", "a8ccc3b1-5115-418b-b65c-6fe17adee3c8");
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