<script>
  // @ts-nocheck
  export let data, group;
  import { Html, LayerCake, Svg, flatten, stack, uniques } from "layercake";
  import * as d3 from "d3";

  import fakeData from "$lib/fakeData.csv";
  import Bar from "$lib/components/Bar.svelte";

  let yKey = "county";
  let colorKey = "key";

  let categories = [
    "prop_comfortable",
    "prop_okay",
    "prop_just",
    "prop_difficult",
  ];
  const stackedData = stack(data, categories);
 
</script>

<figure class="w-full h-2/3">
  <LayerCake
    data={stackedData}
    flatData={flatten(stackedData)}
    xDomain={[0, 1]}
    y={yKey}
    yScale={d3.scaleBand().padding(0.3)}
    yDomain={uniques(data, yKey)}
    z={colorKey}
    zScale={d3.scaleOrdinal()}
    zDomain={categories}
    zRange={d3.schemeYlOrBr[9].slice(3)}
  >
    <Svg>
      <Bar />
    </Svg>
  </LayerCake>
</figure>
