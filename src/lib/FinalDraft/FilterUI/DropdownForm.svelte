<script>
  export let dropdownMenuData;
  export let dropdownMenuTitle;
  export let selected;
</script>

<div class="w-1/4 m-0 p-0 mr-5">
  <div class="lg:text-lg text-[#555] uppercase mb-1 font-buttonHeader">{dropdownMenuTitle}</div>
  <form
    class="bg-color-[#fff] border-2 border-[#cdcdcd] flex items-center mr-0 mb-0 "
  >
    <select bind:value={selected}  class="lg:text-lg" id="filter-team" aria-labelledby="filter-team-label">
      {#each dropdownMenuData as dropdownItem}
        <option class="option" value={dropdownItem}>{dropdownItem}</option>
      {/each}
    </select>
  </form>
</div>

<style>
  #filter-team {
    background-image: url(data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgaGVpZ2h0PSI3cHgiIHdpZHRoPSIxMXB4IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMC45IDciPjxzdHlsZT4uc3Qwe2ZpbGw6Izk5OTk5OTt9PC9zdHlsZT48cGF0aCBjbGFzcz0ic3QwIiBkPSJNNS44IDYuOGMtLjIuMi0uNC4yLS43IDBsLTUtNWMtLjEtLjItLjEtLjQgMC0uNkwxLjIuMWMuMi0uMS40LS4xLjYgMGwzLjYgMy42TDkgLjFjLjItLjEuNC0uMS43LjFsMS4xIDEuMWMuMi4yLjIuNCAwIC42IDAgMC01IDUtNSA0Ljl6Ii8+PC9zdmc+);
    background-repeat: no-repeat;
    background-color: transparent;
    font-family: AtlasGrotesk, "Helvetica Neue", Helvetica, Arial, sans-serif;
    line-height: 1;
    border: none;
    border-radius: 0;
    -webkit-appearance: none;
    background-position: right;
    cursor: pointer;
    box-sizing: border-box;
    width: 100%;
    height: 40px;
    transition: 0.2s color ease-in-out;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    background-size: 14px;
   
  }
</style>
