<script>
  import { fabric } from "fabric";
  import { onMount } from 'svelte';
  import { allImages, bookdic } from './allimagesstore.js';
  import {col} from './colnew.js';
  const fs = require('fs');  // would prefer import
  const util = require('util'); 
  // import { fs } from "fs";
  // import { fs } from "@electron"
  import Grid2 from './Grid2.svelte'
  import Grid1 from './Grid1.svelte'
  import Grid3 from './Grid3.svelte'
  // import Grid from "svelte-grid";
  import gridHelp from "svelte-grid/build/helper";

  import Moveable from "svelte-moveable";
  let target;
  //import { fabric } from './dep/fabric.js';
  //const sharp = require('sharp');
  
  // export let idlist = []
  // export let ratioList = [];

  //export let elements = [];
  export let i_page = 0;
  export let ratiocollage=1.0;
  export let canheight = 500;

  let elements = []

  //let $canwidth = {canheight*ratiocollage};
  let canwidth = 500
  let colpg;
  let col1;
  
  let griditems = []
  let gridresolution = 10;
  let gridsize = 600;

  //let can;
  let canvas;
  let canv;

  onMount(() => {
    canv = new fabric.Canvas(canvas);
  });

	// const unsubscribe = ratio.subscribe(value => {
	// 	ratio_value = value;
  // });
  
function make_collage(){
  if (colpg) {
    generatecollage()
    // re_generate_collage()
  } else {
    generatecollage()
  }
  draw_collage()
}

function generatecollage(){
  elements = $bookdic[i_page].elements
  
  let imids =  elements.map(a => a.id); //Object.keys($allImages)
  let ratioList = elements.map(a => $allImages[a.id].worig/$allImages[a.id].horig)
  let widthList = elements.map(a => $allImages[a.id].worig)

  console.log("imids:",imids)
  console.log("imratios:",ratioList)
  console.log("width_List:",widthList)
  console.log("ratio collage:", ratiocollage)
  console.log("allimages:", $allImages)
  col1 = new col(imids, ratioList, ratiocollage)
  
  console.log("col1:",col1)
  colpg = col1.generate_1_collage_and_save_if_good();

}

function re_generate_collage(){
  colpg = col1.generate_1_collage_and_save_if_good()
}

function draw_collage(thumbsize=true){
  
  //console.log(".donlksef..",col1,"dfs",colpg)
  canv.clear();
  let widthcollage = canheight*ratiocollage;//Math.min(canwidth,canwidth/ratiocollage);
  canwidth = canheight*ratiocollage

  canv.width = canwidth
  canv.height = canheight

  //canv.fill("#fff")
  let borderthickness = 0.002;
  // background:
  const rect = new fabric.Rect({
      left: 0,
      top: 0,
      selectable: false,
      width: widthcollage,
      height: canheight,
      fill: "black"
    });
  canv.add(rect);
  // griditems = createGrid(colpg);
  let iloaded = 0
  console.log("iloaded0: ", iloaded,colpg)

  for(let i=0;i<colpg.length;i+=1){
    let fn,scale,origh,origw;
    if (thumbsize){
      fn = $allImages[colpg[i].imid].fnsmall
      origw = $allImages[colpg[i].imid].wsmall 
      origh = $allImages[colpg[i].imid].hsmall 
    } else {
      fn = $allImages[colpg[i].imid].pathorig
      origw = $allImages[colpg[i].imid].worig 
      origh = $allImages[colpg[i].imid].horig
      
    }
    console.log("add pic to collage in fabric:", i,colpg[i],"fn:", fn,$allImages[colpg[i].imid])
    fabric.Image.fromURL(fn, function(oImg) {
        iloaded+=1;
        console.log("iloaded: ", iloaded)
        scale = colpg[i].innerw / origw
        let xgap = 0;//
        let ygap = 0;
        let orig_image_ratio = origw/origh;
        let place_image_ratio = colpg[i].outerw/colpg[i].outerh;
        console.log("image ratios: ",place_image_ratio ,orig_image_ratio)
        if (place_image_ratio > orig_image_ratio){  //wenn ratio_platz > ratio_thumb
          // image scale is determined by its width:
          //scale: how much has the image to be scaled to fit?
          scale = colpg[i].outerw/1.0 * canheight / origw
          //highres: scale = 

          //ygap: wie viel das thumb "übersteht".../2
          //wie bekomme ich das raus?
          ygap= (origh * scale) - (colpg[i].outerh/1.0 * canheight)//orig_image_height - place_image_height 
          console.log("ygap absolute:: ",ygap)
          ygap = ((place_image_ratio/orig_image_ratio) * colpg[i].outerh/1.0)-colpg[i].outerh; // 1/0.5 - 1
          console.log("scale: ",scale,"ygap ratio/ratio:: ",ygap, place_image_ratio,orig_image_ratio, (place_image_ratio/orig_image_ratio), colpg[i].outerh)
          // ygap=5
        } else {
          console.log("xxxx?")
          scale = (colpg[i].outerh/1.0 * canheight) / origh/1.0
          
          xgap = ((orig_image_ratio/place_image_ratio) * colpg[i].outerw)-colpg[i].outerw; // 1/0.5 - 1
          console.log("xgap ratio/ratio:: ",xgap)
          console.log("scale: ",scale,"ygap ratio/ratio:: ",ygap, place_image_ratio,orig_image_ratio, (place_image_ratio/orig_image_ratio), colpg[i].outerh)
          // xgap=0
          // ygap = zugross/2
        }
        
         oImg.scale(scale)
         console.log("sdfsdfw", colpg[i], $allImages[colpg[i].imid],$allImages[colpg[i].imid].hsmall);
        console.log("widthcollage, scale:",widthcollage,scale,colpg[i].outerw, $allImages[colpg[i].imid].worig)
        /*
        oImg.scale(scale);
        oImg.left=colpg[i].outerx / 100 * widthcollage;
        oImg.top= colpg[i].outery /100 * widthcollage / $ratio;
        oImg.width = $allImages[colpg[i].fn].widthsmall* 3; //colpg[i].outerw
        oImg.height = $allImages[colpg[i].fn].heightsmall //100/100 / $ratio * widthcollage;//colpg[i].outerh */
        
        //let scalewidth =colpg[i].outerw/ 100 * widthcollage
        //oImg.scaleToWidth(scalewidth);
        //console.log("scale to this width: ", scalewidth)
        //oImg.scale(1.)
        oImg.left = (colpg[i].outerx - xgap/2)/ 1.0 * canheight; //todo: ersetzen der 100 durch einne versatz der das bild in die mitte schiebt
        oImg.top = (colpg[i].outery - ygap/2) /1.0 * canheight;
        // oImg.width = colpg[i].outerw/ 100 * canheight * $ratio; //colpg[i].outerw
        // oImg.height = colpg[i].outerh/ 100 * canheight;//$allImages[colpg[i].fn].heightsmall //100/100 / $ratio * widthcollage;//colpg[i].outerh 
        
        let bt = borderthickness;
        oImg.clipPath= new fabric.Rect({
          width: (colpg[i].outerw - 2*bt)/1.0*canheight,
          height:(colpg[i].outerh - 2*bt)/1.0*canheight,//colpg[i].outerh,
          top:(colpg[i].outery +  bt)/ 1.0 * canheight,
          left:(colpg[i].outerx + bt)/ 1.0 * canheight,
          // originX: 'center',
          // originY: 'center',
          absolutePositioned: true
        }),
        canv.add(oImg);
    });
    
  // var image = data.replace("image/jpg", "image/octet-stream"); //Convert image to 'octet-stream' (Just a download, really)
  // window.location.href = image;
  }
  console.log("iloaded-end: ", iloaded)
  console.log("colpg: ", colpg)
  //
  
    // function createGrid(colpg){
    //   //svelte-grid...
    //   let griditems = []
    //   let gridresolution = 10;
    //   let wgrid = 600;
    //   let hgrid = 600;
    //   for(let i=0;i<colpg.length;i+=1){
    //     griditems.push(gridHelp.item({
    //       x:colpg[i].outerx*wgrid/gridresolution,
    //       y:colpg[i].outery*hgrid/gridresolution,
    //       w:colpg[i].outerw*wgrid/gridresolution,
    //       h:colpg[i].outerh*hgrid/gridresolution,
    //       bla:"kamuni",
    //       id:colpg[i].imid
    //       }))
    //   }
    //   console.log("griditems:",griditems)
    //   console.log("colpg: ",colpg)
    //   return griditems;
    // }

}

function savecollage(){
  draw_collage(false)
  //let multiplier = 
  setTimeout(function(){
    let data = canv.toDataURL({
      format: 'jpeg',
      multiplier: 2.5
    });
    
    var image = data.replace("image/jpeg", "image/octet-stream")//.replace("image/png", "image/octet-stream"); //Convert image to 'octet-stream' (Just a download, really)
    window.location.href = image;
  },2500); 

}

function draw_collage_hires(){
  draw_collage(false)
}

function savecollage2(){
  //draw_collage(false)
  //let multiplier = 
  let data = canv.toDataURL({
    format: 'jpeg',
    multiplier: 3.0
  });
  
  var image = data.replace("image/jpeg", "image/octet-stream")//.replace("image/png", "image/octet-stream"); //Convert image to 'octet-stream' (Just a download, really)
  window.location.href = image;

}


function savecollage_fs(){
  let dataurl = canv.toDataURL({
    format: 'jpeg',
    multiplier: 4.5
  });
  
  let imageblob = dataURLtoBlob(dataurl)//data.replace("image/jpeg", "image/octet-stream")//.replace("image/png", "image/octet-stream"); //Convert image to 'octet-stream' (Just a download, really)
  //window.location.href = imageblob;
  let fn = "collagexr_" + Math.random().toString().substr(2, 8) + ".jpg"
  saveBlob(imageblob,fn)
  
  // fs.
}

function savecollage_blob(){

  canvas.toBlob(saveBlob);

}
function saveBlob(blob,fn="collage.jpg") {
  const reader = new FileReader();
  reader.onloadend = () => {
    fs.writeFile(fn, new Uint8Array(reader.result), err => {
      if (err) {
        alert("An error ocurred creating the file " + err.message);
      } else {
        console.log("The file has been successfully saved",fn);
      }
    });
  }
  reader.readAsArrayBuffer(blob);
}

function dataURLtoBlob(dataurl) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type:mime});
}

</script>

<button on:click={make_collage}>(re-)generate collage!</button>
<button on:click={draw_collage_hires}>draw in high resolution</button>
<button on:click={savecollage}>Save collage!</button>
<button on:click={savecollage2}>Save collage2! (without draw)</button>
<button on:click={savecollage_fs}>Save collage fs</button>
<canvas bind:this={canvas} width="1400px" height="{canheight}" />
<!-- <canvas bind:this={canvas} width="{canwidth}" height="{canwidth/ratiocollage}" /> -->


<!--
<Grid2 colitems={griditems}></Grid2>
<h3>treennerrr!</h3>-->
<!--<Grid1></Grid1>
<h3>treennerrr!</h3>
<Grid3></Grid3>-->
 <!-- <div class="target" bind:this={target}>Target</div>
<Moveable
  target={target}
  origin={true}
  edge={false}

  draggable={true}
/> -->

<style>
	/* #rcorners1 {
		border-radius: 3px;
		background: #73AD21;
		border:2px;
		height: 100px;
	} */
</style>