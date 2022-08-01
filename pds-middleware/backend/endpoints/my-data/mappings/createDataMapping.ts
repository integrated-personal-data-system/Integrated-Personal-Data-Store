
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
    obo:BFO_0000050 cco:VerifiableCredential_{verfiableCredentialId} .\n\
\n\
cco:VerifiableCredential_{verfiableCredentialId} cco:designated_by cco:VerifiableCredential_{verfiableCredentialId}_desc.\n\
\n\
cco:VerifiableCredential_{verfiableCredentialId}_desc a cco:DesignativeName;\n\
    cco:has_text_value "{verfiableCredentialId}". '


export const lastname = ' <{person}> a cco:Person;\n\
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
obo:BFO_0000050 cco:VerifiableCredential_{verfiableCredentialId} .\n\
\n\
cco:VerifiableCredential_{verfiableCredentialId} cco:designated_by cco:VerifiableCredential_{verfiableCredentialId}_desc.\n\
\n\
cco:VerifiableCredential_{verfiableCredentialId}_desc a cco:DesignativeName; \n\
    cco:has_text_value "{verfiableCredentialId}". '



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
    obo:BFO_0000050 cco:VerifiableCredential_{verfiableCredentialId} .\n\
\n\
cco:VerifiableCredential_{verfiableCredentialId} cco:designated_by cco:VerifiableCredential_{verfiableCredentialId}_desc .\n\
\n\
cco:VerifiableCredential_{verfiableCredentialId}_desc a cco:DesignativeName; \n\
cco:has_text_value "{verfiableCredentialId}". '