function updateMyData(person, attribute, newValue, oldDataValue) {

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
        console.log(data)
    }).catch((error) => {
        console.log(error)
    })
}

export default updateMyData