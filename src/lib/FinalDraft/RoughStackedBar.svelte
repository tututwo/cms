<script>
  // Import data from a global store, then filtering can take place in another component
  import { data, countyTenureStore } from "$lib/data/data";
  import { Html, LayerCake, Canvas, flatten, stack, uniques } from "layercake";
  import * as d3 from "d3";

  import SortChartButtons from "$lib/FinalDraft/FilterUI/SortChartButtons.svelte";
  // import Bar from "./Chart/Bar.svelte";
  // import GSAPBar from "./Chart/GSAPBar.svelte";
  // import GSAPStoreBar from "./Chart/GSAPStoreBar.svelte";
  import StackedBar from "$lib/FinalDraft/Chart/StackedBar.svelte";
  import YAxis from "./Chart/YAxis.svelte";
 
  import XAxis from "./Chart/XAxis.svelte";

  let gapSize = /* gap size */ 10;

  // Stack function
  let yKey = "location";
  $: yDomain = Array.from(new Set($data.map((d) => d.population_name)));

  let colorKey = "key";
  const colors = ["#E84B37", "#5D6770", "#FFC52F","#00B3E3"];
  // $: categories = Object.keys($data[0]).filter((key) => key.startsWith("prop"));
  // $: console.log(categories)
  const categories = [
    "prop_difficult",
    "prop_just",
    "prop_okay",
    "prop_comfortable",
  ];

  $: stackedData = stack($data, categories);

  // County: Fixed Bars
  $: stackedcountyTenureData = stack($countyTenureStore, categories);
  $: countyTenureYDomain = Array.from(
    new Set($countyTenureStore.map((d) => d.housing_tenure))
  );
  
</script>

<div class="w-full h-full flex flex-col">
  <SortChartButtons sortButtons={categories} {colors} />

  <figure class="h-[15%]">
    <LayerCake
      padding={{ top: 30, right: 10, bottom: 0, left: 0 }}
      data={stackedcountyTenureData}
      flatData={flatten(stackedcountyTenureData)}
      xDomain={[0, 1]}
      y={yKey}
      yScale={d3.scaleBand().padding(0.25)}
      yDomain={countyTenureYDomain}
      z={colorKey}
      zScale={d3.scaleOrdinal()}
      zDomain={categories}
      zRange={colors}
    >
      <Canvas let:element>
        <StackedBar
          opacity={1}
     
          strokeWidth={0}
          roughness={0.02}
          bowing={0.0}
          fillWeight={1.5}
          hachureGap={5}
          fillStyle={"solid"}
          canvasElement={element}
          {gapSize}
          yKey={"housing_tenure"}
          startingHeight={200}
        />
      </Canvas>
      <Html>
        <!-- <XAxis></XAxis> -->
        <YAxis yKey="housing_tenure" />
      </Html></LayerCake
    >
  </figure>

  <figure class="h-[85%]">
    <LayerCake
      padding={{ top: 30, right: 10, bottom: 0, left: 0 }}
      data={stackedData}
      flatData={flatten(stackedData)}
      xDomain={[0, 1]}
      y={yKey}
      yScale={d3.scaleBand().padding(0.25)}
      {yDomain}
      z={colorKey}
      zScale={d3.scaleOrdinal()}
      zDomain={categories}
      zRange={colors}
    >
   
      <Canvas let:element >
        <StackedBar canvasElement={element} {gapSize} startingHeight={950} />
      </Canvas>
      <Html  pointerEvents={false}>
        <XAxis />
        <YAxis />
      </Html>
    </LayerCake>
  </figure>
</div>
