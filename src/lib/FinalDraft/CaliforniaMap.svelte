<script>
  // @ts-nocheck

  export let mapData;
  export let rawData;

  import * as d3 from "d3";
  import { feature } from "topojson-client";
  import { LayerCake, Svg } from "layercake";
  import MapSvg from "./Map/MapSvg.svelte";

  const geojson = feature(mapData, mapData.objects.counties);
  const flatData = geojson.features.map((d) => d.properties);

  const projection = d3.geoIdentity;
</script>

<figure class="w-full h-full flex align-center">
  <LayerCake data={geojson} {flatData}>
    <Svg>
      <MapSvg
        {projection}
        unavailableColor="#ffedbd"
        availableColor="#FFC52F"
        stroke="white"
        strokeWidth="3"
        on:mapClick
        {rawData}
      />
    </Svg>
  </LayerCake>
</figure>
