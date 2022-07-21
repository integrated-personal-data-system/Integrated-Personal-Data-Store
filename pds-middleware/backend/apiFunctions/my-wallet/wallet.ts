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

