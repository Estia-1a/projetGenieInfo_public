import dimension from  "./dimensions.js" ;
import first_pixel from "./firstPixel.js"
import tenth_pixel from "./tenthPixel.js"
import second_line from "./secondLine.js"
import print_pixel from "./printPixel.js"
const tutorial = [ ...dimension, ...first_pixel, ...tenth_pixel, ...second_line, ...print_pixel  ];
tutorial.forEach( e=> e.milestone = "Tutorial");
export default tutorial ;
