<script>
  // @ts-nocheck

  import { writable } from "svelte/store";
  import gsap from "gsap";
  import rough from "roughjs";
  import { onMount } from "svelte";
  let rawData = [
    { value: 10, str: "a" },
    { value: 20, str: "a" },
    { value: 30, str: "b" },
    { value: 40, str: "b" },
    { value: 50, str: "c" },
    { value: 60, str: "c" },
  ];

  // Create a GSAP store wrapper

  function createGSAPStore(initialData, options) {
    const { subscribe, set } = writable(initialData);
    let animations = [];
    console.log(initialData)
    return {
      subscribe,
      animate: (newValues) => {
        animations.forEach((anim) => anim.kill()); // Kill previous animations
        animations = newValues.map((newValue, index) => {
          return gsap.to(initialData[index], {
            ...options,
            value: newValue,
            onUpdate: () => set([...initialData]),
          });
        });
      },
    };
  }
 
  const animationData = createGSAPStore(
    rawData.map((d) => ({ ...d, value: 0 })),
    { duration: 1 }
  );

  let canvas;
  let context;
  let roughCanvas;

  onMount(() => {
    context = canvas.getContext("2d");
    roughCanvas = rough.canvas(canvas);
  });

  function animateData(filterFn) {
    const filteredData = rawData.filter(filterFn).map((d) => d.value);
    console.log(filteredData)
    animationData.animate(filteredData);
  }

  $: animationData.subscribe(($animationData) => {
    if (context && roughCanvas) {
      drawChart($animationData);
    }
  });

  function drawChart(chartData) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    chartData.forEach((d, i) => {
      if (d.value > 0) {
        roughCanvas.rectangle(10, i * 50, d.value * 10, 40);
      }
    });
  }
</script>

<canvas bind:this={canvas} width="600" height="400" />
<button on:click={() => animateData((d) => d.value > 35)}>Get Big Data</button>
<button on:click={() => animateData((d) => d.value < 35)}>Get Small Data</button>
