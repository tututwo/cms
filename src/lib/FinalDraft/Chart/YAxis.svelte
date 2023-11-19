<script>
  import { getContext, onMount, setContext } from "svelte";
  import { fade } from "svelte/transition";

  const { data, xRange, height, xScale, yScale, padding } =
    getContext("LayerCake");
  $: isBandwidth = typeof $yScale.bandwidth === "function";

  /** @type {Number} [xTick=-4] - How far over to position the text marker. */
  export let xTick = -4;

  /** @type {Number} [yTick=-2] - How far up and down to position the text marker. */
  export let yTick = -20;

  export let yKey = "population_name";
</script>

<div
  class="axis y-axis w-full h-full"
  style="transform:translate(-{$padding.left}px, 0)"
>
  {#each $data[0].map((d) => d.data[yKey]) as tick, i (tick)}
    <div
      class="tick tick-{i}"
      style="top:{$yScale(tick) +
        (isBandwidth ? $yScale.bandwidth() / 2 : 0)}px;left:{$xRange[0]}%;"
    >
      <div
        in:fade={{ duration: 250 }}
        id="bar-name"
        class="text-xs lg:font-thin tracking-tighter lg:text-[1.2rem] text-left text-[#021228] uppercase bg"
        style="
          top:{yTick}px;
          left:{isBandwidth ? $padding.left + xTick - 4 : 0}px;
          transform: translate({isBandwidth ? '16px' : 0}, {isBandwidth
          ? -50 - Math.floor($yScale.bandwidth() / -2)
          : '-200'}%);
        "
      >
        {tick}
      </div>
    </div>
  {/each}
</div>

<style>
  .axis,
  .tick,
  .tick-mark,
  .gridline,
  .baseline,
  .text {
    position: absolute;
    z-index:10
  }
  #bar-name {
    text-shadow: -2px -2px 0 #fff, -2px -0.2px 0 #fff, -2px 0 2px #fff,
      -2px 0.2px 0 #fff, -2px 2px 0 #fff, -0.2px -2px 0 #fff,
      -0.2px -0.2px 0 #fff, -0.2px 0 2px #fff, -0.2px 0.2px 0 #fff,
      -0.2px 2px 0 #fff, 0 -2px 2px #fff, 0 -0.2px 2px #fff, 0 0.2px 2px #fff,
      0 2px 2px #fff, 0.2px -2px 0 #fff, 0.2px -0.2px 0 #fff, 0.2px 0 2px #fff,
      0.2px 0.2px 0 #fff, 0.2px 2px 0 #fff, 2px -2px 0 #fff, 2px -0.2px 0 #fff,
      2px 0 2px #fff, 2px 0.2px 0 #fff, 2px 2px 0 #fff;
  }
</style>
