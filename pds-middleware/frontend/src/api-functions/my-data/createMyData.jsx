function createMyData(person, attribute, value, cert, callback) {

    let data = {
        "person": person,
        "attribute": attribute,
        "value": value,
        "cert": cert,
    }

    fetch('/api/createMyData', {
        method: 'POST',
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