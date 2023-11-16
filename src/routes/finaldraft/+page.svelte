<script>
  import { writable } from "svelte/store";

  import Button from "$lib/FinalDraft/Button.svelte";
  import CaliforniaMap from "$lib/FinalDraft/CaliforniaMap.svelte";
  import RoughStackedBar from "$lib/FinalDraft/RoughStackedBar.svelte";

  import California from "$lib/data/california-counties.json";
  import rawData from "$lib/data/data.csv";

  const data = writable(rawData);
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
    <Button
      {data}
      buttonsOne={["all_fips", "all_morgage", "rentStocks", "morgageStocks"]}
    />
  </aside>
  <div class="col-span-1 row-span-4">
    <CaliforniaMap data={California} />
  </div>
  <div class="col-span-2 row-span-4">
    <RoughStackedBar {data} />
  </div>
</div>
