<script>
  // @ts-nocheck

  import { data } from "$lib/data/data";
  import { descending, ascending } from "d3-array";
  export let sortButtons, colors;
  const colorMap = {};
  sortButtons.forEach((key, index) => {
    colorMap[key] = colors[index];
  });

  let activeMetric = "prop_difficult";

  $: data.set(
    $data.sort((a, b) => descending(+a[activeMetric], +b[activeMetric]))
  );

</script>

<div class="text-left">
  <p class="uppercase font-light lg:inline-flex lg:text-[#a3a3a3]">
    Sort chart:
  </p>
  <div class="buttons-cont lg:inline-flex">
    {#each sortButtons as button}
      <label class="mb-2">
        <input
          type="radio"
          name="viz-sort"
          data-metric="open_score"
          aria-label={button}
          bind:group={activeMetric}
          value={button}
        />
        <span
          class="button text-[11px]"
          class:active={activeMetric === button}
          data-metric={button}
          aria-hidden="true"
          style="background-color: {activeMetric === button
            ? colorMap[button]
            : 'initial'}; margin-bottom:8px"
        >
          {button}
        </span>
      </label>
    {/each}
  </div>
</div>

<style>
  input[type="radio"] {
    position: absolute;
    opacity: 0;
  }

  span.button {
    text-align: right;
    box-sizing: inherit;
    vertical-align: baseline;
    border-radius: 5px;
    border: 1px solid #555;
    transition: background-color 0.2s ease-in-out;
    font: 0.95rem/1.4 "DecimaMonoPro", monospace;
    text-transform: uppercase;
    color: #222;
    cursor: pointer;
    padding: 10px;
    text-shadow: none;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    margin: 0 3px;
  }
  span.button.active {
    margin-bottom: 18px;
    text-align: right;
    box-sizing: inherit;
    vertical-align: baseline;
    border-radius: 5px;
    border: 1px solid #555;
    transition: background-color 0.2s ease-in-out;
    font: 0.95rem/1.4 "DecimaMonoPro", monospace;
    text-transform: uppercase;
    color: #222;
    cursor: pointer;
    padding: 10px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    margin: 0 3px;
    font-weight: 700;
    text-shadow: -1px -1px 0 #fff, -1px -0.5px 0 #fff, -1px 0 1px #fff,
      -1px 0.5px 0 #fff, -1px 1px 0 #fff, -0.5px -1px 0 #fff,
      -0.5px -0.5px 0 #fff, -0.5px 0 1px #fff, -0.5px 0.5px 0 #fff,
      -0.5px 1px 0 #fff, 0 -1px 1px #fff, 0 -0.5px 1px #fff, 0 0.5px 1px #fff,
      0 1px 1px #fff, 0.5px -1px 0 #fff, 0.5px -0.5px 0 #fff, 0.5px 0 1px #fff,
      0.5px 0.5px 0 #fff, 0.5px 1px 0 #fff, 1px -1px 0 #fff, 1px -0.5px 0 #fff,
      1px 0 1px #fff, 1px 0.5px 0 #fff, 1px 1px 0 #fff;
  }
</style>
