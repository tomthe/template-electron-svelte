<script>
  import Grid1 from "./Grid1.svelte"
  import { fabric } from "fabric";
  import { onMount } from 'svelte';
  import {  allImages,bookdic } from './allimagesstore.js';
  const app = require('electron');
  const fs = require('fs');
  const os = require('os');
  const path = require('path');
  import  SingleImage  from './SingleImage.svelte'
  import { Button } from 'svelma';
  // import { Modal } from 'svelma';
  
	import Modal,{getModal} from './Modal.svelte'
  const sharp = require('sharp');
  //import { sharp } from "sharp"; // this doesn't work, use require instead
  //const fs = require('fs')
  //import { fs } from "fs";
  //import Jimp from 'jimp';
  
  // const { ipcRenderer } = require('electron');

	// export let name;
	export let files = []
  let files2;

	let directly_import = true;
  let filenames = [];
  let selectedImageId=-1;
  let active=false;
  let modalsource="";
  $: if (selectedImageId > -1) {
    if (directly_import){
      modalsource = $allImages[selectedImageId].pathorig;
    } else {
      modalsource = filenames[selectedImageId]
    }
  }
  // export let can;

let rangewidth = 230;

  // let canvas;
  // let canv;

  onMount(() => {

    loadallImages2();

    // canv = new fabric.Canvas(canvas);

    // const rect = new fabric.Rect({
    //   left: 10,
    //   top: 10,
    //   width: 20,
    //   height: 15,
    //   fill: "blue"
    // });
    // canv.add(rect);
    
    //ipcRenderer.on('jimp-triggered', handleImage);
  });

  function handleImage(){
    console.log("hanbel");
  }

  function put_image_into_allimages_and_generate_thumb(pathorig,rating=0){
 
  if (!fs.existsSync(path.join(os.homedir(), '\\fotobuchbauer'))){  
    fs.mkdirSync(path.join(os.homedir(), '\\fotobuchbauer'))
  }
  
  if (!fs.existsSync(path.join(os.homedir(), 'fotobuchbauer','thumbnails'))){  
    fs.mkdirSync(path.join(os.homedir(), 'fotobuchbauer','thumbnails'))
  }


  //let thumbname = 'C:\\dev\\svelte\\test\\o' + generateHash(pathorig) + 'g3.jpg'
  const thumbname =  path.join(os.homedir(), 'fotobuchbauer','thumbnails','t' + generateHash(pathorig) + 'g4.jpg')
  sharp(pathorig)
    .metadata()
    .then((metadata)=> {
      sharp(pathorig)
      
      .resize(300)
      .toFile(thumbname)
      .then(()=> {
        let nextid = $allImages.length
        let rorig=metadata.width/metadata.height;
        let newimageentry = {fnsmall:thumbname,rating:rating,pathorig:pathorig,id:nextid,name:"n",
        worig:metadata.width,horig:metadata.height,rorig:rorig,
        wsmall:300,hsmall:300/rorig}
        
        // console.log("brrrrr", metadata, newimageentry) 
        allImages.update(arr=>{
          return [...arr,newimageentry]
        })
      }
      );
    })
    // Read the image.
  //const image = await Jimp.read(pathorig);

  // Resize the image to width 150 and auto height.
  //await image.resize(250, Jimp.AUTO);

  // Save and overwrite the image
  //await image.writeAsync(thumbname);

/*
sharp(pathorig)
.resize(300)
.toFile(thumbname, function(err) {
  // output.jpg is a 300 pixels wide and 200 pixels high image
  // containing a scaled and cropped version of input.jpg
});*/

  // console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",thumbname);
  
}

async function handleload(event){
  if (!$allImages){
    $allImages = []
  }
  if (directly_import){
  console.log("allimages: ",$allImages,$allImages.length)
  //console.log(files[0])
  //ipcRenderer.send('trigger-jimp', files);
  for(let i=0;i<files.length;i+=1){
    let pathorig = files[i].path
    put_image_into_allimages_and_generate_thumb(pathorig,0)
  }
  // console.log($allImages)
  } else {
    //only show the first image
    
    modalsource = files[0];
    getModal().open()
  }
}

function handleload_single(){
    directly_import = false;
    console.log("single load",files2)
    modalsource = files2[0].path;
    let dirpath =path.dirname(files2[0].path) 
    filenames = fs.readdirSync(dirpath, {withFileTypes: true})
      .filter(item => !item.isDirectory())
      .map(item => path.resolve(dirpath,item.name))
    console.log(filenames)
    selectedImageId = filenames.indexOf(files2[0].path)
    // selected
    getModal().open()
}

function loadallImages2(){
  $allImages = JSON.parse(localStorage.getItem('allImages'));
  $bookdic = JSON.parse(localStorage.getItem('bookdic'));
}

function loadall_file(){
  $bookdic = fs.readFileSync("defaultbookdic.json",{encoding:'utf8', flag:'r'})//
}

export function saveallImages2(){
    // Put the object into storage
    localStorage.setItem('allImages', JSON.stringify($allImages));
    localStorage.setItem('bookdic', JSON.stringify($bookdic));
    //console.log("userdata-path:", app.getPath('userData'))
    fs.writeFileSync("defaultbookdic.json",JSON.stringify($bookdic));
    fs.writeFileSync("defaultallImages.json",JSON.stringify($allImages));
}

function generateHash(inputstr){
    var hash = 0;
    if (inputstr.length == 0) {
        return hash;
    }
    for (var i = 0; i < inputstr.length; i++) {
        var char = inputstr.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
}

	function handleKeydown(event) {
    console.log("keydown. keycode:",event.keyCode)
    //   console.log("keydown - ", $allImages[imageid].fnsmall)
    if (event.keyCode == 39) {
        selectedImageId = Math.min(selectedImageId + 1,((directly_import) ? $allImages.length : filenames.length) -1);
    } else     if (event.keyCode == 37) {
      selectedImageId = Math.max(0, selectedImageId - 1)
    } else if (event.keyCode == 38) { //rating up
      if (directly_import){
        $allImages[selectedImageId].rating = Math.min( $allImages[selectedImageId].rating+1, 5)
      } else {
        // load selected image and give it a rating of 1
        put_image_into_allimages_and_generate_thumb(filenames[selectedImageId],1)
      }
    } else if (event.keyCode == 40) { //rating down
      if (directly_import){
        $allImages[selectedImageId].rating = Math.max( $allImages[selectedImageId].rating-1, 0)
      }
    }else if (event.keyCode == 27) { //ESC
      directly_import = true
    }
    
  }
  function showfull(imageid){
    console.log("imageload - showfull",imageid)
    selectedImageId = imageid;
    // active = true;
    modalsource = $allImages[selectedImageId].pathorig;
    getModal().open()
  }

</script>


<svelte:window on:keydown={handleKeydown}/>

<button on:click={loadallImages2}>alles laden!</button>
<button on:click={saveallImages2}>alles Speichern!</button>

<main>

</main>

<label>
	<input type=checkbox bind:checked={directly_import}>
  Directly import the images
</label>

<label for="avatar">Select images to include:</label>

<input type="file"
       id="avatar" name="avatar"
       accept="image/*"
       multiple
       bind:files
       on:change={handleload}>
<br>

<label for="avatar2">Select one image for scanning:</label>
<input type="file"
       id="avatar2" name="avatar2"
       accept="image/*"
       multiple
       bind:files={files2}
       on:change={handleload_single}>
<br>


<br>

<input type="range" min="0" max="500" bind:value={rangewidth}>
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

<div style="overflow-y:auto; height:95vh;">
{#each ($allImages || []) as oneimage, i}
<div  style="display:inline-block"  on:dblclick={() => showfull(i)}>
  <SingleImage imageid={i} rwidth={rangewidth}></SingleImage>
</div>
{/each}
</div>

<!-- <Modal bind:active={active} showClose=true>
    <img alt="big view" width="95%" src={$allImages[selectedImageId].pathorig}/>
</Modal> -->

<Modal>
    <img alt="big view" style="max-height: 95vh;" src={modalsource}/>
</Modal>

<!--
{#each (files || []) as file, i}
    <span data-id={i}>
      <img class="thumb" src={window.URL.createObjectURL(file)} title={file.name} data-id={i} alt="noPic"/>
      <!--<p><strong>{file.name}</strong>{i} ({file.size})</p>->
    </span>
{/each}
-->


<!-- <button on:click={handleload}>nochmal handleload!</button> -->



<style>
	/* main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}
	@media (min-width: 940px) {
		main {
			max-width: none;
		}
	} */
  .modal-card, .modal-content {
    margin: 0 auto;
    max-height: calc(100vh - 40px);
    width: 99%;}
</style>