<script lang="ts">
let { children, checked = $bindable() } = $props()

</script>


<div>
  <input type="checkbox" bind:checked>
  <label for="">{@render children()}</label>
</div>