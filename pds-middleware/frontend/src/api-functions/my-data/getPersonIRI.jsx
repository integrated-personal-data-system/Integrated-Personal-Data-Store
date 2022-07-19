async function getPersonIRI() {
    const res = await fetch('/api/getPersonIRI', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application / json'
        },
    })

    let data = await res.json()
    if (data.value != null) {
        return data.value
    } else {
        return ""
    }
}

export default getPersonIRI