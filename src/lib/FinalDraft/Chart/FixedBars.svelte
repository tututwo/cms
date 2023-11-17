<script>
  // @ts-nocheck

  export let canvasElement;
  export let gapSize;
  import rough from "roughjs";

  import { writable, get } from "svelte/store";
  import { getContext, onMount, setContext } from "svelte";
  import { scaleCanvas } from "layercake";
  const { data, width, height, xScale, yScale, zScale } =
    getContext("LayerCake");
  const { ctx } = getContext("canvas");

  let roughCanvas;
  $: if (canvasElement) {
    roughCanvas = rough.canvas(canvasElement);
  }

  $: {
    if (ctx && canvasElement) {
      scaleCanvas($ctx, $width, $height * .2);
      $ctx.clearRect(0, 0, $width, $height * .2);
      $ctx.globalAlpha = 0.7;
    }
  }
</script>
