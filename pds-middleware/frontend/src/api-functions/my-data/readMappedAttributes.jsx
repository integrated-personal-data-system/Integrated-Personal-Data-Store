async function readMappedAttributes() {
    const res = await fetch('/readMappedAttributes', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })

    let data = await res.json()
    return data.attrList
}

export default readMappedAttributes