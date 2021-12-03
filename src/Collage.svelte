<script>
  import { fabric } from "fabric";
  import { onMount } from 'svelte';
  import { allImages } from './allimagesstore.js';
  import {col} from './colnew.js';
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

  export let elements = [];
  export let ratiocollage=1.0;
  export let canwidth = 800;
  // export let canheight = 500;
  
  let griditems = []
  let gridresolution = 10;
  let gridsize = 600;

  //let can;
  let canvas;
  let canv;
  let col1;

  onMount(() => {
    canv = new fabric.Canvas(canvas);
  });

	// const unsubscribe = ratio.subscribe(value => {
	// 	ratio_value = value;
  // });
  

function generatecollage(thumbsize=true){
  
  //canv = new fabric.Canvas(canvas);
  console.log("generatecollage foiw3", Object.keys($allImages),elements)//, ratio, ratio_value,rati, canvas.width,canvas.height);

  let imids = elements.map(a => a.id); //Object.keys($allImages)
  let ratioList = elements.map(a => $allImages[a.id].worig/$allImages[a.id].horig)
  let widthList = elements.map(a => $allImages[a.id].worig)

  console.log("imids:",imids)
  console.log("imratios:",ratioList)
  console.log("width_List:",widthList)
  console.log("ratio collage:", ratiocollage)
  console.log("allimages:", $allImages)
  col1 = new col(imids, ratioList, ratiocollage)
  
  console.log("col1:",col1)
  let colpg = col1.generate_1_collage_and_save_if_good();

  console.log(".donlksef..",col1,"dfs",colpg)
  canv.clear();
  let widthcollage = Math.min(canwidth,canwidth/ratiocollage);
  //canv.fill("#fff")
  let borderthickness = 0.002;
  // background:
  const rect = new fabric.Rect({
      left: 0,
      top: 0,
      selectable: false,
      width: widthcollage * ratiocollage,
      height: widthcollage,
      fill: "black"
    });
  canv.add(rect);
  // griditems = createGrid(colpg);

  for(let i=0;i<colpg.length;i+=1){
    let fn,scale,origh,origw;
    if (thumbsize){
      fn = $allImages[colpg[i].imid].fnsmall
      origw = $allImages[colpg[i].imid].wsmall 
      origh = $allImages[colpg[i].imid].hsmall 
    } else {
      fn = $allImages[colpg[i].imid].fnorig
      origw = $allImages[colpg[i].imid].worig 
      origh = $allImages[colpg[i].imid].horig
      
    }

    console.log("add pic to collage in fabric:", i,colpg[i],fn)
    fabric.Image.fromURL(fn, function(oImg) {
        let scale = colpg[i].innerw / origw
        let xgap = 0;//
        let ygap = 0;
        let orig_image_ratio = origw/origh;
        let place_image_ratio = colpg[i].outerw/colpg[i].outerh;
        console.log("image ratios: ",place_image_ratio ,orig_image_ratio)
        if (place_image_ratio > orig_image_ratio){  //wenn ratio_platz > ratio_thumb
          // image scale is determined by its width:
          //scale: how much has the image to be scaled to fit?
          scale = colpg[i].outerw/1.0 * widthcollage / origw
          //highres: scale = 

          //ygap: wie viel das thumb "übersteht".../2
          //wie bekomme ich das raus?
          ygap= (origh * scale) - (colpg[i].outerh/1.0 * widthcollage)//orig_image_height - place_image_height 
          console.log("ygap absolute:: ",ygap)
          ygap = ((place_image_ratio/orig_image_ratio) * colpg[i].outerh/1.0)-colpg[i].outerh; // 1/0.5 - 1
          console.log("ygap ratio/ratio:: ",ygap, place_image_ratio,orig_image_ratio, (place_image_ratio/orig_image_ratio), colpg[i].outerh)
          // ygap=5
        } else {
          console.log("xxxx?")
          scale = colpg[i].outerh/1.0 * widthcollage / origh/1.0
          
          xgap = ((orig_image_ratio/place_image_ratio) * colpg[i].outerw)-colpg[i].outerw; // 1/0.5 - 1
          console.log("xgap ratio/ratio:: ",xgap)
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
        oImg.left = (colpg[i].outerx - xgap/2)/ 1.0 * widthcollage; //todo: ersetzen der 100 durch einne versatz der das bild in die mitte schiebt
        oImg.top = (colpg[i].outery - ygap/2) /1.0 * widthcollage;
        // oImg.width = colpg[i].outerw/ 100 * widthcollage * $ratio; //colpg[i].outerw
        // oImg.height = colpg[i].outerh/ 100 * widthcollage;//$allImages[colpg[i].fn].heightsmall //100/100 / $ratio * widthcollage;//colpg[i].outerh 
        
        let bt = borderthickness;
        oImg.clipPath= new fabric.Rect({
          width: (colpg[i].outerw - 2*bt)/1.0*widthcollage,
          height:(colpg[i].outerh - 2*bt)/1.0*widthcollage,//colpg[i].outerh,
          top:(colpg[i].outery +  bt)/ 1.0 * widthcollage,
          left:(colpg[i].outerx + bt)/ 1.0 * widthcollage,
          // originX: 'center',
          // originY: 'center',
          absolutePositioned: true
        }),
        canv.add(oImg);
    });
  // var image = data.replace("image/jpg", "image/octet-stream"); //Convert image to 'octet-stream' (Just a download, really)
  // window.location.href = image;
  }
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

  //let multiplier = 
  let data = canv.toDataURL({
    format: 'jpeg',
    multiplier: 4       
  });
  
  var image = data.replace("image/jpeg", "image/octet-stream")//.replace("image/png", "image/octet-stream"); //Convert image to 'octet-stream' (Just a download, really)
  window.location.href = image;

}
</script>

<button on:click={generatecollage}>(re-)generate collage!</button>
<button on:click={savecollage}>Save collage!</button>
<canvas bind:this={canvas} width="{canwidth}" height="{canwidth}" />
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