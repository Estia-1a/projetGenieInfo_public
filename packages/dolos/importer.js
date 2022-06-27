import papa from "papaparse"
import {readFile, mkdir, copyFile} from "fs/promises"

import {DSU} from "./DSU.js"
let csv = await readFile( process.argv[2], "utf8" ) ; 
let {data} = papa.parse(csv, { 	skipEmptyLines: true, header:true } )

const cluster = new DSU() ; 

const students = {} ; 
const cleanPath = ( path ) => path?.replace( "result/" , "" ).replace(".js", "")

data.map( e => {
    const l = students[ cleanPath(e.leftFilePath) ] = students[ cleanPath(e.leftFilePath) ]  ?? { triche : false, cluster : null, link : 0 , similarity : 0  }
    const r = students[ cleanPath(e.rightFilePath) ] = students[ cleanPath(e.rightFilePath) ]  ?? { triche : false, cluster : null, link : 0 , similarity : 0  }
    if( e.similarity > 0.40 ) {
        cluster.union( cleanPath(e.leftFilePath), cleanPath(e.rightFilePath) )
        l.triche = true ;
        l.link++ 
        if(e.similarity > l.similarity ) {
            l.similarity = Math.max( l.similarity , e.similarity )
            l.bestMatch = cleanPath(e.rightFilePath)
        }
        if(e.similarity > r.similarity ) {
            r.similarity = Math.max( r.similarity , e.similarity )
            r.bestMatch = cleanPath(e.leftFilePath)
        }
        r.triche = true ;
        r.link++ 
    }
})


Object.entries( students ).map( async ([path, info ]) => {
    if( info.triche ) {
        console.log( path, ",", info.bestMatch, ",",info.similarity )
        let dest =  "similarity/"+ Math.floor( 10*info.similarity) + "/" + path
        await mkdir(dest , {recursive:true} )
        copyFile( "result/" + path + ".js", dest + "/" + path + ".js" ) ;
        copyFile( "result/" + info.bestMatch + ".js", dest + "/" + info.bestMatch + ".js" ) ;
        
    } else {
        let dest =  "similarity/"+ 0 + "/"  
        await mkdir(dest, {recursive:true} )
        copyFile( "result/" + path + ".js", dest + "/" + path + ".js") ;
    }
})


 

