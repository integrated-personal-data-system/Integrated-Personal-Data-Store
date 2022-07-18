import {
    CredentialsServiceClient,
    ProviderServiceClient,
    WalletServiceClient,
    Credentials,
    ProviderCredentials
} from "@trinsic/service-clients"

import 'dotenv/config'

const sdk = require('api')('@trinsic/v1.0#1mld74kq6w8ws4');


// Credentials API
export const credentialsClient = new CredentialsServiceClient(
    new Credentials(process.env.TRINSIC_WALLET_API_KEY),
    { noRetryPolicy: true }
);


// Provider API
// const providerClient = new ProviderServiceClient(
//     new ProviderCredentials(providerKey),
//     { noRetryPolicy: true }
// );

// Wallet API
export const walletClient = new WalletServiceClient(
    new Credentials(process.env.TRINSIC_WALLET_API_KEY),
    { noRetryPolicy: true }
);


export async function createWallet() {
    let wallet = await walletClient.createWallet({
        ownerName: process.env.WALLET_OWNER,
        walletId: "Cdt1cAcLhMCCeq6G7Zlj9XZyijfzNHU6n"
    });
    // await walletClient.deleteWallet("Cdt1cAcLhMCCeq6G7Zlj9XZyijfzNHU6n");
    let wallets = await walletClient.listWallets();


    return wallets

}



export async function createNewCredentials() {
    let credential = credentialsClient
    // let connection = await credentialsClient.getConnection(connectionId);
    // let definitionId = "FirstName" // Use a definition id from your definitions
    // let connectionId = "Testbed"; // Can be null | <connection identifier>
    // let automaticIssuance = false;
    // let credentialValues = {
    //     "FirstName": "Jane",

    // };
    // let credential = await credentialsClient.createCredential({
    //     definitionId: definitionId,
    //     credentialValues: credentialValues
    // });
    return credential
}