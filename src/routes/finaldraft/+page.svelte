<script>
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


</script>

<div class="grid grid-cols-3 grid-rows-5 gap-8 h-screen w-full font">
  <header
    class="col-span-1 row-span-1 text-[5rem] font-header font-bold tracking-widest"
  >
    Affordability For WHOM?
  </header>
  <aside class="col-span-2 row-span-1 flex flex-col justify-between">
    <div class="text-xl font-thin tracking-widest">
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Esse doloremque
      voluptatum quibusdam ipsum cum mollitia deserunt amet tempora voluptatibus
      tenetur culpa quaerat aperiam, reiciendis quasi veritatis ipsam ad ea
      dolorum. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Esse
      doloremque voluptatum quibusdam ipsum cum mollitia deserunt amet tempora
      voluptatibus tenetur culpa quaerat aperiam, reiciendis quasi veritatis
      ipsam ad ea dolorum.
    </div>
    <FilterSection rawData={data} />
  </aside>
  <div class="col-span-1 row-span-4">
    <CaliforniaMap data={California} />
  </div>
  <div class="col-span-2 row-span-4">
    <RoughStackedBar />
  </div>
</div>
