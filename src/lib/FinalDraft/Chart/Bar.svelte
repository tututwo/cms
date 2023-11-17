<script>
// @ts-nocheck

  import { tweened } from "svelte/motion";
  import { cubicOut } from "svelte/easing";
  import rough from "roughjs";

  let rawData = [
    { value: 10, str: "a" }, { value: 20, str: "a" }, { value: 30, str: "b" },
    { value: 40, str: "b" }, { value: 50, str: "c" }, { value: 60, str: "c" }
  ];

  // Extract numeric values for tweening
  const tweenedValues = tweened(rawData.map(d => d.value), {
    duration: 500,
    easing: cubicOut
  });

  let canvas;
  let context;
  let roughCanvas;

  $: if (canvas) {
    context = canvas.getContext("2d");
    roughCanvas = rough.canvas(canvas);
  }

  $: if (roughCanvas && $tweenedValues) {
    drawChart($tweenedValues);
  }

  function drawChart(chartValues) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    chartValues.forEach((value, i) => {
      // Find corresponding 'str' value
      const str = rawData.find(d => d.value === value)?.str || '';
      roughCanvas.rectangle(10, i * 50, value * 10, 40); // Example dimensions
    });
  }

  function updateData(filterFn) {
    tweenedValues.set(rawData.filter(filterFn).map(d => d.value));
  }
</script>

<canvas bind:this={canvas} width="600" height="400" />
<button on:click={() => updateData(d => d.value > 35)}>Get Big Data</button>
<button on:click={() => updateData(d => d.value < 35)}>Get Small Data</button>
