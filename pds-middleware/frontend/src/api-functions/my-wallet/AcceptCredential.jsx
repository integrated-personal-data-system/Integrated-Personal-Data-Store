async function AcceptCredential(walletId, credentialData) {
    let uploadData = {
        walletId: walletId,
        credentialData: credentialData
    }

    const res = await fetch('/api/AcceptCredential', {
        method: 'POST',
        headers: {
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

export default AcceptCredential