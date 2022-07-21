async function getVerifiableCrednetials(walletId) {
    console.log(walletId)
    let uploadData = {
        walletId: walletId
    }
    const res = await fetch('api/listCredentialsInWallet', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(uploadData)
    })

    if (!res.ok) {
        alert("Cannot Get VCs")
        return ""
    }

    let data = await res.json()
    return data
}

export default getVerifiableCrednetials