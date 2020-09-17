<script>
  import Grid1 from "./Grid1.svelte"
  import { fabric } from "fabric";
  import { onMount } from 'svelte';
  import {  allImages } from './allimagesstore.js';
  import  SingleImage  from './SingleImage.svelte'
  import { Button, Modal } from 'svelma';
  const sharp = require('sharp');
  //import { sharp } from "sharp"; // this doesn't work, use require instead
  //const fs = require('fs')
  //import { fs } from "fs";
  //import Jimp from 'jimp';
  
  // const { ipcRenderer } = require('electron');

	export let name;
	export let files = []
  export let sfiles =[]
  let selectedImageId;
  let active=false;

  export let can;

let rangewidth = 230;

  let canvas;
  let canv;

  onMount(() => {

    // loadallImages();

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
        newimageentry = {fnorig:files[i],fnsmall:thumbname,rating:0,pathorig:files[i].path}
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

function loadallImages2(){
  $allImages = JSON.parse(localStorage.getItem('allImages'));
}
export function saveallImages2(){
    // Put the object into storage
    localStorage.setItem('allImages', JSON.stringify($allImages));
}


	function handleKeydown(event) {
    console.log("keydown. keycode:",event.keyCode)
    //   console.log("keydown - ", $allImages[imageid].fnsmall)
    if (event.keyCode == 39) {
      selectedImageId = Math.min(selectedImageId + 1,$allImages.length - 1);
    } else     if (event.keyCode == 37) {
      selectedImageId = Math.max(0, selectedImageId - 1)
    } else if (event.keyCode == 38) { //rating up
      // selectedImageId
    }
    
  }
  function showfull(imageid){
    console.log("imageload - showfull",imageid)
    selectedImageId = imageid;
    active = true;
  }

</script>


<svelte:window on:keydown={handleKeydown}/>

<button on:click={loadallImages2}>alles laden!</button>
<button on:click={saveallImages2}>alles Speichern!</button>

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
<div  style="display:inline-block"  on:dblclick={() => showfull(i)}>
  <SingleImage imageid={i} rwidth={rangewidth}></SingleImage>
</div>
{/each}

<Modal bind:active={active}>
  <p class="image">
    <img alt="Test image" src={$allImages[selectedImageId].pathorig}/>
  </p>
</Modal>

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
	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>