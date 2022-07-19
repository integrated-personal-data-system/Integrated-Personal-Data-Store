async function readMappedAttributes() {
    const res = await fetch('/api/readMappedAttributes', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })

    let data = await res.json()
    return data.attrList
}

export default readMappedAttributes