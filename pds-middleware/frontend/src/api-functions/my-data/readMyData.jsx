async function readMyData() {
    const res = await fetch('/api/readMyData', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })

    let data = await res.json()
    let parsedReults = {}

    for (let result of data) {
        let uriData = ""
        let verifiableCredential = ""
        let data = ""
        let header = ""
        for (let attribute in result) {
            if (result[attribute].type === "uri") {
                uriData = result[attribute].value
            } else if (attribute === "VerifiableCredential") {
                verifiableCredential = result[attribute].value
            } else {
                header = attribute
                data = result[attribute].value
            }
        }
        let myData = {
            [uriData]: {
                attribute: data,
                header: header,
                verifiableCredentials: [verifiableCredential]
            }
        }
        if (parsedReults[uriData] === undefined) {
            Object.assign(parsedReults, myData)

        } else {
            parsedReults[uriData].verifiableCredentials.push(verifiableCredential)
        }
    }
    return parsedReults
}

export default readMyData