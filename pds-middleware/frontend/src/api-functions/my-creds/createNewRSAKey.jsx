async function createNewRSAKeys(person, keyPairName, passphrase) {
    let data = {
        "person": person,
        "keyPairName": keyPairName.replace(/\s/g, ''),
        "passphrase": passphrase
    }

    const res = await fetch('/api/createWalletKeyPair', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    let resData = await res.json()
    return resData.data
}

export default createNewRSAKeys