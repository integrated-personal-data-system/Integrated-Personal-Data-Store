import fetch from "node-fetch"
import { mappings } from "./mappings/mappings"
import validateQuery from "../queries/validateQuery"

function readMyData(callback: ({ success: boolean, data: string }) => void) {
	let index = 0
	let fullQuery = `PREFIX cco: <http://www.ontologyrepository.com/CommonCoreOntologies/>
	PREFIX obo: <http://purl.obolibrary.org/obo/>
	SELECT * WHERE { 
	{`
	for (let element in mappings) {
		let query = ""
		if (index === 0) {
			query = `
				${mappings[element].ReadQuery}
		   }`

		} else {
			query = `UNION {
				${mappings[element].ReadQuery}
		   }`
		}
		fullQuery += query
		index++
	}

	fullQuery += "}"
	let results = validateQuery(fullQuery)

	fetch(`http://${process.env.API_LOCATION}:3030/MyData/sparql`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/sparql-query',
			'Accept': 'application/json'
		},
		body: fullQuery
	}).then(res => res.text()).then(data => {
		let jsonResults = JSON.parse(data)
		callback({
			success: true,
			data: jsonResults.results.bindings
		})
	}).catch((error) => {
		callback({
			success: false,
			data: error
		})
	})
}

export default readMyData 