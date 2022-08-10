let ts = Date.now();
let date_ob = new Date(ts);
let date = date_ob.getDate();
let month = date_ob.getMonth() + 1;
let year = date_ob.getFullYear();
import { v4 as uuid } from "uuid"


const current_mapping = ["firstname", "homePhoneNumber", "weight", "mobilePhoneNumber", "email", "lastname", "birthday", "mailingStreetAddress", "mailingCity", "mailingState", "mailingPostalCode", "mailingCountry", "mobilePhoneNumber", "homePhoneNumber", "employerName", "employeeTitle"]


// If True - run the server over https
// If false - run the server over http
const production = true

export { current_mapping, production } 