<script lang="ts">
  import { tsvParse } from "d3";
  import {
    InputData,
    CopyClear,
    InitialBox,
    OutputResult,
    Selections,
    SelectionEntry,
  } from "./lib/components/index.ts";
  import {
    qualityPrompt,
    spirometry,
    bronch,
    flowPrompt,
    volume,
    airTrapping,
    diffusing,
    diffusingCorrect,
  } from "./lib/prompts";
  import {
    checkVolume,
    checkTrapping,
    checkBronchodilator,
    checkDLCO,
    checkSpirometry,
  } from "./lib/check";

  let FEV1,
    FVC,
    FEVFVC,
    FRC,
    TLC,
    RV,
    RVTLC,
    DLCOunc,
    DLCOcor,
    VA,
    DLVA,
    conclusion;

  let inputText, formattedData;

  function setVariables() {
    if (!inputText) {
      console.log("No input");
      return;
    }
    formattedData = inputText.replace(/^\s*\n/gm, "");
    formattedData = tsvParse(formattedData);
    FEV1 = formattedData.find((item) => item.Variable === "FEV1");
    FVC = formattedData.find((item) => item.Variable === "FVC");
    FEVFVC = formattedData.find((item) => item.Variable === "FEV1/FVC");
    FRC =
      formattedData.find(
        (item) =>
          item.Variable === "FRC (Pleth)" || item.Variable === "FRC (N2)"
      ) || "";
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
    VA = formattedData.find((item) => item.Variable === "VA") || "";
    DLVA = formattedData.find((item) => item.Variable === "DL/VA") || "";

    FEV1 = {
      Pre: parseFloat(FEV1.Pre),
      LLN: parseFloat(FEV1.LLN),
      Z: parseFloat(FEV1["Z Score"]),
      Perc: parseFloat(FEV1["% Pred-Pre"]) || NaN,
      PostVol: parseFloat(FEV1["Vol-Change-Post"]) || NaN,
      PostPerc: parseFloat(FEV1["% Change-Post"]) || NaN,
      ZPost: parseFloat(FEV1["Z Score-Post"]) || NaN,
    };
    FVC = {
      Pre: parseFloat(FVC.Pre),
      LLN: parseFloat(FVC.LLN),
      Z: parseFloat(FVC["Z Score"]),
      Perc: parseFloat(FVC["% Pred-Pre"]) || NaN,
      PostVol: parseFloat(FVC["Vol-Change-Post"]) || NaN,
      PostPerc: parseFloat(FVC["% Change-Post"]) || NaN,
      ZPost: parseFloat(FVC["Z Score-Post"]) || NaN,
    };
    FEVFVC = {
      Pre: parseFloat(FEVFVC.Pre),
      LLN: parseFloat(FEVFVC.LLN),
      Z: parseFloat(FEVFVC["Z Score"]),
      Perc: parseFloat(FEVFVC["% Pred-Pre"]) || NaN,
      ZPost: parseFloat(FEVFVC["Z Score-Post"]) || NaN,
    };
    FRC = {
      Pre: parseFloat(FRC.Pre) || NaN,
      LLN: parseFloat(FRC.LLN) || NaN,
      ULN: parseFloat(FRC.ULN) || NaN,
      Z: parseFloat(FRC["Z Score"]),
      Perc: parseFloat(FRC["% Pred-Pre"]) || NaN,
    };
    TLC = {
      Pre: parseFloat(TLC.Pre) || NaN,
      LLN: parseFloat(TLC.LLN) || NaN,
      ULN: parseFloat(TLC.ULN) || NaN,
      Z: parseFloat(TLC["Z Score"]),
      Perc: parseFloat(TLC["% Pred-Pre"]) || NaN,
    };
    RV = {
      Pre: parseFloat(RV.Pre) || NaN,
      LLN: parseFloat(RV.LLN) || NaN,
      ULN: parseFloat(RV.ULN) || NaN,
      Z: parseFloat(RV["Z Score"]),
      Perc: parseFloat(RV["% Pred-Pre"]) || NaN,
    };
    RVTLC = {
      Pre: parseFloat(RVTLC.Pre) || NaN,
      LLN: parseFloat(RVTLC.LLN) || NaN,
      ULN: parseFloat(RVTLC.ULN) || NaN,
      Z: parseFloat(RVTLC["Z Score"]),
      Perc: parseFloat(RVTLC["% Pred-Pre"]) || NaN,
    };
    DLCOunc = {
      Pre: parseFloat(DLCOunc.Pre) || NaN,
      LLN: parseFloat(DLCOunc.LLN) || NaN,
      Z: parseFloat(DLCOunc["Z Score"]),
      Perc: parseFloat(DLCOunc["% Pred-Pre"]) || NaN,
    };
    DLCOcor = {
      Pre: parseFloat(DLCOcor.Pre) || NaN,
      LLN: parseFloat(DLCOcor.LLN) || NaN,
      Z: parseFloat(DLCOcor["Z Score"]),
      Perc: parseFloat(DLCOcor["% Pred-Pre"]) || NaN,
    };
    VA = {
      Pre: parseFloat(VA.Pre) || NaN,
      LLN: parseFloat(VA.LLN) || NaN,
      Z: parseFloat(VA["Z Score"]),
      Perc: parseFloat(VA["% Pred-Pre"]) || NaN,
    };
    DLVA = {
      Pre: parseFloat(DLVA.Pre) || NaN,
      LLN: parseFloat(DLVA.LLN) || NaN,
      Z: parseFloat(DLVA["Z Score"]),
      Perc: parseFloat(DLVA["% Pred-Pre"]) || NaN,
    };
    checkData();
  }

  let effort = qualityPrompt.AE;
  let flow = flowPrompt.normal;
  let signature = "";

  function checkData() {
    effort = qualityPrompt.AE;
    flow = flowPrompt.normal;

    // checks different parameters
    volume.result = checkVolume(TLC, FEV1, RVTLC, volume);
    airTrapping.result = checkTrapping(RVTLC, airTrapping);
    bronch.result = checkBronchodilator(FEV1, FVC, bronch);

    if (DLCOcor.Pre) {
      diffusingCorrect.result = diffusingCorrect.corrected;
      diffusing.result = checkDLCO(DLCOcor, VA, DLVA, diffusing);
    } else if (DLCOunc.Pre) {
      diffusingCorrect.result = diffusingCorrect.uncorrected;
      diffusing.result = checkDLCO(DLCOunc, VA, DLVA, diffusing);
    }

    spirometry.result = checkSpirometry(FEVFVC, FEV1, FVC, TLC, spirometry);

    conclusion = `${spirometry.summary} ${volume.summary} ${airTrapping.summary} ${bronch.summary} ${diffusing.summary}`;
  }

  function clearData() {
    inputText = "";
    effort = qualityPrompt.adequate;
    flow = flowPrompt.normal;
    spirometry.result = "";
    spirometry.summary = "";
    bronch.result = "";
    bronch.summary = "";
    volume.result = "";
    volume.summary = "";
    diffusing.result = "";
    diffusing.summary = "";
    diffusingCorrect.result = "";
    airTrapping.result = "";
    airTrapping.summary = "";
    conclusion = "";
  }

  let result;
</script>

<main class="flex items-center min-h-screen justify-center">
  <div
    class="container max-w-6xl mx-2 px-2 py-4 md:mx-4 md:p-12 md:my-12 rounded-lg lg:p-12 bg-zinc-100"
  >
    <h1>PFT Reader - Algorithmic Approach to Pulmonary Function Test</h1>
    <div class="grid lg:grid-cols-2 gap-4">
      <InputData bind:inputText />
      <button
        class="btn btn-primary w-full lg:order-3 order-3"
        on:click={setVariables}>Check</button
      >
      <div class="lg:order-5 order-2">
        <InitialBox bind:signature />
      </div>
      <div class="lg:order-4 order-4">
        <CopyClear {inputText} {result} on:clearText={clearData} />
      </div>

      <div class="lg:order-2 order-4">
        <OutputResult
          bind:result
          {effort}
          {spirometry}
          {bronch}
          {flow}
          {TLC}
          {volume}
          {airTrapping}
          {DLCOunc}
          {diffusing}
          {diffusingCorrect}
          {signature}
          {conclusion}
        />
      </div>
      <div class="lg:order-6 lg:col-span-2 order-6">
        <Selections>
          <SelectionEntry prompt={qualityPrompt} bind:promptSelection={effort}
            ><svelte:fragment slot="name">Effort</svelte:fragment
            ></SelectionEntry
          >
          <SelectionEntry prompt={flowPrompt} bind:promptSelection={flow}
            ><svelte:fragment slot="name">Flow Volume Loop</svelte:fragment
            ></SelectionEntry
          >
        </Selections>
      </div>
    </div>
  </div>
</main>
