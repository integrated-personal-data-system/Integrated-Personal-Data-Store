async function createWallet(personIRI) {
    let data = {
        person: personIRI
    }

    const res = await fetch('/api/createWallet', {
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

export default createWallet