<script>
  import * as d3 from "d3";

  let data = "";
  let formattedData = "";
  let FEV1, FVC, FEVFVC, TLC, RV, RVTLC, DLCOunc, DLCOcor;

  let spirometries = [
    { id: 1, text: `Where did you go to school?` },
    { id: 2, text: `What is your mother's name?` },
    {
      id: 3,
      text: `What is another personal fact that an attacker could easily find with Google?`,
    },
  ];

  let selected;

  $: console.log(selected);

  let flowLoop = "this is flow loop";

  $: console.log(formattedData);

  function setVariables() {
    formattedData = data.replace(/^\s*\n/gm, "");
    formattedData = d3.tsvParse(formattedData);
    FEV1 = formattedData.find((item) => item.Variable === "FEV1");
    FVC = formattedData.find((item) => item.Variable === "FVC");
    FEVFVC = formattedData.find((item) => item.Variable === "FEV1/FVC");
    TLC = formattedData.find((item) => item.Variable === "TLC (Pleth)");
    RV = formattedData.find((item) => item.Variable === "RV (Pleth)");
    RVTLC = formattedData.find((item) => item.Variable === "RV/TLC (Pleth)");
    DLCOunc = formattedData.find((item) => item.Variable === "DLCOunc");
    DLCOcor = formattedData.find((item) => item.Variable === "DLCOcor");

    FEV1 = {
      Pre: parseFloat(FEV1.Pre),
      LLN: parseFloat(FEV1.LLN),
      Perc: parseFloat(FEV1["% Pred-Pre"]),
    };
    FVC = {
      Pre: parseFloat(FVC.Pre),
      LLN: parseFloat(FVC.LLN),
      Perc: parseFloat(FVC["% Pred-Pre"]),
    };
    FEVFVC = {
      Pre: parseFloat(FEVFVC.Pre),
      LLN: parseFloat(FEVFVC.LLN),
      Perc: parseFloat(FEVFVC["% Pred-Pre"]),
    };
    TLC = {
      Pre: parseFloat(TLC.Pre),
      LLN: parseFloat(TLC.LLN),
      Perc: parseFloat(TLC["% Pred-Pre"]),
    };
    RV = {
      Pre: parseFloat(RV.Pre),
      LLN: parseFloat(RV.LLN),
      Perc: parseFloat(RV["% Pred-Pre"]),
    };
    RVTLC = {
      Pre: parseFloat(RVTLC.Pre),
      LLN: parseFloat(RVTLC.LLN),
      Perc: parseFloat(RVTLC["% Pred-Pre"]),
    };
    DLCOunc = {
      Pre: parseFloat(DLCOunc.Pre),
      LLN: parseFloat(DLCOunc.LLN),
      Perc: parseFloat(DLCOunc["% Pred-Pre"]),
    };
    DLCOcor = {
      Pre: parseFloat(DLCOcor.Pre),
      LLN: parseFloat(DLCOcor.LLN),
      Perc: parseFloat(DLCOcor["% Pred-Pre"]),
    };
  }
</script>

<textarea
  class="w-full h-80"
  type="text"
  on:change={setVariables}
  bind:value={data}
/>

{#if FEV1}
  FEV1: {FEV1.LLN}, {FEV1.Pre}, {FEV1.Perc}
  FEV1: {FVC.LLN}, {FVC.Pre}, {FVC.Perc}
  FEV1: {FEVFVC.LLN}, {FEVFVC.Pre}, {FEVFVC.Perc}
  FEV1: {TLC.LLN}, {TLC.Pre}, {TLC.Perc}
  FEV1: {RV.LLN}, {RV.Pre}, {RV.Perc}
{/if}

<label for="spirometry">Spirometry:</label>
<select class=".select" name="spirometry" id="" bind:value={selected}>
  {#each spirometries as question}
    <option value={question}>{question.text}</option>
  {/each}
</select>

<div class="border-2 p-4 mt-12 border-stone-800 rounded-md  ">
  <p>
    EFFORT: <br />
    {#if selected}
      {selected.text}
    {/if}
  </p>

  <p>
    SPIROMETRY: <br />
    {#if selected}
      {selected.text}
    {/if}
  </p>

  <p>
    FLOW LOOP: <br />
    {flowLoop}
  </p>

  <p>
    CONCLUSION: <br />
    {flowLoop}
  </p>
</div>
