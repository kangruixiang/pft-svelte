<script>
  import { greatestIndex } from "d3";

  export let result,
    effort,
    spirometry,
    bronch,
    flow,
    TLC,
    Grade,
    volume,
    airTrapping,
    DLCOunc,
    diffusing,
    diffusingCorrect,
    signature,
    possibleMixSum,
    mixedSum,
    flowPrompt;
</script>

<div
  bind:this={result}
  class="p-4 border-2 border-dashed rounded-sm bg-zinc-100 border-zinc-800"
>
  <p>
    EFFORT: <br />
    {#if Grade}
      {Grade.Statement} <br />
    {/if}
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

  <p>
    CONCLUSION: <br />
    {#if spirometry.summary}
      {spirometry.summary}<br />
    {/if}
    {#if flow !== flowPrompt.normal}
      {flow}<br />
    {/if}
    {#if possibleMixSum.summary}
      {possibleMixSum.summary}<br />
    {/if}
    {#if mixedSum.summary}
      {mixedSum.summary}<br />
    {/if}
    {#if volume.summary}
      {volume.summary}<br />
    {/if}
    {#if airTrapping.summary}
      {airTrapping.summary}<br />
    {/if}
    {#if bronch.summary}
      {bronch.summary}<br />
    {/if}
    {#if diffusing.summary}
      {diffusing.summary}<br />
    {/if}
  </p>

  <p>
    Initial review by {signature || ""}.
  </p>
</div>
