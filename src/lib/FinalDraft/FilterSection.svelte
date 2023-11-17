<script>
  // @ts-nocheck

  // a store, which has an array of 4000 objects
  export let rawData, selectedCounty;
  import { data } from "$lib/data/data";

  import DropdownForm from "./FilterUI/DropdownForm.svelte";

  const forEachState = ["rentstock", "mortstock"];
  // an array of five items
  const housingTenure = Array.from(
    new Set(rawData.map((d) => d.housing_tenure))
  )
    .filter((item) => !forEachState.includes(item))
    .sort();
  // an array of two items, rentstock and mortstock
  const transportationChildcare = Array.from(
    new Set(rawData.map((d) => d.metric_type))
  );

  let selectedHousingGroup = "all_fips";
  let selectedMetricType = "TCC";

  $: filteredData = rawData
    .filter(
      (d) =>
        (selectedHousingGroup
          ? d.housing_tenure === selectedHousingGroup
          : true) &&
        (selectedMetricType ? d.metric_type === selectedMetricType : true)
    )
    // .filter(d => d.location === "1")
    .filter((d) => {
      if (!isNaN(selectedCounty) && !isNaN(+d.location)) {
        // Convert 'selectedCounty' to a number and compare with the 'location' property
        return +d.location === +selectedCounty;
      } else {
        // Handle the case where 'selectedCounty' is not valid (e.g., not a number)
        return false;
      }
    });
  $: data.set(filteredData);

  // $: console.log($data);
</script>

<div class="flex">
  <DropdownForm
    dropdownMenuData={housingTenure}
    dropdownMenuTitle={"Choose a housing group"}
    bind:selected={selectedHousingGroup}
  />
  <DropdownForm
    dropdownMenuData={transportationChildcare}
    dropdownMenuTitle={"With Child care"}
    bind:selected={selectedMetricType}
  />
</div>
