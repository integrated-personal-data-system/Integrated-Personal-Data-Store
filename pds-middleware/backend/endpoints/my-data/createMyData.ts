import fetch from "node-fetch"
import validateQuery from "../queries/validateQuery"
import {
    firstname,
    email,
    lastname,
    birthday,
    mailingstreet,
    mailingcity,
    mailingstate,
    mailingpostcode,
    mailingcountry,
    homephonenumber,
    mobilephonenumber,
    employername,
    employeetitle,
    weight
} from './mappings/createDataMapping'


function generateTriples(person: string, attribute: string, value: string, verifiableCredentialId: string) {
    try {

        let guid = encodeURIComponent(attribute + value) // Find a better way to make a quid
        switch (attribute) {
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
                let triples = birthday.replace(/{person}/g, person)
                triples = triples.replace(/{value}/g, value)
                triples = triples.replace(/{verfiableCredentialId}/g, verifiableCredentialId)
                triples = triples.replace(/{guid}/g, guid)
                return triples
            }
            case "mailingstreet": {
                let triples = mailingstreet.replace(/{person}/g, person)
                triples = triples.replace(/{value}/g, value)
                triples = triples.replace(/{verfiableCredentialId}/g, verifiableCredentialId)
                triples = triples.replace(/{guid}/g, guid)
                return triples
            }
            case "mailingcity": {
                let triples = mailingcity.replace(/{person}/g, person)
                triples = triples.replace(/{value}/g, value)
                triples = triples.replace(/{verfiableCredentialId}/g, verifiableCredentialId)
                triples = triples.replace(/{guid}/g, guid)
                return triples
            }
            case "mailingstate": {
                let triples = mailingstate.replace(/{person}/g, person)
                triples = triples.replace(/{value}/g, value)
                triples = triples.replace(/{verfiableCredentialId}/g, verifiableCredentialId)
                triples = triples.replace(/{guid}/g, guid)
                return triples
            }
            case "mailingpostcode": {
                let triples = mailingpostcode.replace(/{person}/g, person)
                triples = triples.replace(/{value}/g, value)
                triples = triples.replace(/{verfiableCredentialId}/g, verifiableCredentialId)
                triples = triples.replace(/{guid}/g, guid)
                return triples
            }
            case "mailingcountry": {
                let triples = mailingcountry.replace(/{person}/g, person)
                triples = triples.replace(/{value}/g, value)
                triples = triples.replace(/{verfiableCredentialId}/g, verifiableCredentialId)
                triples = triples.replace(/{guid}/g, guid)
                return triples
            }
            case "homephonenumber": {
                let triples = homephonenumber.replace(/{person}/g, person)
                triples = triples.replace(/{value}/g, value)
                triples = triples.replace(/{verfiableCredentialId}/g, verifiableCredentialId)
                triples = triples.replace(/{guid}/g, guid)
                return triples
            }
            case "mobilephonenumber": {
                let triples = mobilephonenumber.replace(/{person}/g, person)
                triples = triples.replace(/{value}/g, value)
                triples = triples.replace(/{verfiableCredentialId}/g, verifiableCredentialId)
                triples = triples.replace(/{guid}/g, guid)
                return triples
            }
            case "employername": {
                let triples = employername.replace(/{person}/g, person)
                triples = triples.replace(/{value}/g, value)
                triples = triples.replace(/{verfiableCredentialId}/g, verifiableCredentialId)
                triples = triples.replace(/{guid}/g, guid)
                return triples
            }
            case "employeetitle": {
                let triples = employeetitle.replace(/{person}/g, person)
                triples = triples.replace(/{value}/g, value)
                triples = triples.replace(/{verfiableCredentialId}/g, verifiableCredentialId)
                triples = triples.replace(/{guid}/g, guid)
                return triples
            }
            case "weight": {
                let triples = weight.replace(/{person}/g, person)
                triples = triples.replace(/{value}/g, value)
                triples = triples.replace(/{verfiableCredentialId}/g, verifiableCredentialId)
                triples = triples.replace(/{guid}/g, guid)
                return triples
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
    console.log(query)
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