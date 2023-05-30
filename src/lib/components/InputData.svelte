<script lang="ts">
  export let inputText;

  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  function changeTextInput() {
    dispatch("textInput", inputText);
  }
</script>

<textarea
  class="w-full border-2 rounded-sm px-2 py-3 focus:outline-none border-zinc-500 focus:border-[#7c5f00]"
  placeholder="Copy and paste PFT data from Breeze here, including the header row"
  on:change={changeTextInput}
  bind:value={inputText}
/>
