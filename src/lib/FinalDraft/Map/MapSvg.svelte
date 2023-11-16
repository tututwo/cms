<script>
  import { geoPath } from "d3-geo";
  import { getContext, createEventDispatcher } from "svelte";
  const { data, width, height, zGet } = getContext("LayerCake");

  /** @type {Function} projection - A D3 projection function. Pass this in as an uncalled function, e.g. `projection={geoAlbersUsa}`. */
  export let projection;

  /** @type {Number} [fixedAspectRatio] - By default, the map fills to fit the $width and $height. If instead you want a fixed-aspect ratio, like for a server-side rendered map, set that here. */
  export let fixedAspectRatio = undefined;

  /** @type {String} [fill] - The shape's fill color. By default, the fill will be determined by the z-scale, unless this prop is set. */
  export let fill = undefined;

  /** @type {String} [stroke='#333'] - The shape's stroke color. */
  export let stroke = "#333";

  /** @type {Number} [strokeWidth=0.5] - The shape's stroke width. */
  export let strokeWidth = 0.5;
  $: fitSizeRange = fixedAspectRatio
    ? [100, 100 / fixedAspectRatio]
    : [$width, $height];

  $: geoPathFn = geoPath(projection().fitSize(fitSizeRange, $data));
</script>

<g>
  {#each $data.features as feature}
    <path
      class="feature-path"
      {fill}
      {stroke}
      stroke-width={strokeWidth}
      d={geoPathFn(feature)}
    />
  {/each}
</g>

<style>
  .feature-path {
    z-index: 1;
  }
  .feature-path:hover {
    z-index: 100;
    stroke: #000;
    stroke-width: 5px;
  }
</style>
