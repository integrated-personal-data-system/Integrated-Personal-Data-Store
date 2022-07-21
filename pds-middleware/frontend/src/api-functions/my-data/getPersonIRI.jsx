async function getPersonIRI() {
    const res = await fetch('/api/getPersonIRI', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })

    if (!res.ok) {
        alert("Cannot Read Person IRI")
        return ""
    }

    let data = await res.json()
    return data.value

}

export default getPersonIRI