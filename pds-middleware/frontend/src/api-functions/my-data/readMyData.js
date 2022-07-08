async function readMyData() {
    const res = await fetch('/readMyData', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })

    let data = await res.json()
    let parsedReults = []
    // parsedReults.push({ "Person": data[0][Object.keys(data[0])[0]].value })
    for (let result of data) {
        let dataHeader = ""
        for (let attribute in result) {
            if (attribute != "Person" && attribute != "keyPairName" && attribute != "Signature") {
                dataHeader = attribute
            }
        }


        parsedReults.push({
            data: {
                attribute: dataHeader,
                value: result[dataHeader].value
            },
            signature: result.Signature.value,
            keyPairName: result.keyPairName.value

        })
    }
    return parsedReults
}

export default readMyData