<script>
  let { children, prompt, promptSelection = $bindable(), ...others } = $props();
</script>

<div>
  <label>{@render children()}</label>
<select bind:value={promptSelection} {...others} class="focus:outline-none focus:bg-white w-full block  focus:border-zinc-800 border-zinc-500 border-2 border-solid bg-zinc-50 text-zinc-800 rounded-md  py-3 px-2 outline-none focus:ring-0">
  {#each Object.entries(prompt) as [key, item]}
    <option value={item}>{item}</option>
  {/each}
</select>
</div>