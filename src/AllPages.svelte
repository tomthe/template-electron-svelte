<script>
  import { Button, Modal } from 'svelma';
  import {  allImages,bookdic } from './allimagesstore.js';

let imagesperpage = 3;
export let minrating = 1;

function generatePages(){
    $bookdic = [];
    let j = 0;
    let page = {elements:[]}
    let element = {};
    for(let i=0;i<$allImages.length;i+=1){
        if ($allImages[i].rating >= minrating){
            element={imageid:i}
            page.elements.push(element)

            if (page.elements.length >=imagesperpage){
                $bookdic.push(page)
                $bookdic = $bookdic;
                page = {elements:[]}
            }
        }

    }
    $bookdic.push(page)  
    $bookdic = $bookdic;
}

</script>


<div class="field is-horizontal">
  <div class="field-label is-normal">
    <label class="label">
      Number of images per page: {imagesperpage}</label>
  </div>
  <div class="field-body">
    <div class="field">
      <div class="control">
      <input class="input" type="range" min="1" max="24" bind:value={imagesperpage}>
    </div>
    </div>
  </div>
</div>

 <Button type="is-primary block" on:click={generatePages}>Generate Pages</Button>

 {JSON.stringify($bookdic)}