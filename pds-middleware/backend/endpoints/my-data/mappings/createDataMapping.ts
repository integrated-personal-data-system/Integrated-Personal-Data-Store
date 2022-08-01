
export const firstname = ' <{person}> a cco:Person;\n\
    cco:designated_by cco:PersonFullName_{guid} .\n\
\n\
cco:PersonFullName_{guid} a cco:PersonFullName;\n\
    <http://purl.obolibrary.org/obo/BFO_0000051> cco:PersonGivenName_{guid} .\n\
\n\
cco:PersonGivenName_{guid} a cco:PersonGivenName;\n\
        obo:RO_0010001 cco:InformationBearingEntity_PersonGivenName_{guid} .\n\
\n\
cco:InformationBearingEntity_PersonGivenName_{guid} a cco:InformationBearingEntity;\n\
    cco:has_text_value "{value}";\n\
    obo:BFO_0000050 cco:VerifiableCredential_{verfiableCredentialId} .\n'


export const lastname = '<{person}> a cco:Person;\n\
    cco:designated_by cco:PersonFullName_{guid}.\n\
\n\
cco:PersonFullName_{guid} a cco:PersonFullName ;\n\
    <http://purl.obolibrary.org/obo/BFO_0000051> cco:PersonFamilyName_{guid}.\n\
\n\
cco:PersonFamilyName_{guid} a cco:PersonFamilyName; \n\
    obo:RO_0010001 cco:InformationBearingEntity_PersonFamilyName_{guid} .\n\
\n\
cco:InformationBearingEntity_PersonFamilyName_{guid} a cco:InformationBearingEntity; \n\
cco:has_text_value "{value}"; \n\
obo:BFO_0000050 cco:VerifiableCredential_{verfiableCredentialId} .\n'


export const email = '<{person}> a cco:Person;\n\
cco:uses cco:EmailBox_{guid} .\n\
\n\
cco:EmailBox_{guid} a cco:EmailBox ;\n\
    obo:RO_0000056 cco:StasisOfTelecommunicationEndpointAssignment_{guid} .\n\
\n\
cco:StasisOfTelecommunicationEndpointAssignment_{guid} a cco:StasisOfTelecommunicationEndpointAssignment ;\n\
    obo:RO_0000057 cco:TelecommunicationEndpoint_{guid} .\n\
\n\
cco:TelecommunicationEndpoint_{guid} a cco:TelecommunicationEndpoint;\n\
    cco:designated_by cco:EmailAddress_{guid} .\n\
\n\
cco:EmailAddress_{guid} a cco:EmailAddress ;\n\
    obo:RO_0010001 cco:InformationBearingEntity_EmailAddress_{guid} .\n\
\n\
cco:InformationBearingEntity_EmailAddress_{guid} a cco:InformationBearingEntity ;\n\
    cco:has_text_value "{value}" ;\n\
    obo:BFO_0000050 cco:VerifiableCredential_{verfiableCredentialId} .\n'

export const birthday = '<{person}> a cco:Person;\n\
cco:is_object_of cco:Birth_{guid} .\n\
\n\
cco:Birth_{guid} a cco:Birth ;\n\
    cco:occurs_on cco:Day_{guid} .\n\
\n\
cco:Day_{guid} a cco:Day ;\n\
    cco:designated_by cco:DateIdentifier_{guid} .\n\
\n\
cco:DateIdentifier_{guid} a cco:DateIdentifier ;\n\
    obo:RO_0010001 cco:InformationBearingEntity_DataIdentifier_{guid} .\n\
\n\
cco:InformationBearingEntity_DataIdentifier_{guid} a cco:InformationBearingEntity ;\n\
  cco:has_text_value "{value}";\n\
  obo:BFO_0000050 cco:VerifiableCredential_{verfiableCredentialId} .\n'

export const mailingstreet = '<{person}> a cco:Person; \n\
cco:agent_in cco:ActOfResiding_{guid} . \n\
\n\
cco:ActOfResiding_{guid} a cco:ActOfResiding ; \n\
    obo:RO_0000057 cco:ResidentialFacility_{guid} . \n\
\n\
cco:ResidentialFacility_{guid} a cco:ResidentialFacility ; \n\
    cco:designated_by cco:StreetAdress_{guid} . \n\
    \n\
cco:StreetAdress_{guid} a cco:StreetAddress ; \n\
    obo:RO_0010001 cco:InformationBearingEntity_StreetAdress_{guid} . \n\
    \n\
cco:InformationBearingEntity_StreetAdress_{guid} a cco:InformationBearingEntity ; \n\
    cco:has_text_value "{value}"; \n\
    obo:BFO_0000050 cco:VerifiableCredential_{verfiableCredentialId} . \n '

export const mailingcity = '<{person}> a cco:Person;\n\
cco:agent_in cco:ActOfResiding_{guid} .\n\
\n\
cco:ActOfResiding_{guid} a cco:ActOfResiding ;\n\
    obo:RO_0000057 cco:ResidentialFacility_{guid} .\n\
    \n\
cco:ResidentialFacility_{guid} a cco:ResidentialFacility ;\n\
    obo:RO_0001025 cco:LocalAdministrativeRegion_{guid} .\n\
    \n\
cco:LocalAdministrativeRegion_{guid} a cco:LocalAdministrativeRegion ;\n\
    cco:designated_by cco:DesignativeName_{guid} .\n\
    \n\
cco:DesignativeName_{guid} a cco:DesignativeName ;\n\
    obo:RO_0010001 cco:InformationBearingEntity_DesignativeName_{guid} .\n\
    \n\
cco:InformationBearingEntity_DesignativeName_{guid} a cco:InformationBearingEntity ;\n\
    cco:has_text_value "{value}";\n\
    obo:BFO_0000050 cco:VerifiableCredential_{verfiableCredentialId} .\n '

export const mailingstate = '<{person}> a cco:Person;\n\
cco:agent_in cco:ActOfResiding_{guid} .\n\
\n\
cco:ActOfResiding_{guid} a cco:ActOfResiding ;\n\
    obo:RO_0000057 cco:ResidentialFacility_{guid} .\n\
    \n\
cco:ResidentialFacility_{guid} a cco:ResidentialFacility ;\n\
    obo:RO_0001025 cco:LocalAdministrativeRegion_{guid} .\n\
    \n\
cco:LocalAdministrativeRegion_{guid} a cco:LocalAdministrativeRegion ;\n\
    obo:BFO_0000050 cco:FirstOrderAdministrativeRegion_{guid} .\n\
    \n\
cco:FirstOrderAdministrativeRegion_{guid} a cco:State ;\n\
    cco:designated_by cco:DesignativeName_{guid} .\n\
    \n\
cco:DesignativeName_{guid} a cco:DesignativeName ;\n\
    obo:RO_0010001 cco:InformationBearingEntity_DesignativeName_{guid} .\n\
    \n\
cco:InformationBearingEntity_DesignativeName_{guid} a cco:InformationBearingEntity ;\n\
cco:has_text_value "{value}";\n\
obo:BFO_0000050 cco:VerifiableCredential_{verfiableCredentialId} .\n'

export const mailingpostcode = '<{person}> a cco:Person;\n\
cco:agent_in cco:ActOfResiding_{guid} .\n\
\n\
cco:ActOfResiding_{guid} a cco:ActOfResiding ;\n\
    obo:RO_0000057 cco:ResidentialFacility_{guid} .\n\
    \n\
cco:ResidentialFacility_{guid} a cco:ResidentialFacility ;\n\
  obo:RO_0001025 cco:PostalZone_{guid} .\n\
  \n\
cco:PostalZone_{guid} a cco:PostalZone ;\n\
    cco:designated_by cco:PostalCode_{guid} .\n\
    \n\
cco:PostalCode_{guid} a cco:PostalCode ;\n\
    obo:RO_0010001 cco:InformationBearingEntity_PostalCode_{guid} .\n\
    \n\
cco:InformationBearingEntity_PostalCode_{guid} a cco:InformationBearingEntity ;\n\
    cco:has_text_value "{value}";\n\
    obo:BFO_0000050 cco:VerifiableCredential_{verfiableCredentialId} .\n'



export const mailingcountry = '<{person}> a cco:Person;\n\
cco:agent_in cco:ActOfResiding_{guid} .\n\
\n\
cco:ActOfResiding_{guid} a cco:ActOfResiding ;\n\
    obo:RO_0000057 cco:ResidentialFacility_{guid} .\n\
    \n\
cco:ResidentialFacility_{guid} a cco:ResidentialFacility ;\n\
    obo:RO_0001025 cco:LocalAdministrativeRegion_{guid} .\n\
    \n\
    cco:LocalAdministrativeRegion_{guid} a cco:LocalAdministrativeRegion ;\n\
     obo:BFO_0000050 cco:FirstOrderAdministrativeRegion_{guid} .\n\
     \n\
cco:FirstOrderAdministrativeRegion_{guid} a cco:State ;\n\
    obo:BFO_0000050 cco:County_{guid} .\n\
    \n\
cco:County_{guid} a cco:Country ;\n\
    cco:designated_by cco:PostalCodeDesignativeName_{guid} .\n\
    \n\
cco:PostalCodeDesignativeName_{guid} a cco:DesignativeName ;\n\
    obo:RO_0010001 cco:InformationBearingEntity_DesignativeName_{guid} .\n\
    \n\
cco:InformationBearingEntity_DesignativeName_{guid} a cco:InformationBearingEntity ;\n\
    cco:has_text_value "{value}";\n\
    obo:BFO_0000050 cco:VerifiableCredential_{verfiableCredentialId} .\n'


export const homephonenumber = ' <{person}> a cco:Person;\n\
cco:user cco:LandlineTelephone_{guid} .\n\
\n\
cco:LandlineTelephone_{guid} a cco:LandlineTelephone;\n\
    obo:RO_0000056 cco:StasisOfTelecommunicationEndpointAssignment_{guid} .\n\
    \n\
cco:StasisOfTelecommunicationEndpointAssignment_{guid} a  cco:StasisOfTelecommunicationEndpointAssignment;\n\
    obo:RO_0000057 cco:TelecommunicationEndpoint_{guid} .\n\
    \n\
cco:TelecommunicationEndpoint_{guid} a cco:TelecommunicationEndpoint ;\n\
    cco:designated_by cco:TelephoneNumber_{guid} .\n\
    \n\
cco:TelephoneNumber_{guid} a cco:TelephoneNumber ;\n\
    obo:RO_0010001 cco:InformationBearingEntity_TelephoneNumber_{guid} .\n\
    \n\
cco:InformationBearingEntity_TelephoneNumber_{guid} a cco:InformationBearingEntity ;\n\
    cco:has_text_value "{value}";\n\
    obo:BFO_0000050 cco:VerifiableCredential_{verfiableCredentialId} .\n '


export const mobilephonenumber = '<{person}> a cco:Person;\n\
cco:user cco:MobileTelephone_{guid} .\n\
\n\
cco:MobileTelephone_{guid} a cco:MobileTelephone;\n\
    obo:RO_0000056 cco:StasisOfTelecommunicationEndpointAssignment_{guid} .\n\
    \n\
cco:StasisOfTelecommunicationEndpointAssignment_{guid} a  cco:StasisOfTelecommunicationEndpointAssignment;\n\
    obo:RO_0000057 cco:TelecommunicationEndpoint_{guid} .\n\
    \n\
cco:TelecommunicationEndpoint_{guid} a cco:TelecommunicationEndpoint ;\n\
    cco:designated_by cco:TelephoneNumber_{guid} .\n\
    \n\
cco:TelephoneNumber_{guid} a cco:TelephoneNumber ;\n\
    obo:RO_0010001 cco:InformationBearingEntity_TelephoneNumber_{guid} .\n\
    \n\
cco:InformationBearingEntity_TelephoneNumber_{guid} a cco:InformationBearingEntity ;\n\
    cco:has_text_value "{value}";\n\
    obo:BFO_0000050 cco:VerifiableCredential_{verfiableCredentialId} .\n'

export const employername = '<{person}> a cco:Person;\n\
obo:RO_0000053 cco:OccupationRole_{guid} .\n\
\n\
cco:OccupationRole_{guid} a cco:OccupationRole;\n\
    cco:has_organization_context cco:Organization_{guid} .\n\
    \n\
cco:Organization_{guid} a cco:Organization ;\n\
    cco:designated_by cco:DesignativeName_{guid}.\n\
    \n\
cco:DesignativeName_{guid} a cco:DesignativeName ;\n\
    obo:RO_0010001 cco:InformationBearingEntity_DesignativeName_{guid} .\n\
    \n\
cco:InformationBearingEntity_DesignativeName_{guid} a cco:InformationBearingEntity ;\n\
  cco:has_text_value "{value}";\n\
  obo:BFO_0000050 cco:VerifiableCredential_{verfiableCredentialId} .\n '

export const employeetitle = '<{person}> a cco:Person;\n\
obo:RO_0000053 cco:OccupationRole_{guid} .\n\
\n\
cco:OccupationRole_{guid} a cco:OccupationRole;\n\
    cco:described_by cco:NominalMeasurementInformationContentEntity_{guid} .\n\
    \n\
cco:NominalMeasurementInformationContentEntity_{guid} a cco:NominalMeasurementInformationContentEntity;\n\
    obo:RO_0010001 cco:InformationBearingEntity_NominalMeasurementInformationContentEntity_{guid} .\n\
    \n\
cco:InformationBearingEntity_NominalMeasurementInformationContentEntity_{guid} a cco:InformationBearingEntity ;\n\
  cco:has_text_value "{value}";\n\
  obo:BFO_0000050 cco:VerifiableCredential_{verfiableCredentialId} .\n'

export const weight = '<{person}> a cco:Person ;\n\
  cco:has_quality <http://www.ontologyrepository.com/CommonCoreOntologies/Quality-Weight-{guid}> .\n\
\n\
<http://www.ontologyrepository.com/CommonCoreOntologies/Quality-Weight-{guid}> a cco:Weight ; \n\
    cco:is_measured_by <http://www.ontologyrepository.com/CommonCoreOntologies/{guid}-Quality-Weight-MeasuredICE> .\n\
\n\
<http://www.ontologyrepository.com/CommonCoreOntologies/{guid}-Quality-Weight-MeasuredICE>  a cco:MeasurementInformationContentEntity;\n\
obo: RO_0000056 <http://www.ontologyrepository.com/CommonCoreOntologies/{guid}-Quality-Weight-MeasuredIBE> . \n\
\n\
<http://www.ontologyrepository.com/CommonCoreOntologies/{guid}-Quality-Weight-MeasuredIBE>  a cco:InformationBearingEntity ; \n\
    cco:has_text_value "{value}"; \n\
    obo:BFO_0000050 cco:VerifiableCredential_{verfiableCredentialId} .\n' 