async function createNewUser(callback) {

    const res = await fetch('/api/createNewUser', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })

    let data = await res.json()
    if (data.value != null) {
        return data.value
    } else {
        return ""
    }
}

export default createNewUser