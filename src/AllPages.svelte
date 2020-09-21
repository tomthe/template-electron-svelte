<script>
  import { Button, Modal } from 'svelma';
  import {  allImages,bookdic } from './allimagesstore.js';
  import  Collage  from './Collage.svelte';

	import VerticalList from './VerticalList.svelte';
  import HorizontalList from './HorizontalList.svelte';

    // import {dndzone} from 'svelte-dnd-action';

    
    function handleSort(e) {
        console.log(e.detail);
    }


let imagesperpage = 3;
export let minrating = 1;

function generatePages(){
    $bookdic = [];
    let j = 0;
    let page = {elements:[]}
    let element = {};
    for(let i=0;i<$allImages.length;i+=1){
        if ($allImages[i].rating >= minrating){
            element={id:i,name:"boo"}
            page.elements.push(element)

            if (page.elements.length >=imagesperpage){
                $bookdic.push(page)
                $bookdic = $bookdic;
                page = {elements:[]}
            }
        }

    }
    if(page.elements.length > 0){
      $bookdic.push(page)
    }  
    $bookdic = $bookdic;
}

function addPage(){
    $bookdic.push({elements:[]})
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
<div class="field is-horizontal">
  <div class="field-label is-normal">
    <label class="label">
      Minimum Rating: {minrating}</label>
  </div>
  <div class="field-body">
    <div class="field">
      <div class="control">
      <input class="input" type="range" min="0" max="5" bind:value={minrating}>
    </div>
    </div>
  </div>
</div>

 <Button type="is-primary block" on:click={generatePages}>Generate Pages</Button>
<div class="columns">
  <div class="column is-2">
    <VerticalList items={$allImages  || []}/> 
  </div>

  <div class="column" style="overflow: auto; max-height: 84vh;">
  {#each ($bookdic || []) as onepage, i}

    <HorizontalList items={onepage.elements} containerWidth="100%" itemWidth="200px"/>
    <Collage rati={1.05} elements={onepage.elements}></Collage>
<!-- 
    {#each (onepage.elements || []) as element, i}
        <div>{element.id}.-.-.</div>
    {/each} -->
  {/each}
  </div>
</div>

 <Button type="is-primary block" on:click={addPage}>Add Page</Button>

<!-- {#each ($bookdic || []) as onepage, i}
<section use:dndzone={onepage.elements} on:consider={handleSort} on:finalize={handleSort}>
	{#each (onepage.elements || []) as element(i)}}
		<div>
			{element.imageid}	
		</div>
	{/each}
</section>
{/each} -->

