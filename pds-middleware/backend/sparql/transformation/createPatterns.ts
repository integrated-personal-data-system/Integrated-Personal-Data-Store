import { v4 as uuidv4 } from 'uuid'
import { readCertByName } from "../readMyCerts"
import { createPrivateKey } from "crypto"

function pds_firstname(person: string, firstname: string) {
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
                cco:has_text_value "${firstname}".
            `;
      return triples;
    }
  } catch (e) {
    console.log("FirstName:" + e);
  }
}

function pds_email(person: string, email: string) {
  var email_uuid, triples;

  try {
    if (email !== "") {
      email_uuid = uuidv4();
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
                cco:has_text_value "${email}".
  `;
      return triples;
    }
  } catch (e) {
    console.log("Email:" + e);
  }
}

function pds_lastname(person: string, lastname: string) {
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
                cco:has_text_value "${lastname}".
  `;
      return triples;
    }
  } catch (e) {
    console.log("Lastname:" + e);
  }
}

function pds_birthday(person: string, birthday: string) {
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
                cco:has_text_value "${birthday}".
  `;
      return triples;
    }
  } catch (e) {
    console.log("Birthday:" + e);
  }
}

function pds_mailingstreet(person: string, mailingstreet: string) {
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
            
            cco:StreetAdress_${mailingstreet_uuid} a cco:StreetAdress ;
                obo:RO_0010001 cco:InformationBearingEntity_StreetAdress_${mailingstreet_uuid} .
            
            cco:InformationBearingEntity_StreetAdress_${mailingstreet_uuid} a cco:InformationBearingEntity ;
                cco:has_text_value "${mailingstreet}".
            `;
      return triples;
    }
  } catch (e) {
    console.log("Mailingstreet:" + e);
  }
}

function pds_mailingcity(person: string, mailingcity: string) {
  var mailingcity_uuid, triples;

  try {
    if (mailingcity !== "") {
      mailingcity_uuid = uuidv4();
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
                cco:has_text_value "${mailingcity}".
            `;
      return triples;
    }
  } catch (e) {
    console.log("Mailingcity:" + e);
  }
}

function pds_mailingstate(person: string, mailingstate: string) {
  var mailingstate_uuid, triples;

  try {
    if (mailingstate !== "") {
      mailingstate_uuid = uuidv4();
      triples = `
            <${person}> a cco:Person;
            cco:agent_in cco:ActOfResiding_${mailingstate_uuid} .

            cco:ActOfResiding_${mailingstate_uuid} a cco:ActOfResiding ;
                obo:RO_0000057 cco:ResidentialFacility_${mailingstate_uuid} .
            
            cco:ResidentialFacility_${mailingstate_uuid} a cco:ResidentialFacility ;
                obo:RO_0001025 cco:LocalAdministrativeRegion_${mailingstate_uuid} .
            
            cco:LocalAdministrativeRegion_${mailingstate_uuid} a cco:LocalAdministrativeRegion ;
                obo:BFO_0000050 cco:FirstOrderAdministrativeRegion_${mailingstate_uuid} .
            
            cco:FirstOrderAdministrativeRegion_${mailingstate_uuid} a cco:FirstOrderAdministrativeRegion ;
                cco:designated_by cco:DesignativeName_${mailingstate_uuid} .
            
            cco:DesignativeName_${mailingstate_uuid} a cco:DesignativeName ;
                obo:RO_0010001 cco:InformationBearingEntity_DesignativeName_${mailingstate_uuid} .
            
            cco:InformationBearingEntity_DesignativeName_${mailingstate_uuid} a cco:InformationBearingEntity ;
                cco:has_text_value "${mailingstate}".
            `;
      return triples;
    }
  } catch (e) {
    console.log("Mailingstate:" + e);
  }
}

function pds_mailingpostcode(person: string, mailingpostcode: string) {
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
                cco:has_text_value "${mailingpostcode}".
            `;
      return triples;
    }
  } catch (e) {
    console.log("Mailing postal code:" + e);
  }
}

function pds_mailingcountry(person: string, mailingcountry: string) {
  var mailingcountry_uuid, mailingstate_uuid, triples;

  try {
    if (mailingcountry !== "") {
      mailingcountry_uuid = uuidv4();
      mailingstate_uuid = uuidv4();
      triples = `
            <${person}> a cco:Person;
            cco:agent_in cco:ActOfResiding_${mailingcountry_uuid} .

            cco:ActOfResiding_${mailingcountry_uuid} a cco:ActOfResiding ;
                obo:RO_0000057 cco:ResidentialFacility_${mailingcountry_uuid} .
            
            cco:ResidentialFacility_${mailingcountry_uuid} a cco:ResidentialFacility ;
                obo:RO_0001025 cco:LocalAdministrativeRegion_${mailingcountry_uuid} .
            
                cco:LocalAdministrativeRegion_${mailingcountry_uuid} a cco:LocalAdministrativeRegion ;
                 obo:BFO_0000050 cco:FirstOrderAdministrativeRegion_${mailingcountry_uuid} .
            
            cco:FirstOrderAdministrativeRegion_${mailingcountry_uuid} a cco:FirstOrderAdministrativeRegion ;
                obo:BFO_0000050 cco:County_${mailingcountry_uuid} .
            
            cco:County_${mailingcountry_uuid} a cco:Country ;
                cco:designated_by cco:PostalCodeDesignativeName_${mailingcountry_uuid} .
            
            cco:PostalCodeDesignativeName_${mailingcountry_uuid} a cco:DesignativeName ;
                obo:RO_0010001 cco:InformationBearingEntity_DesignativeName_${mailingcountry_uuid} .
            
            cco:InformationBearingEntity_DesignativeName_${mailingcountry_uuid} a cco:InformationBearingEntity ;
                cco:has_text_value "${mailingcountry}".
            `;
      return triples;
    }
  } catch (e) {
    console.log("Mailingcountry:" + e);
  }
}

function pds_homephonenumber(person: string, homephonenumber: string) {
  var homephonenumber_uuid, triples;

  try {
    if (homephonenumber !== "") {
      homephonenumber_uuid = uuidv4();
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
                cco:has_text_value "${homephonenumber}".
            `;
      return triples;
    }
  } catch (e) {
    console.log("Home phone number:" + e);
  }
}

function pds_mobilephonenumber(person: string, mobilephonenumber: string) {
  var mobilephonenumber_uuid, triples;

  try {
    if (mobilephonenumber !== "") {
      mobilephonenumber_uuid = uuidv4();
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
                cco:has_text_value "${mobilephonenumber}".
            `;
      return triples;
    }
  } catch (e) {
    console.log("Mobile phone number:" + e);
  }
}

function pds_employername(person: string, employername: string) {
  var employername_uuid, triples;

  try {
    if (employername !== "") {
      employername_uuid = uuidv4();
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
                cco:has_text_value "${employername}".
            `;
      return triples;
    }
  } catch (e) {
    console.log("Name of employeer" + e);
  }
}

//   function pds_employerindustry(organization, employerindustry) {
//     var employerindustry_uuid, triples;

//     try {
//       if (employerindustry !== "") {
//         employerindustry_uuid =uuidv4();
//         triples = `
//             ${organization} obo:RO_0000053 cco:Capability_${employerindustry_uuid} .

//             cco:Capability_${employerindustry_uuid} a cco:Capability;
//             cco:is_measured_by_nominal cco:DescriptiveMeasurementContentEntity_${employerindustry_uuid}.

//             cco:DescriptiveMeasurementContentEntity_${employerindustry_uuid} a cco:DescriptiveMeasurementContentEntity ;
//             obo:RO_0010001 cco:InformationBearingEntity_DescriptiveMeasurementContentEntity_${employerindustry_uuid} .

//             cco:InformationBearingEntity_DescriptiveMeasurementContentEntity_${employerindustry_uuid} a cco:InformationBearingEntity ;
//             cco:has_text_value "${employerindustry}".
//             `;
//         return triples;
//       }
//     } catch (e) {
//       console.log("Place of employeer industry" + e);
//     }
//   }

//   function pds_employerstreet(organization, employerstreet) {
//     var employerstreet_uuid, triples;

//     try {
//       if (employerstreet !== "") {
//         employerstreet_uuid =uuidv4();
//         triples = `
//   ${organization} cco:agent_in cco:ActOfInhabitancy_${employerstreet_uuid} .
//   cco:ActOfInhabitancy_${employerstreet_uuid} a cco:ActOfInhabitancy;
//   cco:has_object cco:Facility_${employerstreet_uuid}.

//   cco:Facility_${employerstreet_uuid} a cco:Facility ;
//   cco:designed_by cco:StreetAdress_${employerstreet_uuid} .

//   cco:StreetAdress_${employerstreet_uuid} a cco:StreetAdress ;
//   obo:RO_0010001 cco:InformationBearingEntity_StreetAdress_${employerstreet_uuid} .

//   cco:InformationBearingEntity_StreetAdress_${employerstreet_uuid} a cco:InformationBearingEntity ;
//   cco:has_text_value "${employerstreet}".
//   `;
//         return triples;
//       }
//     } catch (e) {
//       console.log("Employeers address" + e);
//     }
//   }

//   function pds_employercity(organization, employercity) {
//     var employercity_uuid, triples;

//     try {
//       if (employercity !== "") {
//         employercity_uuid =uuidv4();
//         triples = `
//   ${organization} cco:agent_in cco:ActOfInhabitancy_${employercity_uuid} .
//   cco:ActOfInhabitancy_${employercity_uuid} a cco:ActOfInhabitancy;
//   cco:has_object cco:Facility_${employercity_uuid}.

//   cco:Facility_${employercity_uuid} a cco:Facility ;
//   obo:RO_0001025 cco:LocalAdministrativeRegion_${employercity_uuid} .

//   cco:LocalAdministrativeRegion_${employercity_uuid} a cco:LocalAdministrativeRegion ;
//   cco:designed_by cco:DesignativeName_${employercity_uuid}.

//   cco:DesignativeName_${employercity_uuid} a cco:DesignativeName ;
//   obo:RO_0010001 cco:InformationBearingEntity_DesignativeName_${employercity_uuid} .

//   cco:InformationBearingEntity_DesignativeName_${employercity_uuid} a cco:InformationBearingEntity;
//   cco:has_text_value "${employercity}".
//   `;
//         return triples;
//       }
//     } catch (e) {
//       console.log("Employeers city" + e);
//     }
//   }

//   function pds_employerstate(organization, employerstate) {
//     var employerstate_uuid, triples;

//     try {
//       if (employerstate !== "") {
//         employerstate_uuid =uuidv4();
//         triples = `
//   ${organization} cco:agent_in cco:ActOFInhabitancy_${employerstate_uuid} .
//   cco:ActOfInhabitancy_${employerstate_uuid} a cco:ActOfInhabitancy;
//   cco:has_object cco:Facility_${employerstate_uuid}.

//   cco:Facility_${employerstate_uuid} a cco:Facility ;
//   obo:RO_0001025 cco:LocalAdministrativeRegion_${employerstate_uuid} .

//   cco:LocalAdministrativeRegion_${employerstate_uuid} a cco:LocalAdministrativeRegion ;
//   obo:BFO_0000050 cco:FirstOrderAdministrativeRegion_${employerstate_uuid} .

//   cco:FirstOrderAdministrativeRegion_${employerstate_uuid} a cco:FirstOrderAdministrativeRegion ;
//   cco:designated_by cco:DesignativeName_${employerstate_uuid} .

//   cco:DesignativeName_${employerstate_uuid} a cco:DesignativeName ;
//   obo:RO_0010001 cco:InformationBearingEntity_DesignativeName_${employerstate_uuid} .

//   cco:InformationBearingEntity_DesignativeName_${employerstate_uuid} a cco:InformationBearingEntity ;
//   cco:has_text_value "${employerstate}".
//   `;
//         return triples;
//       }
//     } catch (e) {
//       console.log("Employeer state" + e);
//     }
//   }

//   function pds_employerpostcode(organization, employerpostcode) {
//     var employerpostcode_uuid, triples;

//     try {
//       if (employerpostcode !== "") {
//         employerpostcode_uuid =uuidv4();
//         triples = `
//   ${organization} cco:agent_in cco:ActOFInhabitancy_${employerpostcode_uuid} .
//   cco:ActOfInhabitancy_${employerpostcode_uuid} a cco:ActOfInhabitancy;
//   cco:has_object cco:Facility_${employerpostcode_uuid}.

//   cco:Facility_${employerpostcode_uuid} a cco:Facility ;
//   obo:RO_0001025 cco:PostalZone_${employerpostcode_uuid} .

//   cco:PostalZone_${employerpostcode_uuid} a cco:PostalZone;
//   cco:designated_by cco:PostalCode_${employerpostcode_uuid} .

//   cco:PostalCode_${employerpostcode_uuid} a cco:PostalCode;
//   obo:RO_0010001 cco:InformationBearingEntity_PostalCode_${employerpostcode_uuid} .

//   cco:InformationBearingEntity_PostalCode_${employerpostcode_uuid} a cco:InformationBearingEntity;
//   cco:has_text_value "${employerpostcode_uuid}".
//   `;
//         return triples;
//       }
//     } catch (e) {
//       console.log("Employeer post code" + e);
//     }
//   }

//   function pds_employercountry(organization, employercountry) {
//     var employercountry_uuid, triples;

//     try {
//       if (employercountry !== "") {
//         employercountry_uuid =uuidv4();
//         triples = `
//   ${organization} cco:agent_in cco:ActOfInhabitancy_${employercountry_uuid} .
//   cco:ActOfInhebitancy_${employercountry_uuid} a cco:ActOfInhebitancy ;
//   cco:has_object cco:Facility_${employercountry_uuid} .

//   cco:Facility_${employercountry_uuid} a cco:Facility ;
//   obo:RO_0001025 cco:LocalAdministrativeRegion_${employercountry_uuid} .

//   cco:LocalAdministrativeRegion_${employercountry_uuid} a cco:LocalAdministrativeRegion ;
//   obo:BFO_0000050 cco:FirstOrderAdministrativeRegion_${employercountry_uuid} .

//   cco:FirstOrderAdministrativeRegion_${employercountry_uuid} a cco:FirstOrderAdministrativeRegion ;
//   obo:BFO_0000050 cco:County_${employercountry_uuid} .

//   cco:Country_${employercountry_uuid} a cco:Country ;
//   cco:designated_by cco:DesignativeName_${employercountry_uuid} .

//   cco:DesignativeName_${employercountry_uuid} a cco:DesignativeName ;
//   obo:RO_0010001 cco:InformationBearingEntity_DesignativeName_${employercountry_uuid} .

//   cco:InformationBearingEntity_DesignativeName_${employercountry_uuid} a cco:InformationBearingEntity ;
//   cco:has_text_value "${employercountry}".
//   `;
//         return triples;
//       }
//     } catch (e) {
//       console.log("Employer country:" + e);
//     }
//   }

//   function pds_employerphone(organization, employerphone) {
//     var employerphone_uuid, triples;

//     try {
//       if (employerphone !== "") {
//         employerphone_uuid =uuidv4();
//         triples = `
//   ${organization} cco:agent_in cco:ActOFOwnership_${employerphone_uuid} .
//   cco:ActOfOwnership_${employerphone_uuid} a cco:ActOfOwnership;
//   cco:has_object cco:Telephone_${employerphone_uuid}.

//   cco:Telephone_${employerphone_uuid} a cco:Telephone ;
//   obo:RO_000056 cco:StasisOfTelecommunicayionEndpointAssignment_${employerphone_uuid} .

//   cco:StasisOfTelecommunicayionEndpointAssignment_${employerphone_uuid} a cco:StasisOfTelecommunicayionEndpointAssignment ;
//   obo:RO_0000057 cco:TelecommunicationEndpoint_${employerphone_uuid} .

//   cco:TelecommunicationEndpoint_${employerphone_uuid} a cco:TelecommunicationEndpoint ;
//   cco:designed_by cco:TelephoneNumber_${employerphone_uuid} .

//   cco:TelephoneNumber_${employerphone_uuid} a cco:TelephoneNumber ;
//   obo:RO_0010001 cco:InformationBearingEntity_TelephoneNumber_${employerphone_uuid} .

//   cco:InformationBearingEntity_TelephoneNumber_${employerphone_uuid} a cco:InformationBearingEntity ;
//   cco:has_text_value "${employerphone}".
//   `;
//         return triples;
//       }
//     } catch (e) {
//       console.log("Employer phone number" + e);
//     }
//   }

//   function pds_employerfax(organization, employerfax) {
//     var employerfax_uuid, triples;

//     try {
//       if (employerfax !== "") {
//         employerfax_uuid =uuidv4();
//         triples = `
//   ${organization} cco:agent_in cco:ActOFOwnership_${employerfax_uuid} .
//   cco:ActOfOwnership_${employerfax_uuid} a cco:ActOfOwnership;
//   cco:has_object cco:FacsimileMachine_${employerfax_uuid}.

//   cco:FacsimileMachine_${employerfax_uuid} a cco:FacsimileMachine;
//   obo:RO_000056 cco:StasisOfTelecommunicayionEndpointAssignment_${employerfax_uuid} .

//   cco:StasisOfTelecommunicayionEndpointAssignment_${employerfax_uuid} a cco:StasisOfTelecommunicayionEndpointAssignment ;
//   obo:RO_0000057 cco:TelecommunicationEndpoint_${employerfax_uuid} .

//   cco:TelecommunicationEndpoint_${employerfax_uuid} a cco:TelecommunicationEndpoint ;
//   cco:designed_by cco:FacsimileMachineNumber_${employerfax_uuid} .

//   cco:FacsimileMachineNumber_${employerfax_uuid} a cco:FacsimileMachineNumber ;
//   obo:RO_0010001 cco:InformationBearingEntity_FacsimileMachineNumber_${employerfax_uuid} .

//   cco:InformationBearingEntity_FacsimileMachineNumber_${employerfax_uuid} a cco:InformationBearingEntity ;
//   cco:has_text_value "${employerfax}".
//   `;
//         return triples;
//       }
//     } catch (e) {
//       console.log("Employer fax:" + e);
//     }
//   }

function pds_employeetitle(person: string, employeetitle: string) {
  var employeetitle_uuid, triples;

  try {
    if (employeetitle !== "") {
      employeetitle_uuid = uuidv4();
      triples = `
            <${person}> a cco:Person;
            obo:RO_0000053 cco:OccupationRole_${employeetitle_uuid} .

            cco:OccupationRole_${employeetitle_uuid} a cco:OccupationRole;
                cco:described_by cco:NominalMeasurementInformationContentEntity_${employeetitle_uuid} .
            
            cco:NominalMeasurementInformationContentEntity_${employeetitle_uuid} a cco:NominalMeasurementInformationContentEntity;
                obo:RO_0010001 cco:InformationBearingEntity_NominalMeasurementInformationContentEntity_${employeetitle_uuid} .
            
            cco:InformationBearingEntity_NominalMeasurementInformationContentEntity_${employeetitle_uuid} a cco:InformationBearingEntity ;
                cco:has_text_value "${employeetitle}".
            `;
      return triples;
    }
  } catch (e) {
    console.log("Employer role" + e);
  }
}




function mappingFuction(person: string, attribute: string, value: string, cert: string) {
  let attributeClean = attribute.toLocaleLowerCase()
  // if (cert != "") {
  //   readCertByName(cert, (result) => {
  //     console.log(String(result.data.PrivateKey.value))

  //   })
  // }


  switch (attributeClean) {
    case "firstname": {
      return pds_firstname(person, value)
    }
    case "email": {
      return pds_email(person, value)
    }
    case "lastname": {
      return pds_lastname(person, value)
    }
    case "dateofbirth": {
      return pds_birthday(person, value)
    }
    case "homemailingaddress": {
      return pds_mailingstreet(person, value)
    }
    case "mailingcity": {
      return pds_mailingcity(person, value)
    }
    case "mailingstate": {
      return pds_mailingstate(person, value)
    }
    case "homepostalcode": {
      return pds_mailingpostcode(person, value)
    }
    case "mailingcountry": {
      return pds_mailingcountry(person, value)
    }
    case "homephonenumber": {
      return pds_homephonenumber(person, value)
    }
    case "mobilephonenumber": {
      return pds_mobilephonenumber(person, value)
    }
    case "employername": {
      return pds_employername(person, value)
    }
    case "employeetitle": {
      return pds_employeetitle(person, value)
    }
    default: {
      return ""
    }
  }
}

export default mappingFuction