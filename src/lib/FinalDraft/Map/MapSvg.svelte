<script>
  // @ts-nocheck

  export let rawData;
  import { geoPath } from "d3-geo";
  import { raise } from "layercake";
  import { getContext, createEventDispatcher } from "svelte";
  const { data, width, height, zGet } = getContext("LayerCake");

  /** @type {Function} projection - A D3 projection function. Pass this in as an uncalled function, e.g. `projection={geoAlbersUsa}`. */
  export let projection;
export let heightStretchRatio = 1.05
  /** @type {Number} [fixedAspectRatio] - By default, the map fills to fit the $width and $height. If instead you want a fixed-aspect ratio, like for a server-side rendered map, set that here. */
  export let fixedAspectRatio = undefined;

  /** @type {String} [fill] - The shape's fill color. By default, the fill will be determined by the z-scale, unless this prop is set. */
  export let unavailableColor = undefined;
  export let availableColor = undefined;

  /** @type {String} [stroke='#333'] - The shape's stroke color. */
  export let stroke = "#333";

  /** @type {Number} [strokeWidth=0.5] - The shape's stroke width. */
  export let strokeWidth = 0.5;
  $: fitSizeRange = fixedAspectRatio
    ? [100, 100 / fixedAspectRatio]
    : [$width, $height*heightStretchRatio];

  $: geoPathFn = geoPath(projection().scale(1).fitSize(fitSizeRange, $data));

  const dispatch = createEventDispatcher();
  // data.find((d) => +d.location === +feature.properties.COUNTYFP)
  // ? "cyan"
  //       : fill
  function handleMousemove(e) {
    raise(this);
  }
</script>

<g>
  {#each $data.features as feature}
    {@const existCounty = rawData.find(
      (d) => +d.location === +feature.properties.COUNTYFP
    )}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <path
      class="feature-path"
      fill={existCounty ? availableColor : unavailableColor}
      stroke={existCounty ? stroke : stroke}
      stroke-width={existCounty ? 1 : 0.2}
      d={geoPathFn(feature)}
      opacity={0.8}
      on:click={(e) => dispatch("mapClick", { e, props: feature.properties })}
      on:mousemove={handleMousemove}
    />
  {/each}
</g>

<style>
  .feature-path:hover {
    stroke: white;
    stroke-width: 4px;
  }
  /**
   * Disable the outline on feature click.
   * Depending on map funtionality and accessiblity issues,
   * you may not want this rule. Read more:
   * https://developer.mozilla.org/en-US/docs/Web/CSS/:focus
   * https://github.com/mhkeller/layercake/issues/63
   */
  .feature-path:focus {
    outline: none;
  }
</style>
