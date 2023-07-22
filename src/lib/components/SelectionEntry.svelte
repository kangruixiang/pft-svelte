<script>
  export let prompt, promptSelection;
</script>

<label
  ><slot name="name" class="label" />
  <select
    name=""
    id=""
    on:change
    bind:value={promptSelection}
    class="selection-box"
  >
    {#each Object.entries(prompt) as [key, item]}
      <option value={item}>{item}</option>
    {/each}
  </select>
</label>
