async function readMyData() {
    const res = await fetch('/readMyData', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })

    let data = await res.json()
    let parsedReults = []
    for (let result in data) {
        parsedReults.push({ [result]: data[result].value })
    }
    return parsedReults
}

export default readMyData