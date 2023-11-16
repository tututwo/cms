<script>
  import Icon from '@iconify/svelte';
</script>

<div>
  <div class="buttons-group">
    <button class="selected">TCC </button>
    <button class="">No TCC </button>
  </div>
  <p class="toggle-note svelte-xrgi6q"><Icon icon="streamline:one-finger-tap-solid" style="display:inline"/> Toggle between Transportation + Child Care</p>
</div>

<style>
  .buttons-group {
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 180px;
    height: 70px
  }
  .selected {
    background-color: black;
    color: white;
    font-weight: 700;
  }
  button {
    --color-gray-200: #efefef;
    --color-green-100: #f0f7f5;
    --color-green-800: #07593b;
    quotes: "“" "”" "‘" "’";
    -webkit-font-smoothing: antialiased;
    --colour-life-exp: #8a71d0;
    --colour-healthy-life-exp: #6da9a1;
    --colour-neg-retirement: #e46b96;
    margin: 0;
    padding: 0;
    font-family: "BWHaasDingbat", "BWHaasText", "Helvetica Neue", Helvetica,
      Arial, sans-serif;
    font-size: 15px;
    border: solid 1px black;
    background-color: white;
    display: grid;
    align-items: center;
    justify-content: center;
    padding-top: 3px;
    padding-bottom: 3px;
    cursor: pointer;
    font-weight: 400;
  }
  p{
    --color-gray-200: #EFEFEF;
    --color-green-100: #F0F7F5;
    --color-green-800: #07593B;
    quotes: "“" "”" "‘" "’";
    text-rendering: optimizeLegibility;
    line-height: 1.558;
    -webkit-font-smoothing: antialiased;
    --colour-life-exp: #8A71D0;
    --colour-healthy-life-exp: #6DA9A1;
    --colour-neg-retirement: #e46b96;
    margin: 0;
    padding: 0;
    font-family: "BWHaasDingbat", "BWHaasText", "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 14px;
    color: #999999;
    margin-top: 10px;
    text-align: start;
    max-width: 200px;
  }
</style>
