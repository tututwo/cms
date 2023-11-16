<script>
  export let data;
  export let colorScale;

  import * as d3 from "d3";
  import { onMount } from "svelte";

  let tiles = [
    ["binary", d3.treemapBinary],
    ["squarify", d3.treemapSquarify],
    ["slice-dice", d3.treemapSliceDice],
    ["slice", d3.treemapSlice],
    ["dice", d3.treemapDice],
  ];
  let svgWidth;
  let svgHeight;
  let ref; // This will hold the reference to the SVG element

  function updateDimensions() {
    const rect = ref.getBoundingClientRect();
    svgWidth = rect.width;
    svgHeight = rect.height;
  }
  onMount(() => {
    updateDimensions();
  });
  $: root = d3
    .treemap()
    .tile(tiles[1][1]) // e.g., d3.treemapSquarify
    .size([svgWidth, svgHeight])
    .padding(1)
    .round(true)(
    d3
      .hierarchy(data)
      .sum((d) => d.value)
      .sort((a, b) => b.value - a.value)
  );

  // Append a tooltip.
   
</script>

<svg bind:this={ref} class="w-full h-full">
  {#each root.leaves() as r}

    <g transform={`translate(${r.x0},${r.y0 ?? 1})`}>
      <rect
        fill={colorScale(r.data.name)}
        width={r.x1 - r.x0}
        height={r.y1 - r.y0}
        stroke="black"
        stroke-width="2"
      />
    </g>
  {/each}
</svg>
