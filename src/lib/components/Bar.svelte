<script>
  export let gapSize = 5;

  import { getContext } from "svelte";

  const { data, zGet, yGet, xScale, yScale, zScale } = getContext("LayerCake");
</script>

<g>
  {#each $data as series, i}
    
    {#each series as d}
      {@const widthValue = $xScale(d[1]) - $xScale(d[0])}
      {@const adjustedGapSize = Math.min(gapSize, widthValue / 2)}
      {@const barWidth = widthValue - adjustedGapSize}
      <rect
      rx={2}
        x={$xScale(d[0]) + gapSize / 2}
        y={$yGet(d.data)}
        width={barWidth}
        height={$yScale.bandwidth()}
        fill={$zGet(series)}
        stroke={"white"}
        opacity={0.75}
      />
    {/each}
  {/each}
</g>
