 <script>   
    import { flip } from 'svelte/animate';
	import { dndzone } from 'svelte-dnd-action';
    import {  allImages,bookdic } from './allimagesstore.js';
    import  SingleImage  from './SingleImage.svelte'

    export let items;
    export let containerWidth = '200vw';
    export let itemWidth = '10%';
	const flipDurationMs = 300;
	function handleDndConsider(e) {
		items = e.detail.items;
	}
	function handleDndFinalize(e) {
		items = e.detail.items;
	}
</script>

<style>
	section {
        height: 260px;
        width:100%;
		padding: 0.3em;
		border: 1px solid black;
		display: flex;
		overflow-x: auto;
	}
	div {
        height: 200px;
        display: inline-block;
		padding: 0.9em;
		border: 1px solid blue;
		margin: 0 0.15em;
	}
</style>
<section style="width:{containerWidth}" use:dndzone={{items, flipDurationMs}} on:consider={handleDndConsider} on:finalize={handleDndFinalize}>
	{#each items as item(item.id)}
		<div style="width:{itemWidth}" animate:flip="{{duration: flipDurationMs}}">
			<!-- {item.name}	 -->
            
            <img class="thumb" src={'file://' + $allImages[item.id].fnsmall}  title={$allImages[item.id].fnorig} data-id={item.id} alt="noPicuuiiu"/>
            <!-- {$allImages[item.id].pathorig} -->
            <!-- <SingleImage imageid={item.id}></SingleImage> -->
		</div>
	{/each}
</section>