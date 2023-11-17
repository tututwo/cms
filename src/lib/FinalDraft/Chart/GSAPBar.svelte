<script>
  import { onMount } from "svelte";
  import gsap from "gsap";
  import rough from "roughjs";

  let rawData = [
    { value: 10, str: "a" },
    { value: 20, str: "a" },
    { value: 30, str: "b" },
    { value: 40, str: "b" },
    { value: 50, str: "c" },
    { value: 60, str: "c" },
  ];

  let animationData = rawData.map((d) => ({ ...d, value: 0 }));
  let canvas;
  let context;
  let roughCanvas;

  onMount(() => {
    if (canvas) {
      context = canvas.getContext("2d");
      roughCanvas = rough.canvas(canvas);
    }
  });

  function animateData(filterFn) {
    const filteredData = rawData.filter(filterFn);

    gsap.to(animationData, {
      duration: 1,
      value: (i) => filteredData[i]?.value || 0,
      onUpdate: drawChart,
    });
  }

  function drawChart() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    animationData.forEach((d, i) => {
      if (d.value > 0) {
        roughCanvas.rectangle(10, i * 50, d.value * 10, 40); // Example dimensions
      }
    });
  }
</script>

<canvas bind:this={canvas} width="600" height="400" />
<button on:click={() => animateData((d) => d.value > 35)}>Get Big Data</button>
<button on:click={() => animateData((d) => d.value < 35)}>Get Small Data</button
>
