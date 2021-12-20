<script>
import Grid from "svelte-grid";
import gridHelp from "svelte-grid/build/helper/index.mjs";

const id = () => "_" + Math.random().toString(36).substr(2, 9);
console.log("grid. id: ", id())
let items = [
  {
    6: gridHelp.item({
      x: 0,
      y: 0,
      w: 1,
      h: 1,
    }),
    id: id(),
  },

  {
    6: gridHelp.item({
      x: .5,
      y: 1,
      w: 1,
      h: 1,
    }),
    id: id(),
  },
];

const cols = [
  [ 600, 6 ],
];

</script>
<div width="75vh">
  <Grid {cols}  rowHeight={10} let:dataItem bind:items={items} let:item={item} style="width: 88vh;">
    <div>{dataItem.id}</div>
  </Grid>
</div>