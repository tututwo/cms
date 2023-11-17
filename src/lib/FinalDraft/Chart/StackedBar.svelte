<!--
	@component
	Canvas layout component
 -->
<script>
  export let canvasElement;
  export let gapSize;
  import rough from "roughjs";

  import { getContext, onMount, setContext } from "svelte";
  import { scaleCanvas } from "layercake";

  const { data, width, height, xScale, yScale, zScale } =
    getContext("LayerCake");
  const { ctx } = getContext("canvas");
  let roughCanvas;
  $: if (canvasElement) {
    roughCanvas = rough.canvas(canvasElement);
  }
  // $: console.log($data)
  $: {
    if (ctx && canvasElement) {
      scaleCanvas($ctx, $width, $height);
      $ctx.clearRect(0, 0, $width, $height);

      $data.forEach((comfortLevel) => {
        let comfortLevelName = comfortLevel.key;
        comfortLevel.forEach((d) => {
          const y = $yScale(d.data.population_name);
          const x = $xScale(d[0]) + gapSize / 2;
          const height = $yScale.bandwidth();

          const widthValue = $xScale(d[1]) - $xScale(d[0]);
          const adjustedGapSize = Math.min(gapSize, widthValue / 2);
          const width = widthValue - adjustedGapSize;

          // Retrieve the parent's data for the color
          // const parentData = /* logic to get parentData */;
          const fillColor = $zScale(comfortLevelName);
          // // Draw the rectangle
          roughCanvas.rectangle(x, y, width, height, {
            roughness: 0.5,
            fill: fillColor,
            stroke: fillColor,
            strokeWidth: 2,
            hachureGap: 1,
            hachureAngle: -30,
            fillWeight: 1.5,
            // fillStyle: fillStyle,
            bowing: 3.7,
            disableMultiStroke: true,
            disableMultiStrokeFill: true,
          });
        });
      });
    }
  }
</script>
