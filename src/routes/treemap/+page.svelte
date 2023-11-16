<script>
  // @ts-nocheck

  import { Html, LayerCake, Svg, flatten, stack, uniques } from "layercake";
  import * as d3 from "d3";

  import data from "$lib/fakeData.csv";
  import Treemap from "$lib/treemapComponents/Treemap.svelte";

  const categories = [
    "prop_comfortable",
    "prop_okay",
    "prop_just",
    "prop_difficult",
  ]
  let colors = ['#E8D5B6','#E6B451','#F95739','#809D85','#265578']
  const colorScale = d3.scaleOrdinal()
  .domain(categories)
  .range(colors);
  
  const groupedData = d3.groups(
    data.filter((d) => d.Metric_Type == "Improved Metric"),
    (d) => d.population,
    (d) => d.county
  );

  // Now create a rootNode for each county and group
  const rootNodes = Array.from(groupedData, ([population, groups]) => ({
    name: population,
    children: Array.from(groups, ([group, entries]) => ({
      name: group,
      children: entries.map((entry) => ({
        name: group,
        children: categories.map((category) => ({
          name: category,
          value: +entry[category],
        })),
      })),
    })),
  }));

</script>

{#each rootNodes as { name: population, children: data }}
  <div class="grid w-full h-full" id="population-container">
    {#each data as { name: county, children: d }}
      <figure class='w-full h-full'>
        <Treemap data={d[0]} {colorScale}/>
      </figure>
    {/each}
  </div>
{/each}

<style>
  #population-container {
    grid-template-columns: repeat(29, 1fr); /* 29 columns */
    grid-template-rows: repeat(minmax(2, auto), 1fr); /* 2 rows */
    
  }
</style>
