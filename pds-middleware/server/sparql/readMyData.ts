import fetch from "node-fetch"

const myDataQuery = `PREFIX cco: <http://www.ontologyrepository.com/CommonCoreOntologies/>
SELECT * WHERE
{ 
{
    SELECT ?Person ?FirstName WHERE 
    {
         ?Person a cco:Person ;
                 cco:designated_by ?PersonFullName; . 
                 
         ?PersonFullName a cco:PersonFullName ;
                  <http://purl.obolibrary.org/obo/BFO_0000051> ?PersonGivenName .
     		 ?PersonGivenName a cco:PersonGivenName ;
                  <http://purl.obolibrary.org/obo/RO_0010001>  ?PersonGivenNameIBE . 
 			 ?PersonGivenNameIBE cco:has_text_value ?FirstName. 
  
    }
}
UNION
{
   SELECT ?Person ?LastName WHERE 
    {
         ?Person a cco:Person ;
                 cco:designated_by ?PersonFullName; . 
                 
         ?PersonFullName a cco:PersonFullName ;
                  <http://purl.obolibrary.org/obo/BFO_0000051> ?PersonFamilyName.
     		?PersonFamilyName a cco:PersonFamilyName ;
                    <http://purl.obolibrary.org/obo/RO_0010001> ?PersonFamilyNameIBE. 
  
  			?PersonFamilyNameIBE cco:has_text_value ?LastName . 
  
    }
}
 UNION
{
   SELECT ?Person ?DateOfBirth WHERE 
    {
         ?Person a cco:Person ;
                 cco:is_object_of ?Birth. 
      ?Birth a cco:Birth;
         cco:occurs_on ?Birth_Day. 
  
  # Date Of Birth
  ?Birth_Day a cco:Day;
             cco:designated_by ?DataIdentifier . 
  
  ?DataIdentifier <http://purl.obolibrary.org/obo/RO_0010001> ?DataIdentifierIBE . 
  
  ?DataIdentifierIBE  cco:has_text_value ?DateOfBirth . 
        
  
    }
}
UNION
{
   SELECT ?Person ?HomeMailingAddress WHERE 
    {
         ?Person a cco:Person ;
                 cco:agent_in ?ActOfResiding . 
                 
     	 ?ActOfResiding a cco:ActOfResiding ; 
                 cco:has_object ?ResidentialFacility. 
  		?ResidentialFacility a cco:ResidentialFacility;
                        cco:designated_by ?StreetAddress1.
                        
   	  	?StreetAddress1 a cco:StreetAddress ; 
                  <http://purl.obolibrary.org/obo/RO_0010001> ?StreetAddress1IBE . 
  
 
 		 ?StreetAddress1IBE  cco:has_text_value ?HomeMailingAddress . 
    }
}
UNION
{
   SELECT ?Person ?HomePostalCode WHERE 
    {
         ?Person a cco:Person ;
                 cco:agent_in ?ActOfResiding . 
                 
     	 ?ActOfResiding a cco:ActOfResiding ; 
                 cco:has_object ?ResidentialFacility. 
  		?ResidentialFacility a cco:ResidentialFacility;
                       <http://purl.obolibrary.org/obo/RO_0001025> ?PostalZone1.
                        
   
 
 		 ?PostalZone1 a cco:PostalZone;
              cco:designated_by ?PostalZoneCode1.
  
  ?PostalZoneCode1 a cco:PostalCode;
                <http://purl.obolibrary.org/obo/RO_0010001> ?PostalZoneCode1IBE . 
  
  ?PostalZoneCode1IBE  cco:has_text_value ?HomePostalCode. 
  
    }
}
 UNION
{
   SELECT ?Person  ?HomeCity WHERE 
    {
         ?Person a cco:Person ;
                 cco:agent_in ?ActOfResiding . 
                 
     	 ?ActOfResiding a cco:ActOfResiding ; 
                 cco:has_object ?ResidentialFacility. 
  		?ResidentialFacility a cco:ResidentialFacility;
             <http://purl.obolibrary.org/obo/RO_0001025> ?LocalAdminRegion1. 
                       
 		# Admin Region
  ?LocalAdminRegion1 a cco:LocalAdministrativeRegion ; 
                     cco:designated_by ?LocalAdminRegion1DesName . 
                      #City 
  ?LocalAdminRegion1DesName a cco:DesignativeName;
                            <http://purl.obolibrary.org/obo/RO_0010001>  ?LocalAdminRegion1DesNameIBE. 
  
  ?LocalAdminRegion1DesNameIBE cco:has_text_value ?HomeCity . 
    }
}
 UNION
{
   SELECT ?Person  ?HomeState WHERE 
    {
         ?Person a cco:Person ;
                 cco:agent_in ?ActOfResiding . 
                 
     	 ?ActOfResiding a cco:ActOfResiding ; 
                 cco:has_object ?ResidentialFacility. 
  		?ResidentialFacility a cco:ResidentialFacility;
             <http://purl.obolibrary.org/obo/RO_0001025> ?LocalAdminRegion1. 
                       
 		# Admin Region
  ?LocalAdminRegion1 a cco:LocalAdministrativeRegion ; 
                     <http://purl.obolibrary.org/obo/BFO_0000050> ?LocalAdminRegion1StateCity . 
  
 ?LocalAdminRegion1StateCity a cco:State ; 
                              cco:designated_by ?LocalAdminRegion1StateCityDesc. 
  
  
 ?LocalAdminRegion1StateCityDesc a cco:DesignativeName ; 
                                  <http://purl.obolibrary.org/obo/RO_0010001>   ?LocalAdminRegion1StateCityDescIBE . 
  
  
  ?LocalAdminRegion1StateCityDescIBE cco:has_text_value ?HomeState. 
  
    }
}
  UNION
{
   SELECT ?Person  ?HomeCountry WHERE 
    {
         ?Person a cco:Person ;
                 cco:agent_in ?ActOfResiding . 
                 
     	 ?ActOfResiding a cco:ActOfResiding ; 
                 cco:has_object ?ResidentialFacility. 
  		?ResidentialFacility a cco:ResidentialFacility;
             <http://purl.obolibrary.org/obo/RO_0001025> ?LocalAdminRegion1. 
                       
 		# Admin Region
  ?LocalAdminRegion1 a cco:LocalAdministrativeRegion ; 
                     <http://purl.obolibrary.org/obo/BFO_0000050> ?LocalAdminRegion1StateCity . 
  
 ?LocalAdminRegion1StateCity a cco:State ; 
	<http://purl.obolibrary.org/obo/BFO_0000050> ?LocalAdminRegion1StateCountry. 
  ?LocalAdminRegion1StateCountry a cco:Country ; 
                cco:designated_by ?CountryDesc  . 
      
  ?CountryDesc a cco:DesignativeName ; 
    <http://purl.obolibrary.org/obo/RO_0010001> ?CountryDescIBE .  
  
  ?CountryDescIBE cco:has_text_value ?HomeCountry . 
  
    }
}     
}`

function readMyData(callback: ({ success: boolean, data: string }) => void) {
  fetch('http://localhost:3030/MyData/sparql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/sparql-query',
      'Accept': 'application/json'
    },
    body: myDataQuery
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