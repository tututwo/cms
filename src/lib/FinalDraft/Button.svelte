<script>
  export let data
  import Toggle from "./FilterUI/Toggle.svelte";
  const buttonsOne = ["all_fips", "all_morgage", "rentStocks", "morgageStocks"];
  const colorMap = {
    all_fips: "#595959",
    all_morgage: "#66c2a4",
    rentStocks: "#8c96c6",
    morgageStocks: "#fc8d59",
  };

  let activeMetric;

  function setActive(metric) {
    activeMetric = metric;
  }

  data.set(1)
  
</script>

<div class="flex justify-between mr-[5%]">
  <div>
    <span class="sort  font-thin text-[2rem]">RENT VS BUY</span>

    <div class="inline-flex">
      {#each buttonsOne as button}
        <label>
          <input
            type="radio"
            name="viz-sort"
            data-metric="open_score"
            aria-label={button}
            bind:group={activeMetric}
            value={button}
          />
          <span
            class="button open_score"
            class:active={activeMetric === button}
            data-metric={button}
            aria-hidden="true"
            style="background-color: {activeMetric === button
              ? colorMap[button]
              : 'initial'}"
          >
            {button}
          </span>
        </label>
      {/each}
    </div>
  </div>

  <Toggle />
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
    font: 1.5rem/1.4 "DecimaMonoPro", monospace;
    text-transform: uppercase;
    color: #222;
    cursor: pointer;
    padding: 10px;
    text-shadow: none;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    height: 70px;
    margin: 0 3px;
  }
  span.button.active {
    text-align: right;
    box-sizing: inherit;
    vertical-align: baseline;
    border-radius: 5px;
    border: 1px solid #555;
    transition: background-color 0.2s ease-in-out;
    font: 1.5rem/1.4 "DecimaMonoPro", monospace;
    text-transform: uppercase;
    color: #222;
    cursor: pointer;
    padding: 10px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    height: 70px;
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
