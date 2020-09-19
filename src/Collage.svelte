<script>
  import { fabric } from "fabric";
  import { onMount } from 'svelte';
  import { allImages, ratio } from './allimagesstore.js';
  import {col} from './colnew.js';
  //import { fabric } from './dep/fabric.js';
  //const sharp = require('sharp');
  
  export let imnames = ["C:\\dev\\svelte\\test\\o0fc5cg3.jpg","C:\\dev\\svelte\\test\\o12c1e3g3.jpg"];
  export let rati = 1.001;

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

	const unsubscribe = ratio.subscribe(value => {
		ratio_value = value;
	});
function generatecollage(event){
  
  //canv = new fabric.Canvas(canvas);
  console.log("generatecollage foiw3", imnames,Object.keys($allImages),$ratio, ratio_value,rati, canvas.width,canvas.height);

    imnames = Object.keys($allImages)
    col1 = new col(imnames, rati, $allImages)
  
  console.log("col1:",col1)
  let colpg = col1.generate_1_collage_and_save_if_good(imnames,1.0);

  canv.clear();
  for(let i=0;i<colpg.length;i+=1){
    console.log("add pic to collage in fabric:", i,colpg[i],$allImages[colpg[i].fn].fnsmall)
    let fn = $allImages[colpg[i].fn].fnsmall
    fabric.Image.fromURL(fn, function(oImg) {
        let widthcollage = Math.min(600,600/rati);
        let scale = colpg[i].innerw / $allImages[colpg[i].fn].widthsmall 
        if (colpg[i].outerw/colpg[i].outerh > $allImages[colpg[i].fn].widthsmall/$allImages[colpg[i].fn].heightsmall){  
          scale = colpg[i].outerw/100 * widthcollage / $allImages[colpg[i].fn].widthsmall
        } else {
          scale = colpg[i].outerh/100 * widthcollage / $allImages[colpg[i].fn].heightsmall
        }
        oImg.scale(scale)
        console.log("widthcollage, scale:",widthcollage,scale,colpg[i].outerw, $allImages[colpg[i].fn].widthsmall)
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
        oImg.left = colpg[i].outerx / 100 * widthcollage; //todo: ersetzen der 100 durch einne versatz der das bild in die mitte schiebt
        oImg.top = colpg[i].outery /100 * widthcollage;
        //oImg.width = colpg[i].outerw/ 100 * widthcollage * $ratio; //colpg[i].outerw
        //oImg.height = colpg[i].outerh/ 100 * widthcollage;//$allImages[colpg[i].fn].heightsmall //100/100 / $ratio * widthcollage;//colpg[i].outerh 
        oImg.clipPath= new fabric.Rect({
          width:colpg[i].outerw/100*widthcollage,
          height:colpg[i].outerh/100*widthcollage,//colpg[i].outerh,
          top:colpg[i].outery / 100 * widthcollage,
          left:colpg[i].outerx / 100 * widthcollage,
          //originX: 'center',
          //originY: 'center'
          absolutePositioned: true
        }),
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

<div color="red" style="width: {$ratio * 100}px"  id="rcorners1" >page</div>
<div style="width: {rati * 100}px"  id="rcorners1" >page</div>
<div style="width: {ratio_value * 100}px"  id="rcorners1" >page</div>
 

<style>
	#rcorners1 {
		border-radius: 3px;
		background: #73AD21;
		border:2px;
		height: 100px;
	}
</style>