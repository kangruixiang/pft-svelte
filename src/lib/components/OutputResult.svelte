<script>
  import { data } from "$lib/check.svelte";
  let { result = $bindable(), signature, flow, effort } = $props();
</script>

<div
  bind:this={result}
  class="p-4 border-2 border-dashed rounded-sm bg-zinc-100 border-zinc-800"
>
  <p>
    EFFORT: <br />
    {#if data.spirometryResult}
      {data.Grade.Statement} <br />
    {/if}
    {effort}
  </p>

  <p>
    SPIROMETRY: <br />
    {data.spirometryResult} <br />
    {data.bronchResult}
  </p>
  <p>
    FLOW VOLUME LOOPS: <br />
    {flow}
  </p>
  {#if data.volumeResult}
    <p>
      LUNG VOLUMES: <br />
      {data.volumeResult} <br />
      {data.airTrappingResult}
    </p>
  {/if}

  {#if data.diffusingResult}
    <p>
      DIFFUSING CAPACITY: <br />
      {data.diffusingCorrectResult}<br />
      {data.diffusingResult}
    </p>
  {/if}

  <p>
    CONCLUSION: <br />
    {#if data.spirometryResult}
      {data.Grade.Statement} <br />
    {/if}
    {#if data.spirometrySum}
      {data.spirometrySum}
    {/if}
    {#if data.volumeSum}
      {data.volumeSum}
    {/if}
    {#if data.diffusingSum}
      {data.diffusingSum}
    {:else}
      .
    {/if}
    <br />
    {#if data.bronchSum}
      {data.bronchSum}
    {/if}
  </p>

  <p>
    Initial review by {signature || ""}.
  </p>
</div>
