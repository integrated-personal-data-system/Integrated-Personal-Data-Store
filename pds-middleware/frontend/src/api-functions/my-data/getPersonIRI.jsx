async function getPersonIRI() {
    const res = await fetch('/api/getPersonIRI', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application / json'
        },
    })

    let data = await res.json()
    console.log(data)
    return data

}

export default getPersonIRI