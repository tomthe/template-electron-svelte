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
:global(.svlt-grid-shadow) {
  background: pink;
}
:global(.svlt-grid-container) {
  background: #eee;
}
</style>

<script>
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

<Grid {colitems} bind:items={colitems} cols={60} let:item={item} rowHeight={10}>
	<div class=content style="background: {item.static ? '#cce' : '#ccc'};border:1px solid black;">{item.id}</div>
</Grid>