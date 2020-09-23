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

const id = () =>
  "_" +
  Math.random()
    .toString(36)
    .substr(2, 9);

let items = [
  gridHelp.item({ x: 20, y: 20, w: 20, h: 12.2, id: 43 }),
  gridHelp.item({ x: 2, y: 0, w: 15, h: 12, id: 2, static: false }),
  gridHelp.item({ x: 5, y: 10, w: 10, h: 13, id: 4 })
];


</script>


<h1>Static</h1>

<Grid {items} cols={30} let:item={item} rowHeight={20}>
	<div class=content style="background: {item.static ? '#cce' : '#ccc'};border:1px solid black;">{item.id}</div>
</Grid>