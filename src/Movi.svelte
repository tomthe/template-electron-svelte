<script>
    import Moveable from "svelte-moveable";
    import { onMount } from 'svelte';

    let mounted = false;

    let frame = {
        translate: [10,20],
    };
    let frame2 = {
        translate: [40,20],
    };
    let target,target2;
    let resizable = true;

    onMount(() => {
        mounted = true;
    })

</script>
<style>
/* html, body {
    position: relative;
    height: 100%;
    margin: 0;
    padding: 0;
} */
.description {
    padding: 10px;
}
.target {
    position: absolute;
    width: 100px;
    height: 100px;
    top: 150px;
    left: 100px;
    line-height: 100px;
    text-align: center;
    background: #ee8;
    color: #333;
    font-weight: bold;
    border: 1px solid #333;
    box-sizing: border-box;
}

</style>
<div style="background:#aab; width:400px; height:500px; position:relative;">
    <div class="target" bind:this={target}>Target</div>
    <div class="target2" bind:this={target2} top="340px">Target2</div>
</div>


{#if mounted }
     <!-- content here -->
     
<Moveable
    target={target}
    resizable={resizable}
    draggable={true}
    
    on:dragStart={({ detail: { set } }) => {
        set(frame.translate);
        console.log("1--",frame)
    }}
    on:drag={({ detail: { target, beforeTranslate } }) => {
        target.style.transform = `translate(${beforeTranslate[0]}px, ${beforeTranslate[1]}px)`;
    }}
    on:dragEnd={({ detail: { lastEvent } }) => {
        if (lastEvent) {
            frame.translate = lastEvent.beforeTranslate;
        }
    }}
    keepRatio={false}
    throttleResize={0}
    renderDirections={["nw","n","ne","w","e","sw","s","se"]}
    edge={false}
    zoom={1}
    origin={false}
    padding={{"left":0,"top":0,"right":0,"bottom":0}}
    on:resizeStart={({ detail: { setOrigin, dragStart } }) => {
        console.log("resizeStart",setOrigin,dragStart)
        setOrigin(["%", "%"]);
        dragStart && dragStart.set(frame.translate);
    }}
    on:resize={({ detail: { target, width, height, drag } }) => {
        const beforeTranslate = drag.beforeTranslate;
    
        frame.translate = beforeTranslate;
        target.style.width = `${width}px`;
        target.style.height = `${height}px`;
        target.style.transform = `translate(${beforeTranslate[0]}px, ${beforeTranslate[1]}px)`;
    }}
/>
{/if}}


{#if mounted }
<Moveable
    target={target2}
    resizable={resizable}
    draggable={true}
    
    on:dragStart={({ detail: { set } }) => {
        set(frame2.translate);
        console.log("2--",frame2)
    }}
    on:drag={({ detail: { target, beforeTranslate } }) => {
        target.style.transform = `translate(${beforeTranslate[0]}px, ${beforeTranslate[1]}px)`;
    }}
    on:dragEnd={({ detail: { lastEvent } }) => {
        if (lastEvent) {
            frame2.translate = lastEvent.beforeTranslate;
        }
    }}
    keepRatio={false}
    throttleResize={0}
    renderDirections={["nw","n","ne","w","e","sw","s","se"]}
    edge={false}
    zoom={1}
    origin={false}
    padding={{"left":0,"top":0,"right":0,"bottom":0}}
    on:resizeStart={({ detail: { setOrigin, dragStart } }) => {
        console.log("resizeStart",this, setOrigin,dragStart,frame2)
        setOrigin(["%", "%"]);
        dragStart && dragStart.set(frame2.translate);
    }}
    on:resize={({ detail: { target, width, height, drag } }) => {
        const beforeTranslate = drag.beforeTranslate;
    
        frame2.translate = beforeTranslate;
        target.style.width = `${width}px`;
        target.style.height = `${height}px`;
        target.style.transform = `translate(${beforeTranslate[0]}px, ${beforeTranslate[1]}px)`;
    }}
/>
{/if}}