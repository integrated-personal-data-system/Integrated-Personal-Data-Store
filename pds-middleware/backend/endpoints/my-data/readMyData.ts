import fetch from "node-fetch"


const myDataQuery = `PREFIX cco: <http://www.ontologyrepository.com/CommonCoreOntologies/>
PREFIX obo: <http://purl.obolibrary.org/obo/>
SELECT * WHERE { 
{
  SELECT ?PersonGivenNameIRI ?FirstName ?VerifiableCredential ?o WHERE {
	?Person a cco:Person ;
		cco:designated_by ?PersonFullName; .  

	?PersonFullName a cco:PersonFullName ;
		<http://purl.obolibrary.org/obo/BFO_0000051> ?PersonGivenNameIRI .

	?PersonGivenNameIRI a cco:PersonGivenName ;
		<http://purl.obolibrary.org/obo/RO_0010001>  ?PersonGivenNameIBE . 

	?PersonGivenNameIBE cco:has_text_value ?FirstName;
		obo:BFO_0000050 ?VerifiableCredentialIRI. 

	?VerifiableCredentialIRI cco:designated_by ?VerifiableCredential_desc . 

	?VerifiableCredential_desc a cco:DesignativeName ; 
		cco:has_text_value ?VerifiableCredential .   
  }
}
UNION
{
  SELECT ?LastName ?VerifiableCredential WHERE {
	?Person a cco:Person ;
		cco:designated_by ?PersonFullName; . 
			
	?PersonFullName a cco:PersonFullName ;
		<http://purl.obolibrary.org/obo/BFO_0000051> ?PersonFamilyNameIRI.

	?PersonFamilyNameIRI a cco:PersonFamilyName ;
		<http://purl.obolibrary.org/obo/RO_0010001> ?PersonFamilyNameIBE. 

	?PersonFamilyNameIBE cco:has_text_value ?LastName ;
		obo:BFO_0000050 ?VerifiableCredentialIRI. 

	?VerifiableCredentialIRI cco:designated_by ?VerifiableCredential_desc . 

	?VerifiableCredential_desc a cco:DesignativeName ; 
		cco:has_text_value ?VerifiableCredential .   
  }
}
 UNION
{
  SELECT ?Person ?Birthday ?VerifiableCredential WHERE {
	?Person a cco:Person ;
		cco:is_object_of ?Birth. 

	?Birth a cco:Birth;
		cco:occurs_on ?Birth_Day. 

	?Birth_Day a cco:Day;
		cco:designated_by ?DataIdentifier . 

	?DataIdentifier <http://purl.obolibrary.org/obo/RO_0010001> ?DataIdentifierIBE . 

	?DataIdentifierIBE  cco:has_text_value ?Birthday ;
		obo:BFO_0000050 ?VerifiableCredentialIRI. 

	?VerifiableCredentialIRI cco:designated_by ?VerifiableCredential_desc . 

	?VerifiableCredential_desc a cco:DesignativeName ; 
		cco:has_text_value ?VerifiableCredential .
  }
}
UNION
{
  SELECT ?VerifiableCredential ?StreetAdressIRI ?MailingStreet WHERE {
	?Person a cco:Person;
		cco:agent_in ?ActOfResiding.

	?ActOfResiding a cco:ActOfResiding;
		obo:RO_0000057 ?ResidentialFacility.

	?ResidentialFacility a cco:ResidentialFacility;
		cco:designated_by ?StreetAdressIRI.

	?StreetAdressIRI a cco:StreetAddress;
		obo:RO_0010001 ?StreetAdressIBE .

	?StreetAdressIBE a cco:InformationBearingEntity;
		cco:has_text_value  ?MailingStreet ;
		obo:BFO_0000050 ?VerifiableCredentialIRI. 

	?VerifiableCredentialIRI cco:designated_by ?VerifiableCredential_desc . 

	?VerifiableCredential_desc a cco:DesignativeName ; 
		cco:has_text_value ?VerifiableCredential . 
  }
}
UNION
{
  SELECT ?VerifiableCredential?PostalCodeIRI ?MailingPostCode WHERE {
	?Person a cco:Person;
		cco:agent_in ?ActOfResiding.

	?ActOfResiding a cco:ActOfResiding;
		obo:RO_0000057 ?ResidentialFacility.

	?ResidentialFacility a cco:ResidentialFacility;
		obo:RO_0001025 ?PostalZone . 

	?PostalZone a cco:PostalZone;
		cco:designated_by ?PostalCodeIRI.

	?PostalCodeIRI a cco:PostalCode;
		obo:RO_0010001 ?PostalCodeIBE.

	?PostalCodeIBE a cco:InformationBearingEntity;
		cco:has_text_value ?MailingPostCode;
		obo:BFO_0000050 ?VerifiableCredentialIRI. 

	?VerifiableCredentialIRI cco:designated_by ?VerifiableCredential_desc . 

	?VerifiableCredential_desc a cco:DesignativeName ; 
		cco:has_text_value ?VerifiableCredential . 
	}
}
 UNION
{
	SELECT ?VerifiableCredential ?CityIRI ?MailingCity WHERE 
	{
	  ?Person a cco:Person ;
			  cco:agent_in ?ActOfResiding . 
  
	  ?ActOfResiding a cco:ActOfResiding ; 
					 obo:RO_0000057 ?ResidentialFacility. 
	  ?ResidentialFacility a cco:ResidentialFacility;
						   obo:RO_0001025 ?CityIRI. 
  
	  # Admin Region
	  ?CityIRI a cco:LocalAdministrativeRegion ; 
			   cco:designated_by ?LocalAdminRegion1DesName . 
	  #City 
	  ?LocalAdminRegion1DesName a cco:DesignativeName;
								obo:RO_0010001  ?LocalAdminRegion1DesNameIBE. 
  
	  ?LocalAdminRegion1DesNameIBE cco:has_text_value ?MailingCity ;
								   obo:BFO_0000050 ?VerifiableCredentialIRI. 
  
	  ?VerifiableCredentialIRI cco:designated_by ?VerifiableCredential_desc . 
  
	  ?VerifiableCredential_desc a cco:DesignativeName ; 
								 cco:has_text_value ?VerifiableCredential . 
  }  
}
 UNION
{
  SELECT ?VerifiableCredential ?StateIRI ?MailingState WHERE {
	?Person a cco:Person ;
		cco:agent_in ?ActOfResiding . 

	?ActOfResiding a cco:ActOfResiding ; 
		obo:RO_0000057 ?ResidentialFacility. 

	?ResidentialFacility a cco:ResidentialFacility;
		<http://purl.obolibrary.org/obo/RO_0001025> ?LocalAdminRegion1. 

	?LocalAdminRegion1 a cco:LocalAdministrativeRegion ; 
		<http://purl.obolibrary.org/obo/BFO_0000050> ?StateIRI . 

	?StateIRI a cco:State ; 
		cco:designated_by ?LocalAdminRegion1StateCityDesc. 

	?LocalAdminRegion1StateCityDesc a cco:DesignativeName ; 
		<http://purl.obolibrary.org/obo/RO_0010001>   ?LocalAdminRegion1StateCityDescIBE . 

	?LocalAdminRegion1StateCityDescIBE a cco:InformationBearingEntity ;
		cco:has_text_value ?MailingState;
		obo:BFO_0000050 ?VerifiableCredentialIRI. 

	?VerifiableCredentialIRI cco:designated_by ?VerifiableCredential_desc . 

	?VerifiableCredential_desc a cco:DesignativeName ; 
		cco:has_text_value ?VerifiableCredential .							
	}

}
  UNION
{
  SELECT ?VerifiableCredential ?CountryIRI ?MailingCountry WHERE {
	?Person a cco:Person ;
		cco:agent_in ?ActOfResiding . 

	?ActOfResiding a cco:ActOfResiding ; 
		obo:RO_0000057 ?ResidentialFacility. 
		
	?ResidentialFacility a cco:ResidentialFacility;
		<http://purl.obolibrary.org/obo/RO_0001025> ?LocalAdminRegion1. 

	?LocalAdminRegion1 a cco:LocalAdministrativeRegion ; 
		<http://purl.obolibrary.org/obo/BFO_0000050> ?LocalAdminRegion1StateCity . 

	?LocalAdminRegion1StateCity a cco:State ; 
		<http://purl.obolibrary.org/obo/BFO_0000050>  ?CountryIRI. 
	
	?CountryIRI a cco:Country ; 
		cco:designated_by ?CountryDesc  . 

	?CountryDesc a cco:DesignativeName ; 
		<http://purl.obolibrary.org/obo/RO_0010001> ?CountryDescIBE .  

	?CountryDescIBE cco:has_text_value ?MailingCountry;
		obo:BFO_0000050 ?VerifiableCredentialIRI. 

	?VerifiableCredentialIRI cco:designated_by ?VerifiableCredential_desc . 

	?VerifiableCredential_desc a cco:DesignativeName ; 
		cco:has_text_value ?VerifiableCredential .
                  
    }

}      
	UNION
{
	SELECT ?VerifiableCredential ?WeightIRI ?Weight WHERE {
	?Person a cco:Person;
		cco:has_quality ?WeightQuality . 

	?WeightQuality a cco:Weight;
		cco:is_measured_by ?WeightQualityICE .    

	?WeightQualityICE obo:RO_0000056 ?WeightIRI . 

	?WeightIRI  cco:has_text_value ?Weight ; 
		obo:BFO_0000050 ?VerifiableCredentialIRI. 

	?VerifiableCredentialIRI cco:designated_by ?VerifiableCredential_desc . 

	?VerifiableCredential_desc a cco:DesignativeName ; 
		cco:has_text_value ?VerifiableCredential .		
	}
	
}UNION{
	SELECT ?VerifiableCredential ?EmailAddressIRI ?Email  WHERE {
	?Person a cco:Person ;
		cco:uses ?EmailBox . 

	?EmailBox a cco:EmailBox;
		obo:RO_0000056 ?StasisOfTelecommunicationEndpointAssignment . 

	?StasisOfTelecommunicationEndpointAssignment a cco:StasisOfTelecommunicationEndpointAssignment ; 
		obo:RO_0000057 ?TelecommunicationEndpoint . 

	?TelecommunicationEndpoint a cco:TelecommunicationEndpoint ;
		cco:designated_by ?EmailAddressIRI . 

	?EmailAddressIRI a cco:EmailAddress;
		obo:RO_0010001 ?EmailIBE .

	?EmailIBE cco:has_text_value ?Email ; 
		obo:BFO_0000050 ?VerifiableCredentialIRI. 

	?VerifiableCredentialIRI cco:designated_by ?VerifiableCredential_desc . 

	?VerifiableCredential_desc a cco:DesignativeName ; 
		cco:has_text_value ?VerifiableCredential .
		
	}
} UNION{
	SELECT ?Person  ?HomePhoneNumber ?VerifiableCredential WHERE {
		?Person a cco:Person;
		cco:user ?LandLine .
		
		?LandLine  a cco:LandlineTelephone;
			obo:RO_0000056 ?StatisOfCommunication.
			
		?StatisOfCommunication a  cco:StasisOfTelecommunicationEndpointAssignment;
			obo:RO_0000057 ?telecomeEndpoint.
			
		?telecomeEndpoint a cco:TelecommunicationEndpoint ;
			cco:designated_by ?telephoneNumber .
			
		?telephoneNumber a cco:TelephoneNumber ;
			obo:RO_0010001 ?telephoneNumberIBE .
			
		?telephoneNumberIBE a cco:InformationBearingEntity ;
			cco:has_text_value ?HomePhoneNumber;
			obo:BFO_0000050 ?VerifiableCredentialIRI. 

			?VerifiableCredentialIRI cco:designated_by ?VerifiableCredential_desc . 
		
			?VerifiableCredential_desc a cco:DesignativeName ; 
				cco:has_text_value ?VerifiableCredential.
		}
}  UNION{

	SELECT ?VerifiableCredential ?TelephoneNumber ?MobilePhoneNumber WHERE {
		?Person a cco:Person;
		cco:user ?MobileTelephone .
		
		?MobileTelephone a cco:MobileTelephone;
			obo:RO_0000056 ?StasisOfTelecommunicationEndpointAssignment .
			
		?StasisOfTelecommunicationEndpointAssignment a  cco:StasisOfTelecommunicationEndpointAssignment;
			obo:RO_0000057 ?TelecommunicationEndpoint .
			
		?TelecommunicationEndpoint a cco:TelecommunicationEndpoint ;
			cco:designated_by ?TelephoneNumber.
			
		?TelephoneNumber a cco:TelephoneNumber ;
			obo:RO_0010001 ?TelephoneNumberIBE.
			
		?TelephoneNumberIBE a cco:InformationBearingEntity ;
			cco:has_text_value ?MobilePhoneNumber;
			obo:BFO_0000050 ?VerifiableCredentialIRI .
		  
		   ?VerifiableCredentialIRI cco:designated_by ?VerifiableCredential_desc . 
						
								?VerifiableCredential_desc a cco:DesignativeName ; 
										cco:has_text_value ?VerifiableCredential.
		}  
}UNION{
	SELECT  ?VerifiableCredential ?OrganizationDesignativeName ?EmployerName  WHERE {
		?Person a cco:Person;
				obo:RO_0000053 ?OccupationRole .
	  
		?OccupationRole a cco:OccupationRole;
						cco:has_organization_context ?Organization .
	  
		?Organization a cco:Organization ;
					  cco:designated_by ?OrganizationDesignativeName.
	  
		?OrganizationDesignativeName a cco:DesignativeName ;
									 obo:RO_0010001 ?OrganizationDesignativeNameIBE .
	  
		?OrganizationDesignativeNameIBE a cco:InformationBearingEntity ;
										cco:has_text_value ?EmployerName;
										obo:BFO_0000050 ?VerifiableCredentialIRI .
	  
		?VerifiableCredentialIRI cco:designated_by ?VerifiableCredential_desc . 
	  
		?VerifiableCredential_desc a cco:DesignativeName ; 
								   cco:has_text_value ?VerifiableCredential.
	  } 
}UNION{
	SELECT  ?VerifiableCredential ?NominalMeasurementInformationContentEntity ?EmployeeTitle  WHERE {
		?Person a cco:Person;
				obo:RO_0000053 ?OccupationRole .
	  
		?OccupationRole a cco:OccupationRole;
						cco:described_by ?NominalMeasurementInformationContentEntity.
	  
		?NominalMeasurementInformationContentEntity a cco:NominalMeasurementInformationContentEntity;
													obo:RO_0010001 ?InformationBearingEntity_NominalMeasurementInformationContentEntity .
	  
		?InformationBearingEntity_NominalMeasurementInformationContentEntity a cco:InformationBearingEntity ;
																			 cco:has_text_value ?EmployeeTitle;
																			 obo:BFO_0000050 ?VerifiableCredentialIRI .
	  
		?VerifiableCredentialIRI cco:designated_by ?VerifiableCredential_desc . 
		?VerifiableCredential_desc a cco:DesignativeName ; 
								   cco:has_text_value ?VerifiableCredential.
	  } 
}
}`


function readMyData(callback: ({ success: boolean, data: string }) => void) {
	fetch(`http://${process.env.API_LOCATION}:3030/MyData/sparql`, {
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