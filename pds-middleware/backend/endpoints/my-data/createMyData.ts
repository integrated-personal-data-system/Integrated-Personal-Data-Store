import fetch from "node-fetch"
import validateQuery from "../queries/validateQuery"
import { mappings } from '../../utils/serverConfig'
import { firstname, email, lastname } from './mappings/createDataMapping'


function generateTriples(person: string, attribute: string, value: string, verifiableCredentialId: string) {
    try {
        let attributeClean = mappings[attribute]
        console.log(attributeClean)
        let guid = encodeURIComponent(attributeClean + value + verifiableCredentialId)
        switch (attributeClean) {
            case "firstname": {
                let triples = firstname.replace(/{person}/g, person)
                triples = triples.replace(/{value}/g, value)
                triples = triples.replace(/{verfiableCredentialId}/g, verifiableCredentialId)
                triples = triples.replace(/{guid}/g, guid)
                return triples
            }
            case "email": {
                let triples = email.replace(/{person}/g, person)
                triples = triples.replace(/{value}/g, value)
                triples = triples.replace(/{verfiableCredentialId}/g, verifiableCredentialId)
                triples = triples.replace(/{guid}/g, guid)
                return triples
            }
            case "lastname": {
                let triples = lastname.replace(/{person}/g, person)
                triples = triples.replace(/{value}/g, value)
                triples = triples.replace(/{verfiableCredentialId}/g, verifiableCredentialId)
                triples = triples.replace(/{guid}/g, guid)
                return triples
            }
            case "birthday": {
                // let triples = pds_birthday(person, value, verifiableCredentialId)
                // return triples
            }
            case "mailingstreet": {
                // let triples = pds_mailingstreet(person, value, verifiableCredentialId)
                // return triples
            }
            case "mailingcity": {
                // let triples = pds_mailingcity(person, value, verifiableCredentialId)
                // return callback({
                //     success: true,
                //     data: triples
                // })
            }
            case "mailingstate": {
                // let triples = pds_mailingstate(person, value, verifiableCredentialId)
                // return callback({
                //     success: true,
                //     data: triples
                // })
            }
            case "mailingpostcode": {
                // let triples = pds_mailingpostcode(person, value, verifiableCredentialId)
                // return callback({
                //     success: true,
                //     data: triples
                // })
            }
            case "mailingcountry": {
                // let triples = pds_mailingcountry(person, value, verifiableCredentialId)
                // return callback({
                //     success: true,
                //     data: triples
                // })
            }
            case "homephonenumber": {
                // let triples = pds_homephonenumber(person, value, verifiableCredentialId)
                // return callback({
                //     success: true,
                //     data: triples
                // })
            }
            case "mobilephonenumber": {
                // let triples = pds_mobilephonenumber(person, value, verifiableCredentialId)
                // return callback({
                //     success: true,
                //     data: triples
                // })
            }
            case "employername": {
                // let triples = pds_employername(person, value, verifiableCredentialId)
                // return callback({
                //     success: true,
                //     data: triples
                // })
            }
            case "employeetitle": {
                // let triples = pds_employeetitle(person, value, verifiableCredentialId)
                // return callback({
                //     success: true,
                //     data: triples
                // })
            }
            case "weight": {
                // let triples = pds_weight(person, value, verifiableCredentialId)
                // return callback({
                //     success: true,
                //     data: triples
                // })
            }
            default: {
                return ""
            }
        }
    } catch (error) {
        console.log(error)
    }

}


function createUpdateQuery(triples: string) {
    try {
        let updateQuery = `PREFIX cco: <http://www.ontologyrepository.com/CommonCoreOntologies/>
PREFIX obo: <http://purl.obolibrary.org/obo/>
       
INSERT DATA
{ 
${triples}
}`
        return updateQuery
    } catch (error) {
        console.log("Could not create update query")
    }
}


function createMyData(person: string, attribute: string, value: string, verifiableCredentialId: string, callback: ({ success: boolean, data: string }) => void) {
    let triples = generateTriples(person, attribute, value, verifiableCredentialId)
    let query = createUpdateQuery(triples)
    let vaildatedQuery = validateQuery(query)
    console.log(vaildatedQuery)
    if (vaildatedQuery != "") {
        fetch(`http://${process.env.API_LOCATION}:3030/MyData`, {
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