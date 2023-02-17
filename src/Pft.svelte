<script lang="ts">
  import { tsvParse } from "d3";
  import {
    effortPrompt,
    spirometryPrompt,
    bronchPrompt,
    flowPrompt,
    volumePrompt,
    hyperPrompt,
    diffusingPrompt,
    diffusingCorrectPrompt,
    conclusionPrompt,
  } from "./lib/prompts";
  import {
    checkVolume,
    checkHyperinflation,
    checkBronchodilator,
    checkDLCO,
    checkSpirometry,
    checkConclusion,
  } from "./lib/check";

  let FEV1, FVC, FEVFVC, TLC, RV, RVTLC, DLCOunc, DLCOcor;
  let effort = effortPrompt.adequate;
  let flow = flowPrompt.normal;
  let spirometry = spirometryPrompt.default;
  let bronch = bronchPrompt.default;
  let volume = volumePrompt.default;
  let diffusing = diffusingPrompt.default;
  let diffusingCorrect = diffusingCorrectPrompt.default;
  let hyper = hyperPrompt.default;
  let conclusion = conclusionPrompt.default;
  let signature = "";

  let inputText, formattedData;

  function setVariables() {
    formattedData = inputText.replace(/^\s*\n/gm, "");
    formattedData = tsvParse(formattedData);
    FEV1 = formattedData.find((item) => item.Variable === "FEV1");
    FVC = formattedData.find((item) => item.Variable === "FVC");
    FEVFVC = formattedData.find((item) => item.Variable === "FEV1/FVC");
    TLC =
      formattedData.find(
        (item) =>
          item.Variable === "TLC (Pleth)" || item.Variable === "TLC (N2)"
      ) || "";
    RV =
      formattedData.find(
        (item) => item.Variable === "RV (Pleth)" || item.Variable === "RV (N2)"
      ) || "";
    RVTLC =
      formattedData.find(
        (item) =>
          item.Variable === "RV/TLC (Pleth)" || item.Variable === "RV/TLC (N2)"
      ) || "";
    DLCOunc = formattedData.find((item) => item.Variable === "DLCOunc") || "";
    DLCOcor = formattedData.find((item) => item.Variable === "DLCOcor") || "";

    FEV1 = {
      Pre: parseFloat(FEV1.Pre),
      LLN: parseFloat(FEV1.LLN),
      Perc: parseFloat(FEV1["% Pred-Pre"]) || NaN,
      PostVol: parseFloat(FEV1["Vol-Change-Post"]) || NaN,
      PostPerc: parseFloat(FEV1["% Change-Post"]) || NaN,
    };
    FVC = {
      Pre: parseFloat(FVC.Pre),
      LLN: parseFloat(FVC.LLN),
      Perc: parseFloat(FVC["% Pred-Pre"]) || NaN,
      PostVol: parseFloat(FVC["Vol-Change-Post"]) || NaN,
      PostPerc: parseFloat(FVC["% Change-Post"]) || NaN,
    };
    FEVFVC = {
      Pre: parseFloat(FEVFVC.Pre),
      LLN: parseFloat(FEVFVC.LLN),
      Perc: parseFloat(FEVFVC["% Pred-Pre"]) || NaN,
    };
    TLC = {
      Pre: parseFloat(TLC.Pre) || NaN,
      LLN: parseFloat(TLC.LLN) || NaN,
      Perc: parseFloat(TLC["% Pred-Pre"]) || NaN,
    };
    RV = {
      Pre: parseFloat(RV.Pre) || NaN,
      LLN: parseFloat(RV.LLN) || NaN,
      Perc: parseFloat(RV["% Pred-Pre"]) || NaN,
    };
    RVTLC = {
      Pre: parseFloat(RVTLC.Pre) || NaN,
      LLN: parseFloat(RVTLC.LLN) || NaN,
      Perc: parseFloat(RVTLC["% Pred-Pre"]) || NaN,
    };
    DLCOunc = {
      Pre: parseFloat(DLCOunc.Pre) || NaN,
      LLN: parseFloat(DLCOunc.LLN) || NaN,
      Perc: parseFloat(DLCOunc["% Pred-Pre"]) || NaN,
    };
    DLCOcor = {
      Pre: parseFloat(DLCOcor.Pre) || NaN,
      LLN: parseFloat(DLCOcor.LLN) || NaN,
      Perc: parseFloat(DLCOcor["% Pred-Pre"]) || NaN,
    };
    checkData();
  }

  function checkData() {
    effort = effortPrompt.adequate;
    flow = flowPrompt.normal;
    // checks different parameters
    volume = checkVolume(TLC, volumePrompt);
    hyper = checkHyperinflation(RVTLC, FEVFVC, hyperPrompt);
    bronch = checkBronchodilator(FEV1, FVC, bronchPrompt);

    if (DLCOcor.Pre) {
      diffusingCorrect = diffusingCorrectPrompt.corrected;
      diffusing = checkDLCO(DLCOcor, diffusingPrompt);
    } else if (DLCOunc.Pre) {
      console.log(DLCOunc);
      diffusingCorrect = diffusingCorrectPrompt.uncorrected;
      diffusing = checkDLCO(DLCOunc, diffusingPrompt);
    }

    spirometry = checkSpirometry(FEVFVC, FEV1, FVC, TLC, spirometryPrompt);
    conclusion = checkConclusion(FEVFVC, FVC, TLC, conclusionPrompt);
  }

  function clearData() {
    inputText = "";
    spirometry = spirometryPrompt.default;
    bronch = bronchPrompt.default;
    volume = volumePrompt.default;
    diffusing = diffusingPrompt.default;
    diffusingCorrect = diffusingCorrectPrompt.default;
    conclusion = conclusionPrompt.default;
    hyper = hyperPrompt.default;
    effort = effortPrompt.default;
    flow = flowPrompt.default;
  }

  let result;

  async function copy() {
    await navigator.clipboard.writeText(
      result.innerText.replace(/\n\n\n/g, "\n\n").replace(/\n/g, "\r\n")
    );
  }
</script>

<div class="flex flex-col space-y-4">
  <details>
    <summary class="text-lg"> How to copy PFT data </summary>
    <p>
      Click on the first row and first column ("Variable") and drag across to
      the last column ("%Pred-Pre"). This will select all of the rows for the
      selected columns. Then use Ctrl+C to copy the data.
    </p>
    <img src="./src/assets/example.png" alt="" />
  </details>

  <textarea
    class="w-full border-2 rounded-md focus:border-zinc-800 focus:outline-none focus:ring-0 h-80 border-zinc-800"
    on:change={setVariables}
    bind:value={inputText}
    placeholder="Copy and paste PFT data from Breeze here, including the header row"
  />

  <div class="flex space-x-2">
    <button class="w-full btn btn-dark" on:click={setVariables}>Check</button>
    <button class="w-full btn" on:click={clearData}>Clear</button>
    <button class="w-full btn" on:click={copy}>Copy</button>
  </div>
  <div
    bind:this={result}
    class="w-full p-4 border-2 border-dashed rounded-md bg-zinc-100 border-zinc-800"
  >
    <p>
      EFFORT: <br />
      {effort}
    </p>
    <p>
      SPIROMETRY: <br />
      {spirometry} <br />
      {bronch}
    </p>
    <p>
      FLOW VOLUME LOOPS: <br />
      {flow}
    </p>
    {#if TLC}
      {#if TLC.Pre}
        <p>
          LUNG VOLUMES: <br />
          {volume} <br />
          {hyper || ""}
        </p>
      {/if}
    {/if}
    {#if DLCOunc}
      {#if DLCOunc.Pre}
        <p>
          DIFFUSING CAPACITY: <br />
          {diffusingCorrect}<br />
          {diffusing}
        </p>
      {/if}
    {/if}

    {#if conclusion}
      <p>
        CONCLUSION: <br />
        {conclusion} <br />
        {bronch}
      </p>
    {/if}
    <p>
      Initial review by {signature || ""}
    </p>
  </div>

  <div>
    <label for="initial" class="label">
      Initial review by
      <input type="text" class="w-full input-text" bind:value={signature} />
    </label>
  </div>

  <div class="grid w-full grid-cols-2 rounded-md gap-x-4">
    <label for="effort" class="label"
      >Effort
      <select bind:value={effort} class="selection-box">
        {#each Object.entries(effortPrompt) as [key, item]}
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

    <!-- <label for="spirometry" class="label"
      >Spirometry
      <select bind:value={spirometry} class="selection-box">
        {#each spirometryPrompt as item}
          <option value={item}>{item}</option>
        {/each}
      </select>
    </label>

    <label for="bronchodilator" class="label"
      >Bronchodilator response
      <select bind:value={bronch} class="selection-box">
        {#each bronchPrompt as item}
          <option value={item}>{item}</option>
        {/each}
      </select>
    </label>

    <label for="difussing capacity" class="label"
      >Diffusing capacity
      <select bind:value={diffusing} class="selection-box">
        {#each diffusingPrompt as item}
          <option value={item}>{item}</option>
        {/each}
      </select>
    </label>

    <label for="diffusing" class="label"
      >Diffusing correction
      <select bind:value={diffusingCorrect} class="selection-box">
        {#each diffusingCorrectPrompt as item}
          <option value={item}>{item}</option>
        {/each}
      </select>
    </label>

   
    <label for="volume" class="label"
      >Lung volume
      <select bind:value={volume} class="selection-box">
        {#each volumePrompt as item}
          <option value={item}>{item}</option>
        {/each}
      </select>
    </label>

    <label for="hyper" class="label"
      >Hyperinflation
      <select bind:value={hyper} class="selection-box">
        {#each hyperPrompt as item}
          <option value={item}>{item}</option>
        {/each}
      </select>
    </label> -->
  </div>
</div>
