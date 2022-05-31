const dimension = require( "./dimensions.js" ) ;
const statistiques = [ dimension.test1, dimension.test2 ];
statistiques.forEach( e=> e.milestone = "statistiques");
module.exports = statistiques ;
