<script>
  import { fabric } from "fabric";
  import { onMount } from 'svelte';
  import { allImages } from './allimagesstore.js';
  import {col} from './colnew.js';

  import Moveable from "svelte-moveable";
  let target;
  //import { fabric } from './dep/fabric.js';
  //const sharp = require('sharp');
  
  // export let idlist = []
  // export let ratioList = [];

  export let elements = [];
  export let ratiocollage=1.0;

  //let can;
  let canvas;
  let canv;
  let col1;

  onMount(() => {
    canv = new fabric.Canvas(canvas);

    const rect = new fabric.Rect({
      left: 10,
      top: 10,
      width: 20,
      height: 15,
      fill: "blue"
    });
    canv.add(rect);
  });

	let ratio_value;

	// const unsubscribe = ratio.subscribe(value => {
	// 	ratio_value = value;
  // });
  

function generatecollage(ratio){
  
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
  for(let i=0;i<colpg.length;i+=1){
    console.log("add pic to collage in fabric:", i,colpg[i],$allImages[colpg[i].imid].fnsmall)
    let fn = $allImages[colpg[i].imid].fnsmall
    fabric.Image.fromURL(fn, function(oImg) {
        let widthcollage = Math.min(600,600/ratiocollage);
        let scale = colpg[i].innerw / $allImages[colpg[i].imid].wsmall 
        if (colpg[i].outerw/colpg[i].outerh > $allImages[colpg[i].imid].wsmall/$allImages[colpg[i].imid].hsmall){  
          scale = colpg[i].outerw/1.0 * widthcollage / $allImages[colpg[i].imid].wsmall
        } else {
          scale = colpg[i].outerh/1.0 * widthcollage / $allImages[colpg[i].imid].hsmall
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
        oImg.left = colpg[i].outerx / 1.0 * widthcollage; //todo: ersetzen der 100 durch einne versatz der das bild in die mitte schiebt
        oImg.top = colpg[i].outery /1.0 * widthcollage;
        //oImg.width = colpg[i].outerw/ 100 * widthcollage * $ratio; //colpg[i].outerw
        //oImg.height = colpg[i].outerh/ 100 * widthcollage;//$allImages[colpg[i].fn].heightsmall //100/100 / $ratio * widthcollage;//colpg[i].outerh 
        // oImg.clipPath= new fabric.Rect({
        //   width:colpg[i].outerw/1.0*widthcollage,
        //   height:colpg[i].outerh/1.0*widthcollage,//colpg[i].outerh,
        //   top:colpg[i].outery / 1.0 * widthcollage,
        //   left:colpg[i].outerx / 1.0 * widthcollage,
        //   //originX: 'center',
        //   //originY: 'center'
        //   absolutePositioned: true
        // }),
        canv.add(oImg);
    });
   /* const rect = new fabric.Rect({
      left: colpg[i].outerx,
      top: colpg[i].outery,
      width: colpg[i].outerw,
      height: colpg[i].outerh,
      fill: "red"
    });
    canv.add(rect);
    */
  }
  //

}

</script>

<h1>one collage:</h1>
<canvas bind:this={canvas} width="600" height="{600}" />

<button on:click={generatecollage}>generate a Collage!</button>

 <!-- <div class="target" bind:this={target}>Target</div>
<Moveable
  target={target}
  origin={true}
  edge={false}

  draggable={true}
/> -->

<style>
	#rcorners1 {
		border-radius: 3px;
		background: #73AD21;
		border:2px;
		height: 100px;
	}
</style>