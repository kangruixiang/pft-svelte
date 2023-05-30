<script>
  export let effort,
    qualityPrompt,
    flow,
    flowPrompt,
    spirometry,
    spirometryPrompt,
    bronch,
    bronchPrompt,
    diffusing,
    diffusingPrompt,
    diffusingCorrect,
    diffusingCorrectPrompt,
    volume,
    volumePrompt,
    hyper,
    hyperPrompt;
</script>

<div class="grid w-full grid-cols-2 rounded-md gap-x-4">
  <label for="effort" class="label"
    >Effort
    <select bind:value={effort} class="selection-box">
      {#each Object.entries(qualityPrompt) as [key, item]}
        <option value={item}>{item}</option>
      {/each}
    </select>
  </label>

  <label for="flow loop" class="label"
    >Flow volume loop
    <select bind:value={flow} class="selection-box">
      {#each Object.entries(flowPrompt) as [key, item]}
        <option value={item}>{item}</option>
      {/each}
    </select>
  </label>

  <label for="spirometry" class="label"
    >Spirometry
    <select bind:value={spirometry} class="selection-box">
      {#each Object.entries(spirometryPrompt) as [key, item]}
        <option value={item}>{item}</option>
      {/each}
    </select>
  </label>

  <label for="bronchodilator" class="label"
    >Bronchodilator response
    <select bind:value={bronch} class="selection-box">
      {#each Object.entries(bronchPrompt) as [key, item]}
        <option value={item}>{item}</option>
      {/each}
    </select>
  </label>

  <label for="difussing capacity" class="label"
    >Diffusing capacity
    <select bind:value={diffusing} class="selection-box">
      {#each Object.entries(diffusingPrompt) as [key, item]}
        <option value={item}>{item}</option>
      {/each}
    </select>
  </label>

  <label for="diffusing" class="label"
    >Diffusing correction
    <select bind:value={diffusingCorrect} class="selection-box">
      {#each Object.entries(diffusingCorrectPrompt) as [key, item]}
        <option value={item}>{item}</option>
      {/each}
    </select>
  </label>

  <label for="volume" class="label"
    >Lung volume
    <select bind:value={volume} class="selection-box">
      {#each Object.entries(volumePrompt) as [key, item]}
        <option value={item}>{item}</option>
      {/each}
    </select>
  </label>

  <label for="hyper" class="label"
    >Hyperinflation
    <select bind:value={hyper} class="selection-box">
      {#each Object.entries(hyperPrompt) as [key, item]}
        <option value={item}>{item}</option>
      {/each}
    </select>
  </label>
</div>
