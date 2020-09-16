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

<Grid {items2} bind:items={items2} cols={4} let:item rowHeight={100}>
  <div class="content" style="background: #ccc; border: 3px solid black; overflow:hidden;">	
          <img src="https://source.unsplash.com/5VXH4RG88gc" alt="alter!" />
	</div>
</Grid>
<script>
  import Grid from "svelte-grid";
  import gridHelp from "svelte-grid/build/helper/index.mjs";

  console.log("baaaaaaaa!");
	const id = () =>
    "_" +
    Math.random()
      .toString(36)
      .substr(2, 9);

  let items2 = [gridHelp.item({ x: 0, y: 0, w: 2, h: 2, id: id() }), gridHelp.item({ x: 2, y: 0, w: 2, h: 2, id: id() })];

</script>
