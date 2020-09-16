<script>
  import Grid1 from "./Grid1.svelte"
  import { fabric } from "fabric";
  import { onMount } from 'svelte';
  import { allImages } from './allimagesstore.js';
  import  SingleImage  from './SingleImage.svelte'
  const sharp = require('sharp');
  //import { sharp } from "sharp"; // this doesn't work, use require instead
  //const fs = require('fs')
  //import { fs } from "fs";
  import Jimp from 'jimp';
  
  const { ipcRenderer } = require('electron');

	export let name;
	export let files = []
  export let sfiles =[]

  export let can;

let rangewidth = 230;

  let canvas;
  let canv;

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
    
    //ipcRenderer.on('jimp-triggered', handleImage);
  });

  function handleImage(){
    console.log("hanbel");
  }


async function handleload(event){
  let newimageentry;
  console.log("baba",allImages)
  //console.log(files[0])
  //ipcRenderer.send('trigger-jimp', files);
  for(let i=0;i<files.length;i+=1){
    //let thumbname = 'C:\\dev\\svelte\\test\\o' + i.toString() +(((1+Math.random())*0x10000)|0).toString(16).substring(1) + 'g3.jpg';
    let thumbname = 'C:\\dev\\svelte\\test\\o' + i.toString() +(((1+Math.random())*0x10000)|0).toString(16).substring(1) + 'g3.jpg'
    sharp(files[i].path)
      .resize(300)
      .toFile(thumbname)
      .then(()=> {
        // console.log("then...");
        newimageentry = {fnorig:files[i],fnsmall:thumbname,rating:0}
        allImages.update(arr=>{
          return [...arr,newimageentry]
        })
      }
      );
    	// Read the image.
    //const image = await Jimp.read(files[i].path);

    // Resize the image to width 150 and auto height.
    //await image.resize(250, Jimp.AUTO);

    // Save and overwrite the image
    //await image.writeAsync(thumbname);

/*
sharp(files[i].path)
  .resize(300)
  .toFile(thumbname, function(err) {
    // output.jpg is a 300 pixels wide and 200 pixels high image
    // containing a scaled and cropped version of input.jpg
  });*/

    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",thumbname);
    sfiles.push(window.URL.createObjectURL(files[i]));
    sfiles = sfiles;
    files = files;
        const rect = new fabric.Rect({
        left: 40,
        top: 20,
        width: 50,
        height: 15,
        fill: "red"
    });
    canv.add(rect);
  }
  console.log(sfiles)
}

</script>

<main>

</main>


<label for="avatar">Select images:</label>
<input type="range" min="0" max="500" bind:value={rangewidth}>

<input type="file"
       id="avatar" name="avatar"
       accept="image/*"
       multiple
       bind:files
       on:change={handleload}>
<br>
<!--
{#each (files || []) as file, i}
    <span data-id={i}>
      <img class="thumb" src={file.path} width={rangewidth} title={file.name} data-id={i} alt="noPicuuu"/>
      <!--<p><strong>{file.name}</strong>{i} ({file.size})</p>--
    </span>
{/each}
-->

<!-- {#each ($allImages || []) as oneimage, i}
    <span data-id={i}>
      <img class="thumb" src={'file://' + oneimage.fnsmall} width={rangewidth} title={oneimage.fnorig} data-id={i} alt="noPicuuu"/>
      <!--<p><strong>{file.name}</strong>{i} ({file.size})</p>->
    </span>
{/each} -->

<br>brrrrrrrr
{#each ($allImages || []) as oneimage, i}
  <SingleImage imageid={i} rwidth={rangewidth}></SingleImage>
    
{/each}

<!--
{#each (files || []) as file, i}
    <span data-id={i}>
      <img class="thumb" src={window.URL.createObjectURL(file)} title={file.name} data-id={i} alt="noPic"/>
      <!--<p><strong>{file.name}</strong>{i} ({file.size})</p>->
    </span>
{/each}
-->

<canvas bind:this={canvas} width="500" height="300" />

<button on:click={handleload}>nochmal handleload!</button>



<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}
	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}
	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
	img.thumb2 {
		width: 200px;
	}
</style>