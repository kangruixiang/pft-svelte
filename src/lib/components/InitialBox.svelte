<script>
  export let signature;
</script>

<div>
  <label for="initial" class="label w-full">
    Initial review by
    <input type="text" class="w-full input-text" bind:value={signature} />
  </label>
</div>
