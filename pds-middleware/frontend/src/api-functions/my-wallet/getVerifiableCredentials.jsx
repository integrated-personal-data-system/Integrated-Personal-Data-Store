async function getVerifiableCrednetials(walletId) {
    let uploadData = {
        walletId: walletId
    }
    const res = await fetch('/api/getVerfiableCredentials', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(uploadData)
    })

    let data = await res.json()

    if (data.value !== null) {
        return data.value
    } else {
        return ""
    }

}

export default getVerifiableCrednetials