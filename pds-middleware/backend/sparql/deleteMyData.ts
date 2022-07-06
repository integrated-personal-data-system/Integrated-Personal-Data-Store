import fetch from "node-fetch"
import mappingDeleteFuction from "../transformation/deletePatterns"

function deleteMyData(attribute: string, value: string, callback: ({ success: boolean, data: string }) => void) {
    let query = mappingDeleteFuction(attribute, value)
    console.log(query)
    if (query != "") {
        fetch('http://localhost:3030/MyData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/sparql-update',
                "Accept": "*/*"

            },
            body: query
        }).then(res => res).then(data => {
            callback({
                success: true,
                data: data
            })
        }).catch((error) => {
            console.log(console.log(error))
            callback({
                success: false,
                data: error
            })
        })
    } else {
        callback({
            success: false,
            data: "Query Was Empty"
        })
    }

}


export default deleteMyData