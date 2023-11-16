<script>
  // @ts-nocheck

  import { Html, LayerCake, Svg, flatten, stack, uniques } from "layercake";
  import * as d3 from "d3";

  import fakeData from "$lib/fakeData.csv";
  import Bar from "$lib/components/Bar.svelte";
  import StackedBar from "$lib/components/StackedBar.svelte";

  let yKey = "county";
  let colorKey = "category";
  let data = fakeData.filter((d) => d.Metric_Type == "Improved Metric");
  const groupedData = d3.group(data, (d) => d.population);
 
  // groupedData.forEach((value, key) => {
  //   console.log(value);
  // });
</script>

{#each groupedData as [group,data],i}
  <StackedBar {data} {group}/>
{/each}
