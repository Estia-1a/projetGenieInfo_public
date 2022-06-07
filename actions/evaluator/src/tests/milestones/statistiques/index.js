import max_pixel from "./maxPixel.js";
import min_pixel from "./minPixel.js";
import minComponentR from "./minComponentR.js";
import minComponentG from "./minComponentG.js";
import minComponentB from "./minComponentB.js";
import maxComponentR from "./maxComponentR.js";
import maxComponentG from "./maxComponentG.js";
import maxComponentB from "./maxComponentB.js";

const statistiques = [...max_pixel, ...min_pixel, ...minComponentR, ...minComponentG, ...minComponentB, ...maxComponentR, ...maxComponentG, ...maxComponentB];
statistiques.forEach(e => (e.milestone = "statistiques"));
export default statistiques;
