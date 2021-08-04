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
.cover {
  object-fit: cover;
  width: 50px;
  height: 100px;
}
svlt-grid-shadow {
  background: pink;
}
.svlt-grid-container {
  background: #eea;
}
</style>

<script>
import { allImages } from './allimagesstore.js';
import Grid from "svelte-grid";
import gridHelp from "svelte-grid/build/helper";

export let colitems = [{}]

const id = () =>
  "_" +
  Math.random()
    .toString(36)
    .substr(2, 9);



</script>


<h1>Static</h1>
<div class="svelte-grid-container">
<Grid {colitems} bind:items={colitems} cols={60} let:item={item} rowHeight={10}>
	<div class=content style="background: {item.static ? '#cce' : '#ccc'};border:1px solid black;">
    {item.id}
    <img class="cover" src={$allImages[item.id].fnsmall} alt="nope" style="object-fit: cover;"/>
  </div>
</Grid>
</div>