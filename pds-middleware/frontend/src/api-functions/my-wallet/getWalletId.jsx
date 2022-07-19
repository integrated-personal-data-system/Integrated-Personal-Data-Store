async function getWalletID() {
    const res = await fetch('/api/getWalletId', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },

    })

    let resData = await res.json()
    if (resData.data.length === 0) {
        return null
    } else {
        return resData.data
    }
    return resData.data
}

export default getWalletID