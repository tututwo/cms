<script>
  // @ts-nocheck

  export let mapData;
  export let rawData;

  import * as d3 from "d3";
  import { feature } from "topojson-client";
  import { LayerCake, Svg, Canvas } from "layercake";
  import MapSvg from "./Map/MapSvg.svelte";
  import MapCanvas from "./Map/MapCanvas.svelte";
  const geojson = feature(mapData, mapData.objects.counties);
  const flatData = geojson.features.map((d) => d.properties);

  const projection = d3.geoIdentity;

  let heightStretchRatio = 1.0;
</script>

<figure class="w-full h-[88%] flex align-center">
  <LayerCake
    padding={{ top: 30, right: 10, bottom: 0, left: 100 }}
    data={geojson}
    {flatData}
  >
    <Canvas>
      <MapCanvas
        {projection}
        fill="#fff"
        {heightStretchRatio}
        stroke="#041E41"
        strokeWidth="5"
      />
    </Canvas>
    <Svg>
      <MapSvg
        {projection}
        unavailableColor="none"
        availableColor="#041E41"
        stroke="white"
        strokeWidth="2"
        on:mapClick
        {rawData}
        {heightStretchRatio}
      />
    </Svg>
  </LayerCake>
</figure>
