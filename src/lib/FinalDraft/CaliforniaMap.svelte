<script>
  // @ts-nocheck

  export let data;

  import * as d3 from "d3";
  import { feature } from "topojson-client";
  import { LayerCake, Svg } from "layercake";
  import MapSvg from "./Map/MapSvg.svelte";

  const geojson = feature(data, data.objects.counties);
  const flatData = geojson.features.map((d) => d.properties);

  const projection = d3
    .geoIdentity
    
</script>

<figure class="w-full h-full flex align-center">
  <LayerCake data={geojson} {flatData}>
    <Svg>
      <MapSvg {projection} fill='lightgrey' stroke="white" strokeWidth=3/>
    </Svg>
  </LayerCake>
</figure>
