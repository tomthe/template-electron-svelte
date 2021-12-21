<script>
// import {export_ppt1,export_ppt2} from './export_ppt.js'
import pptxgen from "pptxgenjs";
import {  allImages,bookdic } from './allimagesstore.js';
const fs = require('fs');
const sharp = require('sharp');
let exportactive = false;

export async function export_ppt2() {
    console.log("start export")
    exportactive = true;
    
    let pptx = new pptxgen();
    // Define new layout for the Presentation
    const obinch = mm2inch(4.5) //outerbordermm 
    const pagew = mm2inch(297 + 2*3) // page-width in inch
    const pageh = mm2inch(210 +2*3)
    const ob =  obinch/pageh //outerborder

    pptx.defineLayout({ name:'A4wideplus3mm', width:pagew, height:pageh });
    // Set presentation to use new layout
    pptx.layout = 'A4wideplus3mm'

    for (let i_page = 0; i_page < $bookdic.length; i_page++) {
        console.log("Page ", i_page," of ",$bookdic.length)
        let r = $bookdic[i_page].options.ratiocollage 
        let bt = $bookdic[i_page].options.borderthickness ||0.18
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
                const desired_dpi = 230
                const newwidth = parseInt(img.outerw/img.innerw * pagew * desired_dpi)
                let imdata="";
                if (newwidth < img.worig * 2) {
                    imdata = "data:image/jpeg;base64," + fs.readFileSync($allImages[img.imid].pathorig, {encoding: 'base64'});
                } else {
                    imdata =  await sharp($allImages[img.imid].pathorig)
                        .resize({ width: newwidth })
                        .jpeg({
                            quality: 91
                        })
                        .toBuffer();
                    imdata = await "data:image/jpeg;base64," + imdata.toString('base64')
                    
                    // let imdata2 =  await sharp($allImages[img.imid].pathorig)
                    //     .resize({ width: newwidth })
                    //     .jpeg({
                    //         quality: 88
                    //     })
                    //     .toFile(img.imid + "_lalala.jpg");
                }
                
                // console.log(imdata)
                // 
                // colpg:
                // outer_ gibt die position und größe eines bildes
                //  relativ zur gesamten Seite an
                // inner_ gibt die position und größe des Ausschnitts eines bildes
                //  relativ zu diesem Bild an

                // pptx...:
                // **crop**
                // 
                // **cover**
                // 
                // 
                //                

// 
// 
//                  
                // slide.addImage({data:imdata, 
                //     x:bt/r + 100/r*img.outerx+"%",
                //     y:bt + 100*img.outery+"%",
                //     w:"100%", //w:100/r*img.innerw+"%",
                //     h:"100%",//h:100*img.innerh+"%",
                //     sizing:{
                //         type:"crop",
                //         w:-2*bt/r + 100/r*img.outerw+"%",
                //         h:-2*bt +   100*img.outerh+"%",
                //     }
                // });
                // 
                let xpos = 100/r*img.outerx;
                let xpos_innerboarder = bt/r + xpos
                let xpos_innerandouterboarder = (xpos_innerboarder*(1-2*ob)) + ob/r*100

                slide.addImage({data:imdata, 
                    x:ob/r*100 + bt/r + 100/r*img.outerx*(1-2*ob/r)+"%",
                    y:ob*100 + bt + 100*img.outery*(1-2*ob)+"%",
                    w:100/r*($allImages[img.imid].rorig)+"%",
                    h:"100%",//h:100*img.innerh+"%",
                    sizing:{
                        type:"cover",
                        w:(1-ob*2/r)*(-2*bt/r + 100/r*img.outerw)+"%",
                        h:(1-ob*2)*(-2*bt +   100*img.outerh)+"%"
                    }
                });


                // console.log("imdata: ",imdata)
            }
        }
    }

    
    console.log("before saving export")
    pptx.writeFile({ fileName: "collage1.pptx" });
    console.log("after saving export")
    exportactive=false;
}

function mm2inch(mm) {
    return mm/25.4;
}

</script>


<!-- <button on:click={export_ppt1}>export collage!</button> -->
<button on:click={export_ppt2}>export collage2!</button>
{#if exportactive}
<progress class="progress is-large is-info" max="100">...</progress>
Export is running...    
{/if}