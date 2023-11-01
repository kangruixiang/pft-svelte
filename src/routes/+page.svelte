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
    spirometryRestricted,
  } from "$lib/prompts";
  import {
    checkVolume,
    checkTrapping,
    checkBronchodilator,
    checkDLCO,
    checkSpirometry,
  } from "$lib/check";
  import type { Volume, Prompt } from "$lib/global";

  interface Grade {
    Pre: string | null;
    Post: string | null;
    Statement: string | null;
  }

  let FEV1: Volume,
    FVC: Volume,
    FEVFVC: Volume,
    FRC: Volume,
    TLC: Volume,
    RV: Volume,
    RVTLC: Volume,
    DLCOunc: Volume,
    DLCOcor: Volume,
    VA: Volume,
    DLVA: Volume,
    conclusion: string;

  let Grade: Grade;

  import type DSVRowArray from "d3";

  let inputText: string, formattedData: DSVRowArray.DSVRowArray;

  function setVariables() {
    if (!inputText) {
      console.log("No input");
      return;
    }
    const replaceInput = inputText.replace(/^\s*\n/gm, "");
    formattedData = tsvParse(replaceInput);
    const FEV1Raw = formattedData.find((item) => item.Variable === "FEV1");
    const FVCRaw = formattedData.find((item) => item.Variable === "FVC");
    const FEVFVCRaw = formattedData.find(
      (item) => item.Variable === "FEV1/FVC"
    );
    const FRCRaw =
      formattedData.find(
        (item) =>
          item.Variable === "FRC (Pleth)" || item.Variable === "FRC (N2)"
      ) || "";
    const TLCRaw =
      formattedData.find((item) => item.Variable === "TLC (Pleth)") || "";
    const TLC2Raw =
      formattedData.find((item) => item.Variable === "TLC (N2)") || "";
    const RVRaw =
      formattedData.find((item) => item.Variable === "RV (Pleth)") ?? "";
    const RV2Raw =
      formattedData.find((item) => item.Variable === "RV (N2)") ?? "";
    const RVTLCRaw =
      formattedData.find((item) => item.Variable === "RV/TLC (Pleth)") ?? "";
    const RVTLC2Raw =
      formattedData.find((item) => item.Variable === "RV/TLC (N2)") ?? "";
    const DLCOuncRaw =
      formattedData.find((item) => item.Variable === "DLCOunc") || "";
    const DLCOcorRaw =
      formattedData.find((item) => item.Variable === "DLCOcor") || "";
    const VARaw = formattedData.find((item) => item.Variable === "VA") || "";
    const DLVARaw = formattedData.find((item) => item.Variable === "Kco") || "";
    const GradeRaw = formattedData.find(
      (item) => item.Variable === "Test Grade (ATS - FVC, FEV1)"
    );

    Grade = {
      Pre: GradeRaw["Pre"] || null,
      Post: GradeRaw["Post"] || null,
      Statement:
        GradeRaw.Post == null || GradeRaw["Pre"] == GradeRaw["Post"]
          ? `Grade ${GradeRaw["Pre"]} study.`
          : `Grade ${GradeRaw["Pre"]} prebronchodilation and grade ${GradeRaw["Post"]} postbronchodilation.`,
    };

    FEV1 = {
      Pre: parseFloat(FEV1Raw.Pre) || null,
      LLN: parseFloat(FEV1Raw.LLN) || null,
      Z: parseFloat(FEV1Raw["Z Score"]) || null,
      Perc: parseFloat(FEV1Raw["% Pred-Pre"]) || null,
      PostVol: parseFloat(FEV1Raw["Vol-Change-Post"]) || null,
      PostPerc: parseFloat(FEV1Raw["% Change-Post"]) || null,
      ZPost: parseFloat(FEV1Raw["Z Score-Post"]) || null,
    };

    FVC = {
      Pre: parseFloat(FVCRaw.Pre),
      LLN: parseFloat(FVCRaw.LLN),
      Z: parseFloat(FVCRaw["Z Score"]),
      Perc: parseFloat(FVCRaw["% Pred-Pre"]) || null,
      PostVol: parseFloat(FVCRaw["Vol-Change-Post"]) || null,
      PostPerc: parseFloat(FVCRaw["% Change-Post"]) || null,
      ZPost: parseFloat(FVCRaw["Z Score-Post"]) || null,
    };
    FEVFVC = {
      Pre: parseFloat(FEVFVCRaw.Pre),
      LLN: parseFloat(FEVFVCRaw.LLN),
      Z: parseFloat(FEVFVCRaw["Z Score"]),
      Perc: parseFloat(FEVFVCRaw["% Pred-Pre"]) || null,
      ZPost: parseFloat(FEVFVCRaw["Z Score-Post"]) || null,
    };
    FRC = {
      Pre: parseFloat(FRCRaw.Pre) || null,
      LLN: parseFloat(FRCRaw.LLN) || null,
      ULN: parseFloat(FRCRaw.ULN) || null,
      Z: parseFloat(FRCRaw["Z Score"]),
      Perc: parseFloat(FRCRaw["% Pred-Pre"]) || null,
    };
    TLC = {
      Pre: parseFloat(TLCRaw.Pre) || parseFloat(TLC2Raw.Pre) || null,
      LLN: parseFloat(TLCRaw.LLN) || parseFloat(TLC2Raw.LLN) || null,
      ULN: parseFloat(TLCRaw.ULN) || parseFloat(TLC2Raw.ULN) || null,
      Z:
        parseFloat(TLCRaw["Z Score"]) || parseFloat(TLC2Raw["Z Score"]) || null,
      Perc:
        parseFloat(TLCRaw["% Pred-Pre"]) ||
        parseFloat(TLC2Raw["% Pred-Pre"]) ||
        null,
    };
    RV = {
      Pre: parseFloat(RVRaw.Pre) || parseFloat(RV2Raw.Pre) || null,
      LLN: parseFloat(RVRaw.LLN) || parseFloat(RV2Raw.LLN) || null,
      ULN: parseFloat(RVRaw.ULN) || parseFloat(RV2Raw.ULN) || null,
      Z: parseFloat(RVRaw["Z Score"]) || parseFloat(RV2Raw["Z Score"]) || null,
      Perc:
        parseFloat(RVRaw["% Pred-Pre"]) ||
        parseFloat(RV2Raw["% Pred-Pre"]) ||
        null,
    };
    RVTLC = {
      Pre: parseFloat(RVTLCRaw.Pre) || parseFloat(RVTLC2Raw.Pre) || null,
      LLN: parseFloat(RVTLCRaw.LLN) || parseFloat(RVTLC2Raw.LLN) || null,
      ULN: parseFloat(RVTLCRaw.ULN) || parseFloat(RVTLC2Raw.ULN) || null,
      Z:
        parseFloat(RVTLCRaw["Z Score"]) ||
        parseFloat(RVTLC2Raw["Z Score"]) ||
        null,
      Perc:
        parseFloat(RVTLCRaw["% Pred-Pre"]) ||
        parseFloat(RVTLC2Raw["% Pred-Pre"]) ||
        null,
    };
    DLCOunc = {
      Pre: parseFloat(DLCOuncRaw.Pre) || null,
      LLN: parseFloat(DLCOuncRaw.LLN) || null,
      ULN: parseFloat(DLCOuncRaw.ULN) || null,
      Z: parseFloat(DLCOuncRaw["Z Score"]),
      Perc: parseFloat(DLCOuncRaw["% Pred-Pre"]) || null,
    };
    DLCOcor = {
      Pre: parseFloat(DLCOcorRaw.Pre) || null,
      LLN: parseFloat(DLCOcorRaw.LLN) || null,
      ULN: parseFloat(DLCOcorRaw.ULN) || null,
      Z: parseFloat(DLCOcorRaw["Z Score"]),
      Perc: parseFloat(DLCOcorRaw["% Pred-Pre"]) || null,
    };
    VA = {
      Pre: parseFloat(VARaw.Pre) || null,
      LLN: parseFloat(VARaw.LLN) || null,
      Z: parseFloat(VARaw["Z Score"]),
      Perc: parseFloat(VARaw["% Pred-Pre"]) || null,
    };
    DLVA = {
      Pre: parseFloat(DLVARaw.Pre) || null,
      LLN: parseFloat(DLVARaw.LLN) || null,
      ULN: parseFloat(DLVARaw.ULN) || null,
      Z: parseFloat(DLVARaw["Z Score"]),
      Perc: parseFloat(DLVARaw["% Pred-Pre"]) || null,
    };
    checkData();
  }

  let effort = qualityPrompt.default;
  let flow = flowPrompt.normal;
  let signature = "";

  function checkData() {
    // checks different parameters
    spirometry.result = checkSpirometry(
      FEVFVC,
      FEV1,
      FVC,
      TLC,
      RVTLC,
      spirometry,
      spirometryRestricted,
      mixedSum,
      possibleMixSum,
      volumeSimple,
      volumeComplex
    );
    volume.result = checkVolume(
      TLC,
      FEV1,
      FVC,
      RVTLC,
      volume,
      volumeSimple,
      volumeComplex,
      spirometry
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

    // if (possibleMixSum.summary || mixedSum.summary) {
    //   volume.summary = volume.default;
    //   spirometry.summary = spirometry.default;
    // }
  }

  function clearData() {
    inputText = "";
    effort = qualityPrompt.default;
    flow = flowPrompt.normal;
    spirometry.result = "";
    spirometry.summary = null;
    possibleMixSum.result = "";
    possibleMixSum.summary = null;
    mixedSum.result = "";
    mixedSum.summary = null;
    bronch.result = "";
    bronch.summary = null;
    volume.result = "";
    volume.summary = null;
    diffusing.result = "";
    diffusing.summary = null;
    diffusingCorrect.result = "";
    airTrapping.result = "";
    airTrapping.summary = null;
  }

  let result;
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
      {possibleMixSum}
      {mixedSum}
      {flowPrompt}
      {Grade}
      {diffusing}
      {diffusingCorrect}
      {signature}
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
