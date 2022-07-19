async function createNewRSAKeys(person, keyPairName, passphrase) {
    let uploadData = {
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
        body: JSON.stringify(uploadData)
    })

    let data = await res.json()
    if (data.value != null) {
        return data.value
    } else {
        return ""
    }
}

export default createNewRSAKeys