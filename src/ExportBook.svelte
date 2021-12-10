<script>
// import {export_ppt1,export_ppt2} from './export_ppt.js'
import pptxgen from "pptxgenjs";
import {  allImages,bookdic } from './allimagesstore.js';
const fs = require('fs');
const sharp = require('sharp');

export async function export_ppt2() {
    console.log("start export")
    
    let pptx = new pptxgen();
    // Define new layout for the Presentation
    let pagew= mm2inch(297 + 2*3) // page-width in inch
    let pageh = mm2inch(210 +2*3)
    pptx.defineLayout({ name:'A4wideplus3mm', width:pagew, height:pageh });
    // Set presentation to use new layout
    pptx.layout = 'A4wideplus3mm'

    for (let i_page = 0; i_page < $bookdic.length; i_page++) {
        let r = $bookdic[i_page].options.ratiocollage
        let bt = $bookdic[i_page].options.borderthickness ||0.33
        // const element = array[i];
        let slide = pptx.addSlide();
        // slide.addText("ppt Demo!", { x: 1, y: 1, w: 10, h:3, fontSize: 36, fill: { color: "F1F1F1" }, align: "center",shrink:true });
        slide.background = { color: "000000" }
        
        if ($bookdic[i_page].colpg){
            for (let i_pic = 0; i_pic < $bookdic[i_page].colpg.length; i_pic++) {
                const img = $bookdic[i_page].colpg[i_pic];
                // slide.addImage({ path: $allImages[img.imid].pathorig, x:100/r*img.outerx+"%",y:100*img.outery+"%",w:100/r*img.outerw+"%",h:100*img.outerh+"%",sizing:{type:"cover",w:100/r*img.outerw+"%",h:100*img.outerh+"%"}});

                // const imdata = "data:image/jpeg;base64," + fs.readFileSync($allImages[img.imid].pathorig, {encoding: 'base64'});
                // newwidth = 300dpi... 
                // neuebreiteinpixel = neuebreiteincm * 300dpinch in cm = nbcm * 2.54 * 300
                // neuebreiteincm = pagebreite in cm * innerw
                const newwidth = parseInt(img.innerw * pagew * 300)
                const imdata="";
                if (newwidth < img.worig * 2) {
                    imdata = "data:image/jpeg;base64," + fs.readFileSync($allImages[img.imid].pathorig, {encoding: 'base64'});
                } else {
                    imdata =  await sharp($allImages[img.imid].pathorig)
                        .resize({ width: newwidth })
                        .jpeg({
                            quality: 88
                        })
                        .toBuffer();
                    imdata = await "data:image/jpeg;base64," + imdata.toString('base64')
                }
                
                // console.log(imdata)
                
                slide.addImage({data:imdata, 
                    x:bt + 100/r*img.outerx+"%",
                    y:bt + 100*img.outery+"%",
                    w:100/r*img.innerw+"%",
                    h:100*img.innerh+"%",
                    sizing:{
                        type:"cover",
                        w:-2*bt + 100/r*img.outerw+"%",
                        h:-2*bt +   100*img.outerh+"%"
                    }
                });
                // console.log("imdata: ",imdata)
            }
        }
    }

    
    console.log("before saving export")
    pptx.writeFile({ fileName: "collage1.pptx" });
    console.log("after saving export")
}

function mm2inch(mm) {
    return mm/25.4;
}

</script>


<!-- <button on:click={export_ppt1}>export collage!</button> -->
<button on:click={export_ppt2}>export collage2!</button>