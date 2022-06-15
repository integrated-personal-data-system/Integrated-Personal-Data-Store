function createNewRSAKeys(person, keyPairName, passphrase) {
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