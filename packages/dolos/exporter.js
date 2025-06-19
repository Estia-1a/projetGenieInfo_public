import { reponses } from "./reponse.js";
import {writeFile } from "fs/promises"
 
reponses.map( 
    ([ nom, prenom,, mail, ,,,,, ,,,... text  ] )=> writeFile( "result/"+ mail.replace(/@.*/,"").replaceAll(".","_") + ".js" , text.join("\n//---\n") ) 
)