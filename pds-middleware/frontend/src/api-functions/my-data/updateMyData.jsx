function updateMyData(person, attribute, newValue, oldDataValue, callback) {

    let data = {
        "person": person,
        "attribute": attribute,
        "newDataValue": newValue,
        "oldDataValue": oldDataValue
    }


    fetch('/updateMyData', {
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

export default updateMyData