<script>
// import {export_ppt1,export_ppt2} from './export_ppt.js'
// import pptxgen from "pptxgenjs";
import {  allImages,bookdic } from './allimagesstore.js';
const fs = require('fs');
const sharp = require('sharp');
let exportactive = false;

async function export_website() {
    console.log("start export")
    exportactive = true;
    
    // Define new layout for the Presentation
    // const obinch = mm2inch(4.5) //outerbordermm 
    // const pagew = mm2inch(297 + 2*3) // page-width in inch
    // const pageh = mm2inch(210 +2*3)
    // const ob =  obinch/pageh //outerborder

    const path = 'C:\\dev\\svelte\\test2\\website';

    let hs = `<body style="background-color: black;"> `

    let i =0

    for (let i_page = 0; i_page < $bookdic.length; i_page++) {
        console.log("Page ", i_page," of ",$bookdic.length)
        let r = $bookdic[i_page].options.ratiocollage 
        let bt = $bookdic[i_page].options.borderthickness ||0.18
        // const element = array[i];
        
        if ($bookdic[i_page].colpg){
            for (let i_pic = 0; i_pic < $bookdic[i_page].colpg.length; i_pic++) {
                i+=1
                if (i > 9000){
                    break;
                }
                try {
                    const img = $bookdic[i_page].colpg[i_pic];
                    // slide.addImage({ path: $allImages[img.imid].pathorig, x:100/r*img.outerx+"%",y:100*img.outery+"%",w:100/r*img.outerw+"%",h:100*img.outerh+"%",sizing:{type:"cover",w:100/r*img.outerw+"%",h:100*img.outerh+"%"}});

                    // const imdata = "data:image/jpeg;base64," + fs.readFileSync($allImages[img.imid].pathorig, {encoding: 'base64'});
                    // newwidth = 300dpi... 
                    // neuebreiteinpixel = neuebreiteincm * 300dpinch in cm = nbcm * 2.54 * 300
                    // neuebreiteincm = pagebreite in cm * innerw
                    const impath_rel = "\\imgs\\" + i_page + "_" + i_pic + "_1000px.jpg";
                    const impath = path + impath_rel;
                    const newwidth = 1200
                    let imdata
                    { // save jpg:
                        imdata =  await sharp($allImages[img.imid].pathorig)
                            .resize({ width: newwidth })
                            .jpeg({
                                quality: 75
                            })
                            .toFile(impath);
                        
                    }
                    hs += `<img src=".${impath_rel}" loading=lazy style="width: 100%; padding: 2px;" alt="${$allImages[img.imid].pathorig}"></img> `

                } catch (error) {
                    console.log("errorp4:", error)
                }

                // console.log("imdata: ",imdata)
            }
        }
    }
    hs += `</body>`
    console.log("before saving export")
    fs.writeFileSync(path + '\\index.html', hs)
    console.log("after saving export")
    exportactive=false;
}

</script>


<!-- <button on:click={export_ppt1}>export collage!</button> -->
<button on:click={export_website}>Export to website!</button>
{#if exportactive}
<progress class="progress is-large is-info" max="100">...</progress>
Web-Export is running...    
{/if}