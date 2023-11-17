<script>
  // @ts-nocheck

  import { onMount, onDestroy } from "svelte";
  import { annotate } from "rough-notation";
  import Icon from "@iconify/svelte";
  import FilterSection from "$lib/FinalDraft/FilterSection.svelte";

  import CaliforniaMap from "$lib/FinalDraft/CaliforniaMap.svelte";
  import RoughStackedBar from "$lib/FinalDraft/RoughStackedBar.svelte";

  import California from "$lib/data/california-counties.json";
  import data from "$lib/data/data.csv";
  data.forEach((d) => {
    d.prop_comfortable = +d.prop_comfortable;
    d.prop_difficult = +d.prop_difficult;
    d.prop_just = +d.prop_just;
    d.prop_okay = +d.prop_okay;
  });

  let selectedCounty = 1;
  function handleClick(e) {
    selectedCounty = +e.detail.props.COUNTYFP;
  }
  let mobileBreakpoint = 760;
  let containerWidth;

  let container;
  let annotation;
  onMount(() => {
    console.log(container);
    annotation = annotate(container, {
      type: "circle",
      color: "#50748A",
      padding: 10,

      strokeWidth:4
    });

    annotation.show(); // Automatically show the annotation on mount
  });
</script>

<!-- grid grid-cols-3 grid-rows-5 gap-8 h-screen w-full  -->
<div
  class="mt-12 w-full flex flex-col lg:flex-row gap-12"
  bind:clientWidth={containerWidth}
>
  <!-- Aside -->
  <div class="lg:flex flex-col lg:flex-aside">
    {#if containerWidth < mobileBreakpoint}
      <header class="font-bold text-center">Affordability For Whom ?</header>
    {:else}
      <header class="font-bold text-center lg:uppercase">
        <div class="lg:tracking-[0.35em] lg:text-[220%]">Affordability For</div>
        <div
          class="lg:font-bold lg:tracking-[0.68em] lg:text-[5rem]"
          bind:this={container}
        >
          Whom?
        </div>
      </header>
    {/if}

    <aside class="border-b-2 border-[#cdcdcd]">
      <div class="text-sm text-center leading-4 mb-4 lg:text-left lg:leading-6">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Esse
        doloremque voluptatum quibusdam ipsum cum mollitia deserunt amet tempora
        voluptatibus tenetur Lorem ipsum, dolor sit amet consectetur adipisicing
        elit. Esse doloremque voluptatum quibusdam ipsum cum mollitia deserunt
        amet tempora voluptatibus tenetur
      </div>
      <FilterSection rawData={data} {selectedCounty} />
    </aside>

    <!-- in small screen no map -->
    {#if containerWidth < mobileBreakpoint}
      <div>dropdown</div>
    {:else}
      <div class="lg:h-full">
        <h2 class="lg:text-3xl"><u>{selectedCounty}</u></h2>
        <CaliforniaMap
          mapData={California}
          rawData={data}
          on:mapClick={handleClick}
        />
        <p class="text-[#a3a3a3]">
          <span
            ><Icon
              icon="material-symbols:ads-click"
              rotate={1}
              style="display:inline; transform: translateY(-3px)"
            /></span
          >Click to view data from selected county
        </p>
      </div>
    {/if}
  </div>

  <!-- Chart -->
  <div class="h-[600px] lg:h-[1200px] lg:flex-chart lg:mt-[10px]">
    <RoughStackedBar />
  </div>
</div>
