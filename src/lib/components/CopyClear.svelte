<script lang="ts">
  export let inputText: string, result;

  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  function clearTextInput() {
    dispatch("clearText", inputText);
  }

  async function copy() {
    await navigator.clipboard.writeText(
      result.innerText.replace(/\n\n\n/g, "\n\n").replace(/\n/g, "\r\n")
    );
  }
</script>

<div class="flex space-x-2 lg:justify-end">
  <button
    class="btn w-1/2 bg-[#82b6ba] active:bg-[#77b2b6] shadow-[0px_2px_0px_0px_black,inset_0px_1px_0px_0px_#abcacd] active:shadow-[inset_0px_1px_0px_0px_black]"
    on:click={copy}>Copy</button
  >
  <button
    class="btn w-1/2 shadow-[0px_2px_0px_0px_black,inset_0px_1px_0px_0px_#abcacd] active:shadow-[inset_0px_1px_0px_0px_black]"
    on:click={clearTextInput}>Clear</button
  >
</div>
