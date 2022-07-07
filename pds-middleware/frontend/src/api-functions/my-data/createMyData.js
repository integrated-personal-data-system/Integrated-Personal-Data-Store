function createMyData(person, attribute, value, cert) {

    let data = {
        "person": person,
        "attribute": attribute,
        "value": value,
        "cert": cert,
    }


    fetch('/createMyData', {
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

export default createMyData