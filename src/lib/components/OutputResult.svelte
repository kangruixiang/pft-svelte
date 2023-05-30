<script>
  export let result,
    effort,
    spirometry,
    bronch,
    flow,
    TLC,
    volume,
    airTrapping,
    DLCOunc,
    diffusing,
    diffusingCorrect,
    signature,
    conclusion;
</script>

<div
  bind:this={result}
  class="p-4 border-2 border-dashed rounded-sm bg-zinc-100 border-zinc-800"
>
  <p>
    EFFORT: <br />
    {effort}
  </p>
  <p>
    SPIROMETRY: <br />
    {spirometry.result} <br />
    {bronch.result}
  </p>
  <p>
    FLOW VOLUME LOOPS: <br />
    {flow}
  </p>
  {#if TLC}
    {#if TLC.Pre}
      <p>
        LUNG VOLUMES: <br />
        {volume.result} <br />
        {airTrapping.result}
      </p>
    {/if}
  {/if}
  {#if DLCOunc}
    {#if DLCOunc.Pre}
      <p>
        DIFFUSING CAPACITY: <br />
        {diffusingCorrect.result}<br />
        {diffusing.result}
      </p>
    {/if}
  {/if}

  {#if conclusion}
    <p>
      CONCLUSION: <br />
      {conclusion}
    </p>
  {/if}
  <p>
    Initial review by {signature || ""}
  </p>
</div>
