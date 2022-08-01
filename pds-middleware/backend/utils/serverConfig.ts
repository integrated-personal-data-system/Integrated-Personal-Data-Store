let ts = Date.now();
let date_ob = new Date(ts);
let date = date_ob.getDate();
let month = date_ob.getMonth() + 1;
let year = date_ob.getFullYear();
import { v4 as uuid } from "uuid"


const current_mapping = ["firstname", "weight", "email", "lastname", "birthday", "mailingstreet", "mailingcity", "mailingstate", "mailingpostcode", "mailingcountry", "mobilephonenumber", "homephonenumber", "employername", "employeetitle"]


// If True - run the server over https
// If false - run the server over http
const production = false

export { current_mapping, production } 