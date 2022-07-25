async function getPersonIRI() {
    const res = await fetch('/api/getPersonIRI', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })

    let data = await res.json()
    return data.value

}

export default getPersonIRI