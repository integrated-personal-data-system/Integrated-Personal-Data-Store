async function readMyCerts() {
    const res = await fetch('/api/readMyCerts', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })

    let data = await res.json()
    if (data.data.length === 0) {
        return null
    } else {
        return data.data
    }
}

export default readMyCerts