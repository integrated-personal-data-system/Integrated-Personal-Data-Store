async function readMyData() {
    const res = await fetch('/api/readMyData', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application / json'
        },
    })

    let data = await res.json()

    let parsedReults = []

    if (data.length !== 0) {
        parsedReults.push({ "Person": data[0].Person.value })
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
    }
    // console.log(parsedReults)
    return parsedReults
}

export default readMyData