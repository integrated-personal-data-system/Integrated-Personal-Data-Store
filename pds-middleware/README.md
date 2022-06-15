# Aries Personal Data Store

TODO 
1. Create Public and Private Key Pairs. Store them In database 
2. Test Create data
3. Create Crets by signing with pricate key (Keri Self Signing Certs)
3. Finshes delete mapping file (test deting data)
4. Create Update Data
5. FINSIH function createNewRSAKeys(person, keyPairName, passphrase) {
    let data = {
        "person": person,
        "keyPairName": keyPairName, 
        "passphrase": passphrase
    }
    fetch('/createWalletKeyPair', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    }).then(res => res.text()).then(data => {
        console.log(data)
    }).catch((error) => {
        console.log(error)
    })
}

export default  createNewRSAKeys

The webapp does not sent the perosn, keyPairName and passphrase
6. Uploadvalidation on fron end 
7. Render key Pairs on front end 