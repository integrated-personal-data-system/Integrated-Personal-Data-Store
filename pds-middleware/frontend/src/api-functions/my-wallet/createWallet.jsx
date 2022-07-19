async function createWallet(personIRI) {
    let uploadData = {
        person: personIRI
    }

    const res = await fetch('/api/createWallet', {
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

export default createWallet