<script lang="ts">
  import Button from "$lib/components/Button.svelte";
  import InputData from "$lib/components/InputData.svelte";
  import InitialBox from "$lib/components/InitialBox.svelte";
  import OutputResult from "$lib/components/OutputResult.svelte";
  import Selection from "$lib/components/Selection.svelte";
  import { data } from "$lib/check.svelte";
  import { qualityPrompt, flowPrompt } from "$lib/prompts";

  let inputText = $state("");
  let signature = $state("");
  let effort = $state("");
  let flow = $state("");
  let result = $state("");

  function checkData(inputText) {
    data.setVariables(inputText);
    data.checkData();
  }

  async function copy() {
    await navigator.clipboard.writeText(
      result.innerText
        .replace(/\n\n\n/g, "\n\n")
        .replace(/\n\n/g, "\n")
        .replace(/\n/g, "\r\n")
        .replace(/ ,/g, ",")
        .replace(/ ./g, ".")
    );
  }

  function clear() {
    data.clearData();
    inputText = "";
    effort = "Adequate effort, results reproducible.";
    flow = "Normal flow-volume loop.";
  }
</script>

<div class="grid lg:grid-cols-2 gap-4">
  <InputData bind:inputText />
  <Button onclick={() => checkData(inputText)}>Check</Button>
  <div class="lg:order-5 order-2">
    <InitialBox bind:signature />
  </div>
  <div class="lg:order-4 order-4">
    <div class="flex space-x-2 lg:justify-end">
      <Button variant="blue" onclick={copy}>Copy</Button>
      <Button variant="clear" onclick={clear}>Clear</Button>
    </div>
  </div>

  <div class="lg:order-2 order-4">
    <OutputResult bind:result {signature} {flow} {effort} />
  </div>
  <div class="lg:order-6 lg:col-span-2 order-6">
    <div class="grid w-full grid-cols-2 rounded-md gap-x-4">
      <Selection
        prompt={qualityPrompt}
        bind:promptSelection={effort}
        onchange={checkData}>Effort</Selection
      >
      <Selection
        prompt={flowPrompt}
        bind:promptSelection={flow}
        onchange={checkData}>Flow Volume Loop</Selection
      >
    </div>
  </div>
</div>
