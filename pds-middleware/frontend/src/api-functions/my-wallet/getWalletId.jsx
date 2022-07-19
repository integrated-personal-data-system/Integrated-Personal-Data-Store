async function getWalletID() {
    const res = await fetch('/api/getWalletId', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },

    })

    let data = await res.json()

    if (data.value !== null) {
        return data.value
    } else {
        return ""
    }

}

export default getWalletID