async function getWalletID() {
    const res = await fetch('/api/getWallet', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },

    })

    if (!res.ok) {
        alert("Cannot Get Wallet")
        return ""
    }

    let data = await res.json()
    return data
}

export default getWalletID