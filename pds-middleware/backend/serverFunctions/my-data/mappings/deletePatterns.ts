

function delete_firstname(value: string) {
  try {
    return (`PREFIX cco: <http://www.ontologyrepository.com/CommonCoreOntologies/>
    PREFIX obo: <http://purl.obolibrary.org/obo/>

        Delete {

                   ?PersonGivenName a cco:PersonGivenName ;
                       <http://purl.obolibrary.org/obo/RO_0010001>  ?PersonGivenNameIBE . 
                   ?PersonGivenNameIBE cco:has_text_value ?FirstName. 
                 
         }where{

                   ?PersonGivenName a cco:PersonGivenName ;
                       <http://purl.obolibrary.org/obo/RO_0010001>  ?PersonGivenNameIBE . 
                   ?PersonGivenNameIBE cco:has_text_value ?FirstName. 
           FILTER(?FirstName = "${value}")
       
     }
    `)
  } catch (error) {
    console.log(error)
    return ""
  }
}


function delete_lastname(value: string) {
  try {
    return (`PREFIX cco: <http://www.ontologyrepository.com/CommonCoreOntologies/>
    PREFIX obo: <http://purl.obolibrary.org/obo/>

   Delete {
        
     		?PersonFamilyName a cco:PersonFamilyName ;
                    <http://purl.obolibrary.org/obo/RO_0010001> ?PersonFamilyNameIBE. 
  
  			?PersonFamilyNameIBE cco:has_text_value ?LastName . 
    		
    }where{
           
  
     		?PersonFamilyName a cco:PersonFamilyName ;
                    <http://purl.obolibrary.org/obo/RO_0010001> ?PersonFamilyNameIBE. 
  
  			?PersonFamilyNameIBE cco:has_text_value ?LastName . 
  	FILTER(?LastName = "${value}")
  
}`)
  } catch (error) {
    console.log(error)
    return ""
  }
}


function delete_DateOfBirth(value: string) {
  try {
    return (`PREFIX cco: <http://www.ontologyrepository.com/CommonCoreOntologies/>
    PREFIX obo: <http://purl.obolibrary.org/obo/>

        Delete {

          ?Birth a cco:Birth;
            cco:occurs_on ?Birth_Day. 

          # Date Of Birth
          ?Birth_Day a cco:Day;
                cco:designated_by ?DataIdentifier . 

          ?DataIdentifier <http://purl.obolibrary.org/obo/RO_0010001> ?DataIdentifierIBE . 

          ?DataIdentifierIBE  cco:has_text_value ?Birthday ;

  
         }where{

            ?Birth a cco:Birth;
              cco:occurs_on ?Birth_Day. 

            # Date Of Birth
            ?Birth_Day a cco:Day;
                  cco:designated_by ?DataIdentifier . 

            ?DataIdentifier <http://purl.obolibrary.org/obo/RO_0010001> ?DataIdentifierIBE . 

            ?DataIdentifierIBE  cco:has_text_value ?Birthday ;
                  
           FILTER(?Birthday = "${value}")
       
     }
     `)
  } catch (error) {
    console.log(error)
    return ""
  }
}

function delete_homemailingaddres(value: string) {
  try {
    return (`PREFIX cco: <http://www.ontologyrepository.com/CommonCoreOntologies/>
        PREFIX obo: <http://purl.obolibrary.org/obo/>
           Delete {
        
    
           ?StreetAdress a cco:StreetAddress;
             obo:RO_0010001 ?StreetAdressIBE .
     
           ?StreetAdressIBE a cco:InformationBearingEntity;
             cco:has_text_value  ?MailingStreet ;
                    
            }where{

       
             ?StreetAdress a cco:StreetAddress;
               obo:RO_0010001 ?StreetAdressIBE .
       
             ?StreetAdressIBE a cco:InformationBearingEntity;
               cco:has_text_value  ?MailingStreet ;
              FILTER(?MailingStreet  = "${value}")
          
        }
        `)
  } catch (error) {
    console.log(error)
    return ""
  }
}

function delete_email(value: string) {
  try {
    return (`PREFIX cco: <http://www.ontologyrepository.com/CommonCoreOntologies/>
        PREFIX obo: <http://purl.obolibrary.org/obo/>
           Delete {
            ?EmailBox a cco:EmailBox;
                    obo:RO_0000056 ?StasisOfTelecommunicationEndpointAssignment . 
  
              ?StasisOfTelecommunicationEndpointAssignment a cco:StasisOfTelecommunicationEndpointAssignment ; 
                                obo:RO_0000057 ?TelecommunicationEndpoint . 
          
              ?TelecommunicationEndpoint a cco:TelecommunicationEndpoint ;
                                      cco:designated_by ?EmailAddress . 
                ?EmailAddress a cco:EmailAddress;
                          obo:RO_0010001 ?EmailIBE .
          
            ?EmailIBE cco:has_text_value ?Email ; 
         
                    
            }where{
                   
              ?EmailBox a cco:EmailBox;
              obo:RO_0000056 ?StasisOfTelecommunicationEndpointAssignment . 

            ?StasisOfTelecommunicationEndpointAssignment a cco:StasisOfTelecommunicationEndpointAssignment ; 
                              obo:RO_0000057 ?TelecommunicationEndpoint . 

            ?TelecommunicationEndpoint a cco:TelecommunicationEndpoint ;
                                    cco:designated_by ?EmailAddress . 
              ?EmailAddress a cco:EmailAddress;
                        obo:RO_0010001 ?EmailIBE .

            ?EmailIBE cco:has_text_value ?Email ; 
          
              FILTER(?Email = "${value}")
          
        }
        
        `)
  } catch (error) {
    console.log(error)
    return ""
  }
}

function delete_mailingcity(value: string) {
  try {
    return (`PREFIX cco: <http://www.ontologyrepository.com/CommonCoreOntologies/>
        PREFIX obo: <http://purl.obolibrary.org/obo/>
           Delete {
        
    
            ?LocalAdminRegion1DesName a cco:DesignativeName;
            obo:RO_0010001  ?LocalAdminRegion1DesNameIBE. 

            ?LocalAdminRegion1DesNameIBE cco:has_text_value ?MailingCity ;
                    
            }where{

       
              ?LocalAdminRegion1DesName a cco:DesignativeName;
              obo:RO_0010001  ?LocalAdminRegion1DesNameIBE. 

              ?LocalAdminRegion1DesNameIBE cco:has_text_value ?MailingCity ;
              FILTER( ?MailingCity   = "${value}")
          
        }
        `)
  } catch (error) {
    console.log(error)
    return ""
  }
}

function delete_mailingPostCode(value: string) {
  try {
    return (`PREFIX cco: <http://www.ontologyrepository.com/CommonCoreOntologies/>
        PREFIX obo: <http://purl.obolibrary.org/obo/>
           Delete {
        
            ?PostalZone a cco:PostalZone;
            cco:designated_by ?PostalCode.
      
          ?PostalCode a cco:PostalCode;
            obo:RO_0010001 ?PostalCodeIBE.
      
          ?PostalCodeIBE a cco:InformationBearingEntity;
            cco:has_text_value ?MailingPostCode.
                    
            }where{
                   
              ?PostalZone a cco:PostalZone;
              cco:designated_by ?PostalCode.
        
            ?PostalCode a cco:PostalCode;
              obo:RO_0010001 ?PostalCodeIBE.
        
            ?PostalCodeIBE a cco:InformationBearingEntity;
              cco:has_text_value ?MailingPostCode;
          
              FILTER(?MailingPostCode = "${value}")
          
        }
        
        `)
  } catch (error) {
    console.log(error)
    return ""
  }
}

function delete_weight(value: string) {
  try {
    return (`PREFIX cco: <http://www.ontologyrepository.com/CommonCoreOntologies/>
        PREFIX obo: <http://purl.obolibrary.org/obo/>
           Delete {
        
            ?WeightQuality a cco:Weight;
            cco:is_measured_by ?WeightQualityICE .    
      
      ?WeightQualityICE obo:RO_0000056 ?WeightQualityIBE . 
      
      ?WeightQualityIBE  cco:has_text_value ?Weight ; 
            }where{
                   
              ?WeightQuality a cco:Weight;
              cco:is_measured_by ?WeightQualityICE .    
        
        ?WeightQualityICE obo:RO_0000056 ?WeightQualityIBE . 
        
        ?WeightQualityIBE  cco:has_text_value ?Weight ; 
          
              FILTER(?Weight = "${value}")
          
        }
        
        `)
  } catch (error) {
    console.log(error)
    return ""
  }
}

function delete_mailingstate(value: string) {
  try {
    return (`PREFIX cco: <http://www.ontologyrepository.com/CommonCoreOntologies/>
        PREFIX obo: <http://purl.obolibrary.org/obo/>
           Delete {
        

  
  
 ?LocalAdminRegion1StateCityDesc a cco:DesignativeName ; 
                                  <http://purl.obolibrary.org/obo/RO_0010001>   ?LocalAdminRegion1StateCityDescIBE . 
  
  
  ?LocalAdminRegion1StateCityDescIBE cco:has_text_value ?MailingState;
                    
            }where{

  
 ?LocalAdminRegion1StateCityDesc a cco:DesignativeName ; 
                                  <http://purl.obolibrary.org/obo/RO_0010001>   ?LocalAdminRegion1StateCityDescIBE . 
  
  
  ?LocalAdminRegion1StateCityDescIBE cco:has_text_value ?MailingState;
          
              FILTER(?MailingState = "${value}")
          
        }
        
        `)
  } catch (error) {
    console.log(error)
    return ""
  }
}

function delete_mailingCountry(value: string) {
  try {
    return (`PREFIX cco: <http://www.ontologyrepository.com/CommonCoreOntologies/>
        PREFIX obo: <http://purl.obolibrary.org/obo/>
           Delete {
        
            ?LocalAdminRegion1StateCountry a cco:Country ; 
            cco:designated_by ?CountryDesc  . 
  
?CountryDesc a cco:DesignativeName ; 
<http://purl.obolibrary.org/obo/RO_0010001> ?CountryDescIBE .  

?CountryDescIBE cco:has_text_value ?MailingCountry;
                    
            }where{

              ?LocalAdminRegion1StateCountry a cco:Country ; 
              cco:designated_by ?CountryDesc  . 
    
?CountryDesc a cco:DesignativeName ; 
  <http://purl.obolibrary.org/obo/RO_0010001> ?CountryDescIBE .  

?CountryDescIBE cco:has_text_value ?MailingCountry;
          
              FILTER(?MailingCountry = "${value}")
          
        }
        
        `)
  } catch (error) {
    console.log(error)
    return ""
  }
}

function mappingDeleteFuction(attribute: string, value: string) {
  let attributeClean = attribute.toLocaleLowerCase()
  switch (attributeClean) {
    case "firstname": {
      return delete_firstname(value)
    }
    case "email": {
      return delete_email(value)
    }
    case "lastname": {
      return delete_lastname(value)
    }
    case "birthday": {
      return delete_DateOfBirth(value)
    }
    case "mailingstreet": {
      return delete_homemailingaddres(value)
    }
    case "weight": {
      return delete_weight(value)
    }
    case "mailingcity": {
      return delete_mailingcity(value)
    }
    case "mailingpostcode": {
      return delete_mailingPostCode(value)
    }
    case "mailingstate": {
      return delete_mailingstate(value)
    }
    case "mailingcountry": {
      return delete_mailingCountry(value)
    }
    default: {
      return ""
    }
  }
}

export default mappingDeleteFuction