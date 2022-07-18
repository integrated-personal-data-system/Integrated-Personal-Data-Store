function createNewUser(callback) {
    fetch('/createNewUser', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    }).then(res => res.text()).then(data => {
        callback({
            success: true,
            person: data
        })
    }).catch((error) => {
        console.log(error)
    })
}

export default createNewUser