<script>
  // Import data from a global store, then filtering can take place in another component
  import { data } from "$lib/data/data";
  import { Html, LayerCake, Canvas, flatten, stack, uniques } from "layercake";
  import * as d3 from "d3";

  import SortChartButtons from "$lib/FinalDraft/FilterUI/SortChartButtons.svelte";
  // import Bar from "./Chart/Bar.svelte";
  // import GSAPBar from "./Chart/GSAPBar.svelte";
  // import GSAPStoreBar from "./Chart/GSAPStoreBar.svelte";
  import StackedBar from "$lib/FinalDraft/Chart/StackedBar.svelte";
  let gapSize = /* gap size */ 0.3;

  // Stack function
  let yKey = "location";
  $: yDomain = Array.from(new Set($data.map((d) => d.population_name)));
  let colorKey = "key";
  const colors = ["#B9B19D", "#00B3E3", "#061E41", "#E84B37"];
  $: categories = Object.keys($data[0]).filter((key) => key.startsWith("prop"));
  $: stackedData = stack($data, categories);
</script>

<div class="w-full h-full">
  <SortChartButtons sortButtons={categories} {colors} />
  <figure class="w-full h-full">
    <LayerCake
      data={stackedData}
      flatData={flatten(stackedData)}
      xDomain={[0, 1]}
      y={yKey}
      yScale={d3.scaleBand().padding(0.3)}
      {yDomain}
      z={colorKey}
      zScale={d3.scaleOrdinal()}
      zDomain={categories}
      zRange={colors}
    >
      <Canvas let:element>
        <StackedBar canvasElement={element} {gapSize} />
      </Canvas>
    </LayerCake>
  </figure>
</div>
