<script>
// @ts-nocheck

  export let tickVals = [0, 0.5, 1];
  export let yTick = -20;
  import {format} from "d3-format"
  import { getContext} from "svelte";

  const { data, xScale, height, yScale, padding } =
    getContext("LayerCake");

  
    const formatter = format('.0%');
   
</script>

<div class="axis x-axis h-full">
  {#each tickVals as tick, i (tick)}
    <div
      class="tick tick-{i}"
      style="left:{$xScale(tick)}px;top:0%;"
    >
      <div class="text h-full font-thin text-[1.3rem]" style="top:{yTick}px;">{tick == 0 ? formatter(tick) : tick*100}</div>
     
    </div>
  {/each}
  <div style="transform: translate({$xScale(0.5)}px, 15px);" class="w-[1px] lg:h-[calc(100%-30px)]  bg-[#F6F6F6]"></div>

</div>

<style>
  .axis,
  .tick,
  .tick-mark,
  .gridline,
  .baseline {
    position: absolute;
  }
 
  

  .tick .text {
    color: #666;
    position: relative;
    white-space: nowrap;
    transform: translateX(-50%);
  }

</style>
