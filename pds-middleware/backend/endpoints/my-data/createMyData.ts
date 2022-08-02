import fetch from "node-fetch"
import validateQuery from "../queries/validateQuery"
import { mappings } from "./mappings/mappings"




function createMyData(person: string, attribute: string, value: string, verifiableCredentialId: string, callback: ({ success: boolean, data: string }) => void) {
    let createQuery = mappings[attribute].CreateQuery
    let guid = encodeURIComponent(attribute + value)
    let completeQuery = createQuery.replace(/{person}/g, person)
    completeQuery = completeQuery.replace(/{value}/g, value)
    completeQuery = completeQuery.replace(/{verfiableCredentialId}/g, verifiableCredentialId)
    completeQuery = completeQuery.replace(/{guid}/g, guid)
    let vaildatedQuery = validateQuery(completeQuery)



    console.log(completeQuery)
    if (vaildatedQuery != "") {
        fetch(`http://${process.env.API_LOCATION}:3030/MyData`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/sparql-update',
                "Accept": "*/*"

            },
            body: completeQuery
        }).then(res => res).then(data => {
            callback({
                success: true,
                data: data
            })
        }).catch((error) => {
            callback({
                success: false,
                data: error
            })
        })
    } else {
        callback({
            success: false,
            data: "The Query did not validate"
        })
    }
}

export default createMyData