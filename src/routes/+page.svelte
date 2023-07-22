<script lang="ts">
  import { tsvParse } from "d3";
  import {
    InputData,
    CopyClear,
    InitialBox,
    OutputResult,
    Selections,
    SelectionEntry,
  } from "$lib/components/index";
  import {
    qualityPrompt,
    spirometry,
    bronch,
    flowPrompt,
    volume,
    volumeSimple,
    volumeComplex,
    airTrapping,
    diffusing,
    diffusingCorrect,
    mixedSum,
    possibleMixSum,
  } from "$lib/prompts";
  import {
    checkVolume,
    checkTrapping,
    checkBronchodilator,
    checkDLCO,
    checkSpirometry,
  } from "$lib/check";
  import type { Volume, Prompt } from "$lib/global";

  let FEV1: Volume,
    FVC: Volume,
    FEVFVC: Volume,
    FRC: Volume,
    TLC: Volume,
    TLC2: Volume,
    RV: Volume,
    RV2: Volume,
    RVTLC: Volume,
    RVTLC2: Volume,
    DLCOunc: Volume,
    DLCOcor: Volume,
    VA: Volume,
    DLVA: Volume,
    conclusion: string;

  import type DSVRowArray from "d3";

  let inputText: string, formattedData: DSVRowArray.DSVRowArray;

  function setVariables() {
    if (!inputText) {
      console.log("No input");
      return;
    }
    const replaceInput = inputText.replace(/^\s*\n/gm, "");
    formattedData = tsvParse(replaceInput);
    FEV1 = formattedData.find((item) => item.Variable === "FEV1");
    FVC = formattedData.find((item) => item.Variable === "FVC");
    FEVFVC = formattedData.find((item) => item.Variable === "FEV1/FVC");
    FRC =
      formattedData.find(
        (item) =>
          item.Variable === "FRC (Pleth)" || item.Variable === "FRC (N2)"
      ) || "";
    TLC = formattedData.find((item) => item.Variable === "TLC (Pleth)") || "";
    TLC2 = formattedData.find((item) => item.Variable === "TLC (N2)") || "";
    RV = formattedData.find((item) => item.Variable === "RV (Pleth)") ?? "";
    RV2 = formattedData.find((item) => item.Variable === "RV (N2)") ?? "";
    RVTLC =
      formattedData.find((item) => item.Variable === "RV/TLC (Pleth)") ?? "";
    RVTLC2 =
      formattedData.find((item) => item.Variable === "RV/TLC (N2)") ?? "";
    DLCOunc = formattedData.find((item) => item.Variable === "DLCOunc") || "";
    DLCOcor = formattedData.find((item) => item.Variable === "DLCOcor") || "";
    VA = formattedData.find((item) => item.Variable === "VA") || "";
    DLVA = formattedData.find((item) => item.Variable === "Kco") || "";

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
      Pre: parseFloat(TLC.Pre) || parseFloat(TLC2.Pre) || NaN,
      LLN: parseFloat(TLC.LLN) || parseFloat(TLC2.LLN) || NaN,
      ULN: parseFloat(TLC.ULN) || parseFloat(TLC2.ULN) || NaN,
      Z: parseFloat(TLC["Z Score"]) || parseFloat(TLC2["Z Score"]) || NaN,
      Perc:
        parseFloat(TLC["% Pred-Pre"]) || parseFloat(TLC2["% Pred-Pre"]) || NaN,
    };
    RV = {
      Pre: parseFloat(RV.Pre) || parseFloat(RV2.Pre) || NaN,
      LLN: parseFloat(RV.LLN) || parseFloat(RV2.LLN) || NaN,
      ULN: parseFloat(RV.ULN) || parseFloat(RV2.ULN) || NaN,
      Z: parseFloat(RV["Z Score"]) || parseFloat(RV2["Z Score"]) || NaN,
      Perc:
        parseFloat(RV["% Pred-Pre"]) || parseFloat(RV2["% Pred-Pre"]) || NaN,
    };
    RVTLC = {
      Pre: parseFloat(RVTLC.Pre) || parseFloat(RVTLC2.Pre) || NaN,
      LLN: parseFloat(RVTLC.LLN) || parseFloat(RVTLC2.LLN) || NaN,
      ULN: parseFloat(RVTLC.ULN) || parseFloat(RVTLC2.ULN) || NaN,
      Z: parseFloat(RVTLC["Z Score"]) || parseFloat(RVTLC2["Z Score"]) || NaN,
      Perc:
        parseFloat(RVTLC["% Pred-Pre"]) ||
        parseFloat(RVTLC2["% Pred-Pre"]) ||
        NaN,
    };
    DLCOunc = {
      Pre: parseFloat(DLCOunc.Pre) || NaN,
      LLN: parseFloat(DLCOunc.LLN) || NaN,
      ULN: parseFloat(DLCOunc.ULN) || NaN,
      Z: parseFloat(DLCOunc["Z Score"]),
      Perc: parseFloat(DLCOunc["% Pred-Pre"]) || NaN,
    };
    DLCOcor = {
      Pre: parseFloat(DLCOcor.Pre) || NaN,
      LLN: parseFloat(DLCOcor.LLN) || NaN,
      ULN: parseFloat(DLCOcor.ULN) || NaN,
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
      ULN: parseFloat(DLVA.ULN) || NaN,
      Z: parseFloat(DLVA["Z Score"]),
      Perc: parseFloat(DLVA["% Pred-Pre"]) || NaN,
    };
    // console.log(TLC);
    checkData();
  }

  let effort = qualityPrompt.AE;
  let flow = flowPrompt.normal;
  let signature = "";

  function checkData() {
    // checks different parameters
    volume.result = checkVolume(
      TLC,
      FEV1,
      RVTLC,
      volume,
      volumeSimple,
      volumeComplex
    );
    airTrapping.result = checkTrapping(RVTLC, airTrapping);
    bronch.result = checkBronchodilator(FEV1, FVC, bronch);

    if (DLCOcor.Pre) {
      diffusingCorrect.result = diffusingCorrect.corrected;
      diffusing.result = checkDLCO(DLCOcor, VA, DLVA, diffusing);
    } else if (DLCOunc.Pre) {
      diffusingCorrect.result = diffusingCorrect.uncorrected;
      diffusing.result = checkDLCO(DLCOunc, VA, DLVA, diffusing);
    }

    spirometry.result = checkSpirometry(
      FEVFVC,
      FEV1,
      FVC,
      TLC,
      spirometry,
      mixedSum,
      possibleMixSum
    );

    if (possibleMixSum.summary || mixedSum.summary) {
      volume.summary = volume.default;
      spirometry.summary = spirometry.default;
    }
  }

  function clearData() {
    inputText = "";
    effort = qualityPrompt.AE;
    flow = flowPrompt.normal;
    spirometry.result = "";
    spirometry.summary = "";
    possibleMixSum.result = "";
    possibleMixSum.summary = "";
    mixedSum.result = "";
    mixedSum.summary = "";
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
  $: conclusion = `${effort == qualityPrompt.AE ? "" : effort} ${
    spirometry.summary
  } ${possibleMixSum.summary} ${mixedSum.summary} ${volume.summary} ${
    airTrapping.summary
  } ${bronch.summary} ${flow == flowPrompt.normal ? "" : flow} ${
    diffusing.summary
  }`;
</script>

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
      <SelectionEntry
        prompt={qualityPrompt}
        bind:promptSelection={effort}
        on:change={checkData}
        ><svelte:fragment slot="name">Effort</svelte:fragment></SelectionEntry
      >
      <SelectionEntry
        prompt={flowPrompt}
        bind:promptSelection={flow}
        on:change={checkData}
        ><svelte:fragment slot="name">Flow Volume Loop</svelte:fragment
        ></SelectionEntry
      >
    </Selections>
  </div>
</div>
