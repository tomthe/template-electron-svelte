
<script>
    import { allImages } from './allimagesstore.js';
    import { onMount } from 'svelte';
    export let imageid, rwidth;
    import { Button, Modal } from 'svelma';
    import { Icon } from 'svelma';

    let active = false;
    // handleClick(() =>{
    //     console.log(" without function? image clicked: ", $allImages[imageid].fnsmall)
    // })

    function handleClick2() {
        $allImages[imageid].rating +=1;
        if($allImages[imageid].rating > 5) {
            $allImages[imageid].rating = 0;
        }
        console.log("image clicked: ", $allImages[imageid].fnsmall)
    }

    
    function handleDblclick() {
        console.log("dblclick!",$allImages[imageid].fnorig, $allImages[imageid].fnorig.path, $allImages[imageid].pathorig,"hoho");
        
        $allImages[imageid].rating -=2;
        if($allImages[imageid].rating ==-2) {
            $allImages[imageid].rating = 4;
        } else if($allImages[imageid].rating ==-1) {
            $allImages[imageid].rating = 5;
        } 
        // active = !active;
    }
    //   console.log("Single Image!!")
    //   console.log("imageid:",imageid,rwidth)
    //   console.log("imageid:",JSON.stringify(imageid),rwidth)
    //   console.log("allimages:", $allImages)
    //   console.log("sdf0",$allImages[0])
    //   console.log("sdfid",$allImages[imageid])
    
  onMount(() => {
    //   console.log("Mount - Single Image!!")
    //   console.log("imageid:",imageid,rwidth)
    //   console.log("allimages:", $allImages)
    //   console.log("$allimages:", $allImages)
    //   console.log("sdf",$allImages[imageid])
  });
</script>


<div  style="display:inline-block" on:click={handleClick2}  on:dblclick={handleDblclick}>
{imageid}
{$allImages[imageid].fnsmall} <br>
<img class="thumb" src={'file://' + $allImages[imageid].fnsmall} width={rwidth} title={$allImages[imageid].fnorig} data-id={imageid} alt="noPicuuiiu"/>
<br>
Rating: {$allImages[imageid].rating}
<Button class="block" on:click={() => active = !active}><Icon pack="fab" size="is-large" icon="expand" /></Button>

<!--<p><strong>{file.name}</strong>{i} ({file.size})</p>-->


<!-- <Button class="block" on:click={() => active = !active}>Toggle</Button> -->

</div>