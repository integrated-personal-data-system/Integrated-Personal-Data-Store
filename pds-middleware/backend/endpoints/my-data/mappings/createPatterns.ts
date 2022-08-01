import { v4 as uuidv4 } from 'uuid'
import { firstname } from "./createDataMapping"

function pds_firstname(person: string, firstname: string, verfiableCredentialId: string) {
  var firstname_uuid, triples;

  try {
    if (firstname !== "") {
      firstname_uuid = uuidv4();
      triples = `
            <${person}> a cco:Person;
            cco:designated_by cco:PersonFullName_${firstname_uuid} .

            cco:PersonFullName_${firstname_uuid} a cco:PersonFullName ;
              <http://purl.obolibrary.org/obo/BFO_0000051> cco:PersonGivenName_${firstname_uuid} .
            
            cco:PersonGivenName_${firstname_uuid} a cco:PersonGivenName ;
                obo:RO_0010001 cco:InformationBearingEntity_PersonGivenName_${firstname_uuid} .
            
            cco:InformationBearingEntity_PersonGivenName_${firstname_uuid} a cco:InformationBearingEntity ;
                cco:has_text_value "${firstname}";
                obo:BFO_0000050 cco:VerifiableCredential_${verfiableCredentialId} .

            cco:VerifiableCredential_${verfiableCredentialId} cco:designated_by cco:VerifiableCredential_${verfiableCredentialId}_desc . 

            cco:VerifiableCredential_${verfiableCredentialId}_desc a cco:DesignativeName ; 
              cco:has_text_value "${verfiableCredentialId}" . 
            `;
      return triples;
    }
  } catch (e) {
    console.log("FirstName:" + e);
  }
}

function pds_email(person: string, email: string, verfiableCredentialId: string) {
  var email_uuid, triples;

  try {
    if (email !== "") {
      email_uuid = uuidv4();
      let emailIRI = email.replace(/\s/g, "")
      triples = `
            <${person}> a cco:Person;
            cco:uses cco:EmailBox_${email_uuid} .

            cco:EmailBox_${email_uuid} a cco:EmailBox ;
                obo:RO_0000056 cco:StasisOfTelecommunicationEndpointAssignment_${email_uuid} .
            
            cco:StasisOfTelecommunicationEndpointAssignment_${email_uuid} a cco:StasisOfTelecommunicationEndpointAssignment ;
                obo:RO_0000057 cco:TelecommunicationEndpoint_${email_uuid} .

            cco:TelecommunicationEndpoint_${email_uuid} a cco:TelecommunicationEndpoint;
                cco:designated_by cco:EmailAddress_${email_uuid} .
            
            cco:EmailAddress_${email_uuid} a cco:EmailAddress ;
                obo:RO_0010001 cco:InformationBearingEntity_EmailAddress_${email_uuid} .
            
            cco:InformationBearingEntity_EmailAddress_${email_uuid} a cco:InformationBearingEntity ;
                cco:has_text_value "${email}" ;
                obo:BFO_0000050 cco:VerifiableCredential_${verfiableCredentialId} .

            cco:VerifiableCredential_${verfiableCredentialId} cco:designated_by cco:VerifiableCredential_${verfiableCredentialId}_desc . 

            cco:VerifiableCredential_${verfiableCredentialId}_desc a cco:DesignativeName ; 
              cco:has_text_value "${verfiableCredentialId}" . 
           
  `;
      return triples;
    }
  } catch (e) {
    console.log("Email:" + e);
  }
}

function pds_lastname(person: string, lastname: string, verfiableCredentialId: string) {
  var lastname_uuid, triples;

  try {
    if (lastname !== "") {
      lastname_uuid = uuidv4();
      triples = `
            <${person}> a cco:Person;
              cco:designated_by cco:PersonFullName_${lastname_uuid} .
            
            cco:PersonFullName_${lastname_uuid} a cco:PersonFullName ; 
              <http://purl.obolibrary.org/obo/BFO_0000051> cco:PersonFamilyName_${lastname_uuid} . 
            
              cco:PersonFamilyName_${lastname_uuid} a cco:PersonFamilyName ;
                obo:RO_0010001 cco:InformationBearingEntity_PersonFamilyName_${lastname_uuid} .
            
            cco:InformationBearingEntity_PersonFamilyName_${lastname_uuid} a cco:InformationBearingEntity ;
                cco:has_text_value "${lastname}";
                obo:BFO_0000050 cco:VerifiableCredential_${verfiableCredentialId} .

            cco:VerifiableCredential_${verfiableCredentialId} cco:designated_by cco:VerifiableCredential_${verfiableCredentialId}_desc . 

            cco:VerifiableCredential_${verfiableCredentialId}_desc a cco:DesignativeName ; 
              cco:has_text_value "${verfiableCredentialId}" . 
  `;
      return triples;
    }
  } catch (e) {
    console.log("Lastname:" + e);
  }
}

function pds_birthday(person: string, birthday: string, verfiableCredentialId: string) {
  var birthday_uuid, triples;

  try {
    if (birthday !== "") {
      birthday_uuid = uuidv4();
      triples = `
            <${person}> a cco:Person;
            cco:is_object_of cco:Birth_${birthday_uuid} .

            cco:Birth_${birthday_uuid} a cco:Birth ;
                cco:occurs_on cco:Day_${birthday_uuid} .
            
            cco:Day_${birthday_uuid} a cco:Day ;
                cco:designated_by cco:DateIdentifier_${birthday_uuid} .
            
            cco:DateIdentifier_${birthday_uuid} a cco:DateIdentifier ;
                obo:RO_0010001 cco:InformationBearingEntity_DataIdentifier_${birthday_uuid} .
            
            cco:InformationBearingEntity_DataIdentifier_${birthday_uuid} a cco:InformationBearingEntity ;
              cco:has_text_value "${birthday}";
              obo:BFO_0000050 cco:VerifiableCredential_${verfiableCredentialId} .

          cco:VerifiableCredential_${verfiableCredentialId} cco:designated_by cco:VerifiableCredential_${verfiableCredentialId}_desc . 

          cco:VerifiableCredential_${verfiableCredentialId}_desc a cco:DesignativeName ; 
            cco:has_text_value "${verfiableCredentialId}" . 

  `;
      return triples;
    }
  } catch (e) {
    console.log("Birthday:" + e);
  }
}

function pds_mailingstreet(person: string, mailingstreet: string, verfiableCredentialId: string) {
  var mailingstreet_uuid, triples;

  try {
    if (mailingstreet !== "") {
      mailingstreet_uuid = uuidv4();
      triples = `
            <${person}> a cco:Person;
            cco:agent_in cco:ActOfResiding_${mailingstreet_uuid} .

            cco:ActOfResiding_${mailingstreet_uuid} a cco:ActOfResiding ;
                obo:RO_0000057 cco:ResidentialFacility_${mailingstreet_uuid} .
            
            cco:ResidentialFacility_${mailingstreet_uuid} a cco:ResidentialFacility ;
                cco:designated_by cco:StreetAdress_${mailingstreet_uuid} .
            
            cco:StreetAdress_${mailingstreet_uuid} a cco:StreetAddress ;
                obo:RO_0010001 cco:InformationBearingEntity_StreetAdress_${mailingstreet_uuid} .
            
            cco:InformationBearingEntity_StreetAdress_${mailingstreet_uuid} a cco:InformationBearingEntity ;
                cco:has_text_value "${mailingstreet}";
                obo:BFO_0000050 cco:VerifiableCredential_${verfiableCredentialId} .
  
            cco:VerifiableCredential_${verfiableCredentialId} cco:designated_by cco:VerifiableCredential_${verfiableCredentialId}_desc . 
  
            cco:VerifiableCredential_${verfiableCredentialId}_desc a cco:DesignativeName ; 
              cco:has_text_value "${verfiableCredentialId}" . 
            `;
      return triples;
    }
  } catch (e) {
    console.log("Mailingstreet:" + e);
  }
}

function pds_mailingcity(person: string, mailingcity: string, verfiableCredentialId: string) {
  var mailingcity_uuid, triples;

  try {
    if (mailingcity !== "") {
      mailingcity_uuid = uuidv4();
      let mailingcityIRI = mailingcity.replace(/\s/g, "")
      triples = `
            <${person}> a cco:Person;
            cco:agent_in cco:ActOfResiding_${mailingcity_uuid} .

            cco:ActOfResiding_${mailingcity_uuid} a cco:ActOfResiding ;
                obo:RO_0000057 cco:ResidentialFacility_${mailingcity_uuid} .
            
            cco:ResidentialFacility_${mailingcity_uuid} a cco:ResidentialFacility ;
                obo:RO_0001025 cco:LocalAdministrativeRegion_${mailingcity_uuid} .
            
            cco:LocalAdministrativeRegion_${mailingcity_uuid} a cco:LocalAdministrativeRegion ;
                cco:designated_by cco:DesignativeName_${mailingcity_uuid} .
            
            cco:DesignativeName_${mailingcity_uuid} a cco:DesignativeName ;
                obo:RO_0010001 cco:InformationBearingEntity_DesignativeName_${mailingcity_uuid} .
            
            cco:InformationBearingEntity_DesignativeName_${mailingcity_uuid} a cco:InformationBearingEntity ;
                cco:has_text_value "${mailingcity}";
                obo:BFO_0000050 cco:VerifiableCredential_${verfiableCredentialId} .
  
            cco:VerifiableCredential_${verfiableCredentialId} cco:designated_by cco:VerifiableCredential_${verfiableCredentialId}_desc . 
  
            cco:VerifiableCredential_${verfiableCredentialId}_desc a cco:DesignativeName ; 
              cco:has_text_value "${verfiableCredentialId}" . 
            `;
      return triples;
    }
  } catch (e) {
    console.log("Mailingcity:" + e);
  }
}

function pds_mailingstate(person: string, mailingstate: string, verfiableCredentialId: string) {
  var mailingstate_uuid, triples;

  try {
    if (mailingstate !== "") {
      mailingstate_uuid = uuidv4();
      let mailingstateIRI = mailingstate.replace(/\s/g, "")
      triples = `
            <${person}> a cco:Person;
            cco:agent_in cco:ActOfResiding_${mailingstate_uuid} .

            cco:ActOfResiding_${mailingstate_uuid} a cco:ActOfResiding ;
                obo:RO_0000057 cco:ResidentialFacility_${mailingstate_uuid} .
            
            cco:ResidentialFacility_${mailingstate_uuid} a cco:ResidentialFacility ;
                obo:RO_0001025 cco:LocalAdministrativeRegion_${mailingstate_uuid} .
            
            cco:LocalAdministrativeRegion_${mailingstate_uuid} a cco:LocalAdministrativeRegion ;
                obo:BFO_0000050 cco:FirstOrderAdministrativeRegion_${mailingstate_uuid} .
            
            cco:FirstOrderAdministrativeRegion_${mailingstate_uuid} a cco:State ;
                cco:designated_by cco:DesignativeName_${mailingstate_uuid} .
            
            cco:DesignativeName_${mailingstate_uuid} a cco:DesignativeName ;
                obo:RO_0010001 cco:InformationBearingEntity_DesignativeName_${mailingstate_uuid} .
            
            cco:InformationBearingEntity_DesignativeName_${mailingstate_uuid} a cco:InformationBearingEntity ;
            cco:has_text_value "${mailingstate}";
            obo:BFO_0000050 cco:VerifiableCredential_${verfiableCredentialId} .

            cco:VerifiableCredential_${verfiableCredentialId} cco:designated_by cco:VerifiableCredential_${verfiableCredentialId}_desc . 

            cco:VerifiableCredential_${verfiableCredentialId}_desc a cco:DesignativeName ; 
              cco:has_text_value "${verfiableCredentialId}" . 
            `;
      return triples;
    }
  } catch (e) {
    console.log("Mailingstate:" + e);
  }
}

function pds_mailingpostcode(person: string, mailingpostcode: string, verfiableCredentialId: string) {
  var mailingpostcode_uuid, triples;

  try {
    if (mailingpostcode !== "") {
      mailingpostcode_uuid = uuidv4();
      triples = `
            <${person}> a cco:Person;
            cco:agent_in cco:ActOfResiding_${mailingpostcode_uuid} .

            cco:ActOfResiding_${mailingpostcode_uuid} a cco:ActOfResiding ;
                obo:RO_0000057 cco:ResidentialFacility_${mailingpostcode_uuid} .
            
            cco:ResidentialFacility_${mailingpostcode_uuid} a cco:ResidentialFacility ;
              obo:RO_0001025 cco:PostalZone_${mailingpostcode_uuid} .
            
            cco:PostalZone_${mailingpostcode_uuid} a cco:PostalZone ;
                cco:designated_by cco:PostalCode_${mailingpostcode_uuid} .
            
            cco:PostalCode_${mailingpostcode_uuid} a cco:PostalCode ;
                obo:RO_0010001 cco:InformationBearingEntity_PostalCode_${mailingpostcode_uuid} .
            
            cco:InformationBearingEntity_PostalCode_${mailingpostcode_uuid} a cco:InformationBearingEntity ;
                cco:has_text_value "${mailingpostcode}";
                obo:BFO_0000050 cco:VerifiableCredential_${verfiableCredentialId} .
    
                cco:VerifiableCredential_${verfiableCredentialId} cco:designated_by cco:VerifiableCredential_${verfiableCredentialId}_desc . 
    
                cco:VerifiableCredential_${verfiableCredentialId}_desc a cco:DesignativeName ; 
                  cco:has_text_value "${verfiableCredentialId}" . 
            `;
      return triples;
    }
  } catch (e) {
    console.log("Mailing postal code:" + e);
  }
}

function pds_mailingcountry(person: string, mailingcountry: string, verfiableCredentialId: string) {
  var mailingcountry_uuid, mailingstate_uuid, triples;

  try {
    if (mailingcountry !== "") {
      mailingcountry_uuid = uuidv4();
      mailingstate_uuid = uuidv4();
      let mailingcountryIRI = mailingcountry.replace(/\s/g, "")
      triples = `
            <${person}> a cco:Person;
            cco:agent_in cco:ActOfResiding_${mailingcountry_uuid} .

            cco:ActOfResiding_${mailingcountry_uuid} a cco:ActOfResiding ;
                obo:RO_0000057 cco:ResidentialFacility_${mailingcountry_uuid} .
            
            cco:ResidentialFacility_${mailingcountry_uuid} a cco:ResidentialFacility ;
                obo:RO_0001025 cco:LocalAdministrativeRegion_${mailingcountry_uuid} .
            
                cco:LocalAdministrativeRegion_${mailingcountry_uuid} a cco:LocalAdministrativeRegion ;
                 obo:BFO_0000050 cco:FirstOrderAdministrativeRegion_${mailingcountry_uuid} .
            
            cco:FirstOrderAdministrativeRegion_${mailingcountry_uuid} a cco:State ;
                obo:BFO_0000050 cco:County_${mailingcountry_uuid} .
            
            cco:County_${mailingcountry_uuid} a cco:Country ;
                cco:designated_by cco:PostalCodeDesignativeName_${mailingcountry_uuid} .
            
            cco:PostalCodeDesignativeName_${mailingcountry_uuid} a cco:DesignativeName ;
                obo:RO_0010001 cco:InformationBearingEntity_DesignativeName_${mailingcountry_uuid} .
            
            cco:InformationBearingEntity_DesignativeName_${mailingcountry_uuid} a cco:InformationBearingEntity ;
                cco:has_text_value "${mailingcountry}";
                obo:BFO_0000050 cco:VerifiableCredential_${verfiableCredentialId} .
    
                cco:VerifiableCredential_${verfiableCredentialId} cco:designated_by cco:VerifiableCredential_${verfiableCredentialId}_desc . 
    
                cco:VerifiableCredential_${verfiableCredentialId}_desc a cco:DesignativeName ; 
                  cco:has_text_value "${verfiableCredentialId}" . 
            `;
      return triples;
    }
  } catch (e) {
    console.log("Mailingcountry:" + e);
  }
}

function pds_homephonenumber(person: string, homephonenumber: string, verfiableCredentialId: string) {
  var homephonenumber_uuid, triples;

  try {
    if (homephonenumber !== "") {
      homephonenumber_uuid = uuidv4();
      let homephonenumberIRI = homephonenumber.replace(/\s/g, "")
      triples = `
            <${person}> a cco:Person;
            cco:user cco:LandlineTelephone_${homephonenumber_uuid} .

            cco:LandlineTelephone_${homephonenumber_uuid} a cco:LandlineTelephone;
                obo:RO_0000056 cco:StasisOfTelecommunicationEndpointAssignment_${homephonenumber_uuid} .
            
            cco:StasisOfTelecommunicationEndpointAssignment_${homephonenumber_uuid} a  cco:StasisOfTelecommunicationEndpointAssignment;
                obo:RO_0000057 cco:TelecommunicationEndpoint_${homephonenumber_uuid} .
            
            cco:TelecommunicationEndpoint_${homephonenumber_uuid} a cco:TelecommunicationEndpoint ;
                cco:designated_by cco:TelephoneNumber_${homephonenumber_uuid} .
            
            cco:TelephoneNumber_${homephonenumber_uuid} a cco:TelephoneNumber ;
                obo:RO_0010001 cco:InformationBearingEntity_TelephoneNumber_${homephonenumber_uuid} .
            
            cco:InformationBearingEntity_TelephoneNumber_${homephonenumber_uuid} a cco:InformationBearingEntity ;
                cco:has_text_value "${homephonenumber}";
                obo:BFO_0000050 cco:VerifiableCredential_${verfiableCredentialId} .
    
                cco:VerifiableCredential_${verfiableCredentialId} cco:designated_by cco:VerifiableCredential_${verfiableCredentialId}_desc . 
    
                cco:VerifiableCredential_${verfiableCredentialId}_desc a cco:DesignativeName ; 
                  cco:has_text_value "${verfiableCredentialId}" . 
            `;
      return triples;
    }
  } catch (e) {
    console.log("Home phone number:" + e);
  }
}

function pds_mobilephonenumber(person: string, mobilephonenumber: string, verfiableCredentialId: string) {
  var mobilephonenumber_uuid, triples;

  try {
    if (mobilephonenumber !== "") {
      mobilephonenumber_uuid = uuidv4();
      let mobilephonenumberIRI = mobilephonenumber.replace(/\s/g, "")
      triples = `
            <${person}> a cco:Person;
            cco:user cco:MobileTelephone_${mobilephonenumber_uuid} .

            cco:MobileTelephone_${mobilephonenumber_uuid} a cco:MobileTelephone;
                obo:RO_0000056 cco:StasisOfTelecommunicationEndpointAssignment_${mobilephonenumber_uuid} .
            
            cco:StasisOfTelecommunicationEndpointAssignment_${mobilephonenumber_uuid} a  cco:StasisOfTelecommunicationEndpointAssignment;
                obo:RO_0000057 cco:TelecommunicationEndpoint_${mobilephonenumber_uuid} .
            
            cco:TelecommunicationEndpoint_${mobilephonenumber_uuid} a cco:TelecommunicationEndpoint ;
                cco:designated_by cco:TelephoneNumber_${mobilephonenumber_uuid} .
            
            cco:TelephoneNumber_${mobilephonenumber_uuid} a cco:TelephoneNumber ;
                obo:RO_0010001 cco:InformationBearingEntity_TelephoneNumber_${mobilephonenumber_uuid} .
            
            cco:InformationBearingEntity_TelephoneNumber_${mobilephonenumber_uuid} a cco:InformationBearingEntity ;
                cco:has_text_value "${mobilephonenumber}";
                obo:BFO_0000050 cco:VerifiableCredential_${verfiableCredentialId} .
    
                cco:VerifiableCredential_${verfiableCredentialId} cco:designated_by cco:VerifiableCredential_${verfiableCredentialId}_desc . 
    
                cco:VerifiableCredential_${verfiableCredentialId}_desc a cco:DesignativeName ; 
                  cco:has_text_value "${verfiableCredentialId}" . 
            `;
      return triples;
    }
  } catch (e) {
    console.log("Mobile phone number:" + e);
  }
}

function pds_employername(person: string, employername: string, verfiableCredentialId: string) {
  var employername_uuid, triples;

  try {
    if (employername !== "") {
      employername_uuid = uuidv4();
      let employernameIRI = employername.replace(/\s/g, "")
      triples = `
            <${person}> a cco:Person;
            obo:RO_0000053 cco:OccupationRole_${employername_uuid} .

            cco:OccupationRole_${employername_uuid} a cco:OccupationRole;
                cco:has_organization_context cco:Organization_${employername_uuid} .
            
            cco:Organization_${employername_uuid} a cco:Organization ;
                cco:designated_by cco:DesignativeName_${employername_uuid}
            
            cco:DesignativeName_${employername_uuid} a cco:DesignativeName ;
                obo:RO_0010001 cco:InformationBearingEntity_DesignativeName_${employername_uuid} .
            
            cco:InformationBearingEntity_DesignativeName_${employername_uuid} a cco:InformationBearingEntity ;
              cco:has_text_value "${employername}";
              obo:BFO_0000050 cco:VerifiableCredential_${verfiableCredentialId} .
  
              cco:VerifiableCredential_${verfiableCredentialId} cco:designated_by cco:VerifiableCredential_${verfiableCredentialId}_desc . 
  
              cco:VerifiableCredential_${verfiableCredentialId}_desc a cco:DesignativeName ; 
                cco:has_text_value "${verfiableCredentialId}" . 
            `;
      return triples;
    }
  } catch (e) {
    console.log("Name of employeer" + e);
  }
}

function pds_employeetitle(person: string, employeetitle: string, verfiableCredentialId: string) {
  var employeetitle_uuid, triples;

  try {
    if (employeetitle !== "") {
      employeetitle_uuid = uuidv4();
      let employeetitleIRI = employeetitle.replace(/\s/g, "")
      triples = `
            <${person}> a cco:Person;
            obo:RO_0000053 cco:OccupationRole_${employeetitle_uuid} .

            cco:OccupationRole_${employeetitle_uuid} a cco:OccupationRole;
                cco:described_by cco:NominalMeasurementInformationContentEntity_${employeetitle_uuid} .
            
            cco:NominalMeasurementInformationContentEntity_${employeetitle_uuid} a cco:NominalMeasurementInformationContentEntity;
                obo:RO_0010001 cco:InformationBearingEntity_NominalMeasurementInformationContentEntity_${employeetitle_uuid} .
            
            cco:InformationBearingEntity_NominalMeasurementInformationContentEntity_${employeetitle_uuid} a cco:InformationBearingEntity ;
              cco:has_text_value "${employeetitle}";
              obo:BFO_0000050 cco:VerifiableCredential_${verfiableCredentialId} .
  
              cco:VerifiableCredential_${verfiableCredentialId} cco:designated_by cco:VerifiableCredential_${verfiableCredentialId}_desc . 
  
              cco:VerifiableCredential_${verfiableCredentialId}_desc a cco:DesignativeName ; 
                cco:has_text_value "${verfiableCredentialId}" .
            `;
      return triples;
    }
  } catch (e) {
    console.log("Employer role" + e);
  }
}

function pds_weight(person: string, weight: string, verfiableCredentialId: string) {
  try {
    let personWeight_uuid = uuidv4();
    let weightIRI = weight.replace(/\s/g, "")
    let triples = `
    <${person}> a cco:Person ;
    cco:has_quality <http://www.ontologyrepository.com/CommonCoreOntologies/Quality-Weight-${personWeight_uuid}> .

    <http://www.ontologyrepository.com/CommonCoreOntologies/Quality-Weight-${personWeight_uuid}> a cco:Weight ; 
    cco:is_measured_by <http://www.ontologyrepository.com/CommonCoreOntologies/${personWeight_uuid}-Quality-Weight-MeasuredICE> . 

    <http://www.ontologyrepository.com/CommonCoreOntologies/${personWeight_uuid}-Quality-Weight-MeasuredICE>  a cco:MeasurementInformationContentEntity ; 
     obo:RO_0000056 <http://www.ontologyrepository.com/CommonCoreOntologies/${personWeight_uuid}-Quality-Weight-MeasuredIBE> . 

  <http://www.ontologyrepository.com/CommonCoreOntologies/${personWeight_uuid}-Quality-Weight-MeasuredIBE>  a cco:InformationBearingEntity ; 
      cco:has_text_value "${weight}" ;
      obo:BFO_0000050 cco:VerifiableCredential_${verfiableCredentialId} .

      cco:VerifiableCredential_${verfiableCredentialId} cco:designated_by cco:VerifiableCredential_${verfiableCredentialId}_desc . 

      cco:VerifiableCredential_${verfiableCredentialId}_desc a cco:DesignativeName ; 
        cco:has_text_value "${verfiableCredentialId}" .
`
    return triples
  } catch (error) {
    console.log("Weight error: " + error)
  }
}


export function mappingFuction(person: string, attribute: string, value: string, verifiableCredentialId: string, callback: ({ success: boolean, data: string }) => void) {
  try {
    let attributeClean = attribute.toLocaleLowerCase()
    let guid = encodeURIComponent(attributeClean + value + verifiableCredentialId)
    switch (attributeClean) {
      case "firstname": {
        let triples = firstname.replace("${person}", person)
        triples = triples.replace("${value}", value)
        triples = triples.replace("${verfiableCredentialId}", verifiableCredentialId)
        triples = triples.replace("${guid}", guid)
        console.log(triples)
        return callback({
          success: true,
          data: triples
        })
      }
      case "email": {
        let triples = pds_email(person, value, verifiableCredentialId)
        return callback({
          success: true,
          data: triples
        })
      }
      case "lastname": {
        let triples = pds_lastname(person, value, verifiableCredentialId)
        return callback({
          success: true,
          data: triples
        })
      }
      case "birthday": {
        let triples = pds_birthday(person, value, verifiableCredentialId)
        return callback({
          success: true,
          data: triples
        })
      }
      case "mailingstreet": {
        let triples = pds_mailingstreet(person, value, verifiableCredentialId)
        return callback({
          success: true,
          data: triples
        })
      }
      case "mailingcity": {
        let triples = pds_mailingcity(person, value, verifiableCredentialId)
        return callback({
          success: true,
          data: triples
        })
      }
      case "mailingstate": {
        let triples = pds_mailingstate(person, value, verifiableCredentialId)
        return callback({
          success: true,
          data: triples
        })
      }
      case "mailingpostcode": {
        let triples = pds_mailingpostcode(person, value, verifiableCredentialId)
        return callback({
          success: true,
          data: triples
        })
      }
      case "mailingcountry": {
        let triples = pds_mailingcountry(person, value, verifiableCredentialId)
        return callback({
          success: true,
          data: triples
        })
      }
      case "homephonenumber": {
        let triples = pds_homephonenumber(person, value, verifiableCredentialId)
        return callback({
          success: true,
          data: triples
        })
      }
      case "mobilephonenumber": {
        let triples = pds_mobilephonenumber(person, value, verifiableCredentialId)
        return callback({
          success: true,
          data: triples
        })
      }
      case "employername": {
        let triples = pds_employername(person, value, verifiableCredentialId)
        return callback({
          success: true,
          data: triples
        })
      }
      case "employeetitle": {
        let triples = pds_employeetitle(person, value, verifiableCredentialId)
        return callback({
          success: true,
          data: triples
        })
      }
      case "weight": {
        let triples = pds_weight(person, value, verifiableCredentialId)
        return callback({
          success: true,
          data: triples
        })
      }
      default: {
        return callback({
          success: false,
          data: "triples"
        })
      }
    }
  } catch (error) {
    console.log(error)
  }

}

