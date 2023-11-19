<!--
	@component
	Canvas layout component
 -->
<script>
  // @ts-nocheck

  export let canvasElement;
  export let gapSize;
  export let yKey = "population_name";
  export let startingHeight;

  export let opacity = 0.7;
  export let strokeColor;
  export let strokeWidth;
  export let roughness = 0.5;
  export let bowing = 3.7;
  export let hachureGap = 1;
  export let fillWeight = 1.5;
  export let fillStyle = "hach";

  import rough from "roughjs";
  import gsap from "gsap";
  import { writable, get } from "svelte/store";
  import { getContext, onMount, setContext } from "svelte";
  import { scaleCanvas } from "layercake";

  import { findClosestPoint, isEqualRect } from "$lib/utility";
  const { data, width, height, xScale, yScale, zScale, flatData } =
    getContext("LayerCake");
  const { ctx } = getContext("canvas");
  let rectangles = [];

  let roughCanvas;
  $: if (canvasElement) {
    roughCanvas = rough.canvas(canvasElement);

    canvasElement.addEventListener("mousemove", (e) => {
      const mouseX = e.offsetX;
      const mouseY = e.offsetY;
      const closestRect = findClosestPoint([mouseX, mouseY], rectangles);

     
    });
  }
  // handleMouseMove(e) {
  //   const hoveredRect = rectangles.find(rect =>
  //     x > rect.x && x < rect.x + rect.width &&
  //     y > rect.y && y < rect.y + rect.height
  //   );
  // }

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

  const animatedStore = createGSAPStore(
    get(data).map((comfortLevel) => {
      let key = comfortLevel.key;
      return comfortLevel.map((d) => {
        // this controls the initial position of the bars
        // aka, the intro animation's initial position
        let population_y_coord = $yScale.range([0, startingHeight])(
          d.data[yKey]
        );

        return [0, 0, population_y_coord, key];
      });
    }),
    {
      duration: 0.8,
      ease: "power2.inOut",
    }
  );
  $: dataset = $data.map((comfortLevel) => {
    let key = comfortLevel.key;

    return comfortLevel.map((d) => {
      let population_y_coord = $yScale(d.data[yKey]);

      return [...d, population_y_coord, key];
    });
  });
  $: animatedStore.animate(dataset);

  $: {
    if (ctx && canvasElement) {
      scaleCanvas($ctx, $width, $height);
      $ctx.clearRect(0, 0, $width, $height);
      $ctx.globalAlpha = `${opacity}`;
      $animatedStore.forEach((comfortLevel, i) => {
        // let comfortLevelName = comfortLevel.key;
        comfortLevel.forEach((d, j) => {
          // const y = $yScale(d.data[yKey]);
          const x = $xScale(d[0]) + gapSize / 2;
          const height = $yScale.bandwidth();

          const widthValue = $xScale(d[1]) - $xScale(d[0]);
          const adjustedGapSize = Math.min(gapSize, widthValue / 2);
          const width = widthValue - adjustedGapSize;

          // Retrieve the parent's data for the color
          // const parentData = /* logic to get parentData */;
          const fillColor = $zScale(d[3]);
          // // Draw the rectangle
          const stroke = strokeColor ?? fillColor;
          roughCanvas.rectangle(x, d[2], width, height, {
            roughness: `${roughness}`,
            fill: fillColor,
            stroke: `${stroke}`,
            strokeWidth: `${strokeWidth}`,
            hachureGap: `${hachureGap}`,
            hachureAngle: -30,
            fillWeight: `${fillWeight}`,
            fillStyle: `${fillStyle}`,
            bowing: `${bowing}`,
            disableMultiStroke: true,
            disableMultiStrokeFill: true,
            seed: 20,
          });

          // const newRect = { x, y, width, height, data: d };
          // if (!rectangles.some((rect) => isEqualRect(rect, newRect))) {
          //   rectangles.push(newRect);
          // }
        });
      });
    }
  }
</script>
