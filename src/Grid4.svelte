<style>
  .content {
    width: 100%;
    height: 100%;
    color: black;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: large;
  }
  .fill img { min-height:100%; min-width: 100%; object-fit: cover; }

  .svlt-grid-shadow {
    background: blue;
  }
  .svlt-grid-container {
    background: #eae;
  }
</style>

<Grid cols={[[1200, 6]]} bind:items={items} let:item={item}>
  <div class="fill" style="background: #eae; border: 3px solid black; overflow:hidden;">	
          <img src="C:/dev/svelte/svelectron2/template-electron-svelte_yes1/303_lalala.jpg" alt="{item.id}" />
	</div>
</Grid>
<script>
  import Grid from "svelte-grid";
  import gridHelp from "svelte-grid/build/helper/index.mjs";
  import {  allImages,bookdic } from './allimagesstore.js';
  import { onMount } from 'svelte';

  export let i_page=0;
  let items = []
  
  onMount(() => {
    console.log("grid4!");
    console.log("i_page:",i_page)
    console.log("colpg: ",$bookdic[i_page].colpg)
    
    items = []
    if($bookdic[i_page] && $bookdic[i_page].colpg) {
      console.log("grid4. add images now:")
      for (let iim = 0; iim < $bookdic[i_page].colpg.length; iim++) {
        const element = $bookdic[i_page].colpg[iim];
        const newitem = gridHelp.item({ x: parseInt(element.outerx*30), 
            y: parseInt(element.outery*30), w: parseInt(element.outerw*30), h: parseInt(element.outerh*30),
            id: element.imid, src: $allImages[element.imid].fnsmall })
          
        items.push(newitem)
      }
    }
    items = [
      gridHelp.item({ x: 0, y: 0, w: 2, h: 2, id:"bubu" }),
      gridHelp.item({ x: 2, y: 0, w: 2, h: 2, id:"bla" }),
    ];
    console.log("grid4-items:",items)
  });

</script>
