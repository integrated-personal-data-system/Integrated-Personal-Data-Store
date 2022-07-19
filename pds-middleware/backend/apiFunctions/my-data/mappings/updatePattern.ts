

function update_firstname(value: string, oldDataValue: string) {
    try {
        return (`PREFIX cco: <http://www.ontologyrepository.com/CommonCoreOntologies/>
            PREFIX obo: <http://purl.obolibrary.org/obo/>
    
            DELETE {  
                ?PersonGivenName a cco:PersonGivenName ;
                    <http://purl.obolibrary.org/obo/RO_0010001>  ?PersonGivenNameIBE . 
                ?PersonGivenNameIBE cco:has_text_value "${oldDataValue}".
            }
            INSERT { 
                ?PersonGivenName a cco:PersonGivenName ;
                    <http://purl.obolibrary.org/obo/RO_0010001>  ?PersonGivenNameIBE . 
                ?PersonGivenNameIBE cco:has_text_value "${value}". 
            }
            WHERE { 
                ?PersonGivenName a cco:PersonGivenName ;
                    <http://purl.obolibrary.org/obo/RO_0010001>  ?PersonGivenNameIBE . 
                ?PersonGivenNameIBE cco:has_text_value "${oldDataValue}".
            }
      `)
    } catch (error) {
        console.log(error)
        return ""
    }
}


function update_lastname(value: string, oldDataValue: string) {
    try {
        return (`PREFIX cco: <http://www.ontologyrepository.com/CommonCoreOntologies/>
      PREFIX obo: <http://purl.obolibrary.org/obo/>
  
      DELETE {  
        ?PersonFamilyName a cco:PersonFamilyName ;
                            <http://purl.obolibrary.org/obo/RO_0010001> ?PersonFamilyNameIBE. 
          
                      ?PersonFamilyNameIBE cco:has_text_value "${oldDataValue}" .  
      }
      INSERT { 
        ?PersonFamilyName a cco:PersonFamilyName ;
                            <http://purl.obolibrary.org/obo/RO_0010001> ?PersonFamilyNameIBE. 
          
                      ?PersonFamilyNameIBE cco:has_text_value "${value}" . 
      }
      WHERE { 
        ?PersonFamilyName a cco:PersonFamilyName ;
                            <http://purl.obolibrary.org/obo/RO_0010001> ?PersonFamilyNameIBE. 
          
                      ?PersonFamilyNameIBE cco:has_text_value "${oldDataValue}" .  
        }
    `)
    } catch (error) {
        console.log(error)
        return ""
    }
}


function update_DateOfBirth(value: string, oldDataValue: string) {
    try {
        return (`PREFIX cco: <http://www.ontologyrepository.com/CommonCoreOntologies/>
      PREFIX obo: <http://purl.obolibrary.org/obo/>
  
      DELETE {  
        ?Birth a cco:Birth;
                     cco:occurs_on ?Birth_Day. 
         
                   # Date Of Birth
                   ?Birth_Day a cco:Day;
                         cco:designated_by ?DataIdentifier . 
         
                   ?DataIdentifier <http://purl.obolibrary.org/obo/RO_0010001> ?DataIdentifierIBE . 
         
                   ?DataIdentifierIBE  cco:has_text_value "${oldDataValue}" ;
       }
       INSERT { 
         ?Birth a cco:Birth;
                     cco:occurs_on ?Birth_Day. 
         
                   # Date Of Birth
                   ?Birth_Day a cco:Day;
                         cco:designated_by ?DataIdentifier . 
         
                   ?DataIdentifier <http://purl.obolibrary.org/obo/RO_0010001> ?DataIdentifierIBE . 
         
                   ?DataIdentifierIBE  cco:has_text_value "${value}" ;
       }
       WHERE { 
        ?Birth a cco:Birth;
                     cco:occurs_on ?Birth_Day. 
         
                   # Date Of Birth
                   ?Birth_Day a cco:Day;
                         cco:designated_by ?DataIdentifier . 
         
                   ?DataIdentifier <http://purl.obolibrary.org/obo/RO_0010001> ?DataIdentifierIBE . 
         
                   ?DataIdentifierIBE  cco:has_text_value "${oldDataValue}" ;
         }
       `)
    } catch (error) {
        console.log(error)
        return ""
    }
}

function update_homemailingaddres(value: string, oldDataValue: string) {
    try {
        return (`PREFIX cco: <http://www.ontologyrepository.com/CommonCoreOntologies/>
          PREFIX obo: <http://purl.obolibrary.org/obo/>
          DELETE {  
            ?StreetAdress a cco:StreetAddress;
                         obo:RO_0010001 ?StreetAdressIBE .
                 
                       ?StreetAdressIBE a cco:InformationBearingEntity;
                         cco:has_text_value  "${oldDataValue}" .
          }
          INSERT { 
            ?StreetAdress a cco:StreetAddress;
                         obo:RO_0010001 ?StreetAdressIBE .
                 
                       ?StreetAdressIBE a cco:InformationBearingEntity;
                         cco:has_text_value  "${value}" .
          }
          WHERE { 
            ?StreetAdress a cco:StreetAddress;
                         obo:RO_0010001 ?StreetAdressIBE .
                 
                       ?StreetAdressIBE a cco:InformationBearingEntity;
                         cco:has_text_value  "${oldDataValue}" .
            }
          `)
    } catch (error) {
        console.log(error)
        return ""
    }
}

function update_email(value: string, oldDataValue: string) {
    try {
        return (`PREFIX cco: <http://www.ontologyrepository.com/CommonCoreOntologies/>
          PREFIX obo: <http://purl.obolibrary.org/obo/>
          DELETE {  
            ?EmailBox a cco:EmailBox;
                                 obo:RO_0000056 ?StasisOfTelecommunicationEndpointAssignment . 
               
                           ?StasisOfTelecommunicationEndpointAssignment a cco:StasisOfTelecommunicationEndpointAssignment ; 
                                             obo:RO_0000057 ?TelecommunicationEndpoint . 
                       
                           ?TelecommunicationEndpoint a cco:TelecommunicationEndpoint ;
                                                   cco:designated_by ?EmailAddress . 
                             ?EmailAddress a cco:EmailAddress;
                                       obo:RO_0010001 ?EmailIBE .
                       
                         ?EmailIBE cco:has_text_value  "${value}" .
           }
           INSERT { 
             ?EmailBox a cco:EmailBox;
                                 obo:RO_0000056 ?StasisOfTelecommunicationEndpointAssignment . 
               
                           ?StasisOfTelecommunicationEndpointAssignment a cco:StasisOfTelecommunicationEndpointAssignment ; 
                                             obo:RO_0000057 ?TelecommunicationEndpoint . 
                       
                           ?TelecommunicationEndpoint a cco:TelecommunicationEndpoint ;
                                                   cco:designated_by ?EmailAddress . 
                             ?EmailAddress a cco:EmailAddress;
                                       obo:RO_0010001 ?EmailIBE .
                       
                         ?EmailIBE cco:has_text_value "rockc@udel.edu" ; 
           }
           WHERE { 
             ?EmailBox a cco:EmailBox;
                                 obo:RO_0000056 ?StasisOfTelecommunicationEndpointAssignment . 
               
                           ?StasisOfTelecommunicationEndpointAssignment a cco:StasisOfTelecommunicationEndpointAssignment ; 
                                             obo:RO_0000057 ?TelecommunicationEndpoint . 
                       
                           ?TelecommunicationEndpoint a cco:TelecommunicationEndpoint ;
                                                   cco:designated_by ?EmailAddress . 
                             ?EmailAddress a cco:EmailAddress;
                                       obo:RO_0010001 ?EmailIBE .
                       
                         ?EmailIBE cco:has_text_value "${oldDataValue}" .
             }
          `)
    } catch (error) {
        console.log(error)
        return ""
    }
}

function update_mailingcity(value: string, oldDataValue: string) {
    try {
        return (`PREFIX cco: <http://www.ontologyrepository.com/CommonCoreOntologies/>
          PREFIX obo: <http://purl.obolibrary.org/obo/>
          DELETE {  
            ?LocalAdminRegion1DesName a cco:DesignativeName;
                         obo:RO_0010001  ?LocalAdminRegion1DesNameIBE. 
             
                         ?LocalAdminRegion1DesNameIBE cco:has_text_value "${oldDataValue}" .
           }
           INSERT { 
              ?LocalAdminRegion1DesName a cco:DesignativeName;
                         obo:RO_0010001  ?LocalAdminRegion1DesNameIBE. 
             
                         ?LocalAdminRegion1DesNameIBE cco:has_text_value "${value}" .
           }
           WHERE { 
              ?LocalAdminRegion1DesName a cco:DesignativeName;
                         obo:RO_0010001  ?LocalAdminRegion1DesNameIBE. 
             
                         ?LocalAdminRegion1DesNameIBE cco:has_text_value "${oldDataValue}" .
             }
          `)
    } catch (error) {
        console.log(error)
        return ""
    }
}

function update_mailingPostCode(value: string, oldDataValue: string) {
    try {
        return (`PREFIX cco: <http://www.ontologyrepository.com/CommonCoreOntologies/>
          PREFIX obo: <http://purl.obolibrary.org/obo/>
          DELETE {  
            ?PostalZone a cco:PostalZone;
                         cco:designated_by ?PostalCode.
                   
                       ?PostalCode a cco:PostalCode;
                         obo:RO_0010001 ?PostalCodeIBE.
                   
                       ?PostalCodeIBE a cco:InformationBearingEntity;
                         cco:has_text_value "${oldDataValue}" .
           }
           INSERT { 
              ?PostalZone a cco:PostalZone;
                         cco:designated_by ?PostalCode.
                   
                       ?PostalCode a cco:PostalCode;
                         obo:RO_0010001 ?PostalCodeIBE.
                   
                       ?PostalCodeIBE a cco:InformationBearingEntity;
                         cco:has_text_value "${value}" .
           }
           WHERE { 
             ?PostalZone a cco:PostalZone;
                         cco:designated_by ?PostalCode.
                   
                       ?PostalCode a cco:PostalCode;
                         obo:RO_0010001 ?PostalCodeIBE.
                   
                       ?PostalCodeIBE a cco:InformationBearingEntity;
                         cco:has_text_value "${oldDataValue}" .
           
             }
          
          `)
    } catch (error) {
        console.log(error)
        return ""
    }
}

function update_weight(value: string, oldDataValue: string) {
    try {
        return (`PREFIX cco: <http://www.ontologyrepository.com/CommonCoreOntologies/>
          PREFIX obo: <http://purl.obolibrary.org/obo/>
          DELETE {  
            ?WeightQuality a cco:Weight;
                         cco:is_measured_by ?WeightQualityICE .    
                   
                   ?WeightQualityICE obo:RO_0000056 ?WeightQualityIBE . 
                   
                   ?WeightQualityIBE  cco:has_text_value "${oldDataValue}" .
           }
           INSERT { 
             ?WeightQuality a cco:Weight;
                         cco:is_measured_by ?WeightQualityICE .    
                   
                   ?WeightQualityICE obo:RO_0000056 ?WeightQualityIBE . 
                   
                   ?WeightQualityIBE  cco:has_text_value "${value}" .
           }
           WHERE { 
             ?WeightQuality a cco:Weight;
                         cco:is_measured_by ?WeightQualityICE .    
                   
                   ?WeightQualityICE obo:RO_0000056 ?WeightQualityIBE . 
                   
                   ?WeightQualityIBE  cco:has_text_value "${oldDataValue}" .
           
             }
          
          `)
    } catch (error) {
        console.log(error)
        return ""
    }
}

function update_mailingstate(value: string, oldDataValue: string) {
    try {
        return (`PREFIX cco: <http://www.ontologyrepository.com/CommonCoreOntologies/>
          PREFIX obo: <http://purl.obolibrary.org/obo/>
          DELETE {  
            ?LocalAdminRegion1StateCityDesc a cco:DesignativeName ; 
                                               <http://purl.obolibrary.org/obo/RO_0010001>   ?LocalAdminRegion1StateCityDescIBE . 
              
               ?LocalAdminRegion1StateCityDescIBE cco:has_text_value "${oldDataValue}" .
           }
           INSERT { 
             ?LocalAdminRegion1StateCityDesc a cco:DesignativeName ; 
                                               <http://purl.obolibrary.org/obo/RO_0010001>   ?LocalAdminRegion1StateCityDescIBE . 
               
               ?LocalAdminRegion1StateCityDescIBE cco:has_text_value "${value}" . 
           }
           WHERE { 
             ?LocalAdminRegion1StateCityDesc a cco:DesignativeName ; 
                                               <http://purl.obolibrary.org/obo/RO_0010001>   ?LocalAdminRegion1StateCityDescIBE . 
               
               ?LocalAdminRegion1StateCityDescIBE cco:has_text_value "${oldDataValue}" . 
           
             }
          
          `)
    } catch (error) {
        console.log(error)
        return ""
    }
}

function update_mailingCountry(value: string, oldDataValue: string) {
    try {
        return (`PREFIX cco: <http://www.ontologyrepository.com/CommonCoreOntologies/>
          PREFIX obo: <http://purl.obolibrary.org/obo/>
          DELETE {  
            ?LocalAdminRegion1StateCountry a cco:Country ; 
                        cco:designated_by ?CountryDesc  . 
              
            ?CountryDesc a cco:DesignativeName ; 
            <http://purl.obolibrary.org/obo/RO_0010001> ?CountryDescIBE .  
            
            ?CountryDescIBE cco:has_text_value "${oldDataValue}" .
          }
          INSERT { 
             ?LocalAdminRegion1StateCountry a cco:Country ; 
                        cco:designated_by ?CountryDesc  . 
              
            ?CountryDesc a cco:DesignativeName ; 
            <http://purl.obolibrary.org/obo/RO_0010001> ?CountryDescIBE .  
            
            ?CountryDescIBE cco:has_text_value "${value}" . 
          }
          WHERE { 
             ?LocalAdminRegion1StateCountry a cco:Country ; 
                        cco:designated_by ?CountryDesc  . 
              
            ?CountryDesc a cco:DesignativeName ; 
            <http://purl.obolibrary.org/obo/RO_0010001> ?CountryDescIBE .  
            
            ?CountryDescIBE cco:has_text_value "${oldDataValue}" .
          
            }
          `)
    } catch (error) {
        console.log(error)
        return ""
    }
}

function mappingUpdateFunction(attribute: string, value: string, oldDataValue: string) {
    let attributeClean = attribute.toLocaleLowerCase()
    switch (attributeClean) {
        case "firstname": {
            return update_firstname(value, oldDataValue)
        }
        case "email": {
            return update_email(value, oldDataValue)
        }
        case "lastname": {
            return update_lastname(value, oldDataValue)
        }
        case "birthday": {
            return update_DateOfBirth(value, oldDataValue)
        }
        case "mailingstreet": {
            return update_homemailingaddres(value, oldDataValue)
        }
        case "weight": {
            return update_weight(value, oldDataValue)
        }
        case "mailingcity": {
            return update_mailingcity(value, oldDataValue)
        }
        case "mailingpostcode": {
            return update_mailingPostCode(value, oldDataValue)
        }
        case "mailingstate": {
            return update_mailingstate(value, oldDataValue)
        }
        case "mailingcountry": {
            return update_mailingCountry(value, oldDataValue)
        }
        default: {
            return ""
        }
    }
}

export default mappingUpdateFunction