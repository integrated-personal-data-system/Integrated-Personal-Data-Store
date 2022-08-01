function createMyData(person, attribute, value, verifiableCredentialId, callback) {
    let data = {
        "person": person,
        "attribute": attribute,
        "value": value,
        "verifiableCredentialId": verifiableCredentialId,
    }
    fetch('/api/createMyData', {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(res => res.text()).then(data => {
        callback({
            data: data
        })

    }).catch((error) => {
        callback({
            data: error
        })
    })
}

export default createMyData