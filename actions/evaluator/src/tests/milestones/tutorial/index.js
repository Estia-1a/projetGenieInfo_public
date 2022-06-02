import dimension from  "./dimensions.js" ;
import first_pixel from "./firstPixel.js"
const tutorial = [ ...dimension, ...first_pixel  ];
tutorial.forEach( e=> e.milestone = "Tutorial");
export default tutorial ;
