async function readMyCerts() {
    const res = await fetch('/api/readMyCerts', {
        method: 'GET',
        headers: {
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

export default readMyCerts