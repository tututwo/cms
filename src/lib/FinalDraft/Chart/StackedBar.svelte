<!--
	@component
	Canvas layout component
 -->
<script>
  // @ts-nocheck

  export let canvasElement;
  export let gapSize;
  import rough from "roughjs";
  import gsap from "gsap";
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
  // $: console.log($data)

  function createGSAPStore(initialData, options) {
    const { subscribe, set } = writable(initialData);
    let animations = [];
    return {
      subscribe,
      animate: (listOfNewValues) => {
        listOfNewValues.forEach((newValues, rowIndex) => {
          if (!animations[rowIndex]) animations[rowIndex] = [];
          animations[rowIndex].forEach((anim) => anim.kill()); // Kill previous animations
          animations[rowIndex] = newValues.map((newValue, index) => {
            return gsap.to(initialData[rowIndex][index], {
              ...options,
              ...newValue,
              onUpdate: () => set(initialData),
            });
          });
        });
      },
    };
  }

  const animatedStore = createGSAPStore(get(data), {
    duration: .8,
    ease: "power2.inOut",
  });
  $: animatedStore.animate($data);

  $: {
    if (ctx && canvasElement) {
      scaleCanvas($ctx, $width, $height);
      $ctx.clearRect(0, 0, $width, $height);

      $animatedStore.forEach((comfortLevel) => {
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
            seed:20
          });
        });
      });
    }
  }
</script>
