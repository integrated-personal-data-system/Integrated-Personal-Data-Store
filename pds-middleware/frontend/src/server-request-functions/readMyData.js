async function readMyData() {
    const res = await fetch('/readMyData', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })

    let data = await res.json()
    let parsedReults = []
    parsedReults.push({ "Person": data[0][Object.keys(data[0])[0]].value })
    for (let result of data) {
        parsedReults.push({ [Object.keys(result)[1]]: result[Object.keys(result)[1]].value })
    }
    return parsedReults
}

export default readMyData