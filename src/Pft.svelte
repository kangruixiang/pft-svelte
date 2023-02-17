<script>
  import * as d3 from "d3";

  let FEV1, FVC, FEVFVC, TLC, RV, RVTLC, DLCOunc, DLCOcor;
  let effort,
    spirometry,
    bronch,
    flow,
    volume,
    diffusing,
    diffusingCorrect,
    conclusion,
    hyper,
    signature;
  let inputText, formattedData;

  const effortPrompt = [
    "",
    "Adequate effort, results reproducible.",
    "Inadequate effort, results are not reproducible.",
    "FVC maneuver did not extend beyond 6 seconds.",
  ];
  const spirometryPrompt = [
    "",
    "Normal spirometry.",
    "Mild obstructive defect based on FEV1.",
    "Moderate obstructive defect based on FEV1. ",
    "Moderately severe obstructive defect based on FEV1. ",
    "Severe obstructive defect based on FEV1. ",
    "Very severe obstructive defect based on FEV1. ",
    "Vital capacity is reduced. This may be due to submaximal effort, air trapping, a restrictive ventilatory defect, or a nonspecific defect. Consider measurement of total lung capacity and postbronchodilator spirometry if clinically indicated. ",
    "Restrictive lung defect suggested on spirometry. Consider lung volume studies to confirm this. ",
    "Vital capacity is reduced. This may be due to submaximal effort, air trapping, a restrictive ventilatory defect, or a nonspecific defect.",
  ];
  const bronchPrompt = [
    "",
    "There is a significant response to bronchodilator inhalation based on FEV1 and FVC. ",
    "There is no significant response to bronchodilator inhalation; however, this does not preclude benefit from use of a bronchodilator.",
  ];
  const flowPrompt = [
    "",
    "Flow-volume loop does not suggest any fixed airway obstruction.",
    "Flow-volume loop is suggestive of a variable intrathoracic  obstruction. Consider direct airway inspection if clinically appropriate.",
    "Flow-volume loop is suggestive of a  variable extrathoracic  obstruction. Consider direct airway inspection if clinically appropriate.",
    "Flow-volume loop is suggestive of a  fixed obstruction. Consider direct airway inspection if clinically appropriate.",
  ];
  const volumePrompt = [
    "",
    "Normal lung volumes.",
    "Mild restrictive defect based on reduced TLC and FEV1.",
    "Moderate restrictive defect based on reduced TLC and FEV1.",
    "Moderately severe restrictive defect based on reduced TLC and FEV1.",
    "Severe restrictive defect based on reduced TLC and FEV1.",
    "Very severe restrictive defect based on reduced TLC and FEV1.",
  ];
  const hyperPrompt = [
    "",
    "Increased TLC indicates hyperinflation.",
    "Increased RV and RV/TLC indicates air trapping.",
  ];
  const diffusingPrompt = [
    "",
    "Normal diffusing capacity.",
    "Mild reduction in diffusing capacity.",
    "Moderate reduction in diffusing capacity.",
    "Severe reduction in diffusing capacity.",
    "Diffusing capacity is elevated.",
  ];
  const diffusingCorrectPrompt = [
    "",
    "The diffusing capacity is corrected using hemoglobin.",
    "The diffusing capacity is uncorrected.",
  ];
  const conclusionPrompt = [
    "",
    "Normal PFTs.",
    "Obstructive defect is indicated on this PFT.",
    "Restrictive defect is indicated on this PFT.",
    "Combined obstructive and restrictive defect is indicated on this PFT.",
    "No evidence of airflow obstruction or restrictive disease. Reduced FEV1 and FVC with normal lung volumes represent a non-specific pattern.",
    "Restrictive defect suggested by spirometry. Recommend lung volume studies to confirm this.",
    "Clinical correlation suggested.",
    "Normal spirometry.",
  ];

  function setVariables() {
    formattedData = inputText.replace(/^\s*\n/gm, "");
    formattedData = d3.tsvParse(formattedData);
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
    flow = flowPrompt[1];
    effort = effortPrompt[1];

    // checks total lung volumes
    if (TLC.Pre < TLC.LLN) {
      TLC.Perc > 70
        ? (volume = volumePrompt[2])
        : TLC.Perc > 60
        ? (volume = volumePrompt[3])
        : TLC.Perc > 50
        ? (volume = volumePrompt[4])
        : TLC.Perc > 35
        ? (volume = volumePrompt[5])
        : (volume = volumePrompt[6]);
    } else {
      volume = volumePrompt[1];
    }

    // checks hyperinflation
    if (RVTLC.Perc >= 120) {
      hyper = hyperPrompt[2];
    } else {
      hyper = hyperPrompt[0];
    }

    // checks bronchodilator response
    if (FEV1.PostVol) {
      console.log(FEV1);
      if (FEV1.PostVol >= 0.2 && FEV1.PostPerc >= 12) {
        bronch = bronchPrompt[1];
      } else if (FVC.PostVol >= 0.2 && FVC.PostPerc >= 12) {
        bronch = bronchPrompt[1];
      } else {
        bronch = bronchPrompt[2];
      }
    } else {
      bronch = "";
    }

    // checks DLCO
    if (DLCOcor.Pre) {
      diffusingCorrect = diffusingCorrectPrompt[1];
      DLCOcor.Perc > 110
        ? (diffusing = diffusingPrompt[5])
        : DLCOcor.Pre > DLCOcor.LLN
        ? (diffusing = diffusingPrompt[1])
        : DLCOcor.Perc > 60
        ? (diffusing = diffusingPrompt[2])
        : DLCOcor.Perc > 40
        ? (diffusing = diffusingPrompt[3])
        : (diffusing = diffusingPrompt[4]);
    } else if (DLCOunc.Pre) {
      diffusingCorrect = diffusingCorrectPrompt[2];
      DLCOunc.Perc > 110
        ? (diffusing = diffusingPrompt[5])
        : DLCOunc.Pre > DLCOunc.LLN
        ? (diffusing = diffusingPrompt[1])
        : DLCOunc.Perc > 60
        ? (diffusing = diffusingPrompt[2])
        : DLCOunc.Perc > 40
        ? (diffusing = diffusingPrompt[3])
        : (diffusing = diffusingPrompt[4]);
    } else {
      console.log("no dlco");
    }

    if (FEVFVC.Pre >= FEVFVC.LLN) {
      if (FVC.Pre >= FVC.LLN) {
        TLC.Pre
          ? (conclusion = conclusionPrompt[1])
          : (conclusion = conclusionPrompt[8]);
        spirometry = spirometryPrompt[1];
      } else {
        if (TLC.Pre >= TLC.LLN) {
          spirometry = spirometryPrompt[9];
          conclusion = conclusionPrompt[5];
        } else if (TLC.Pre < TLC.LLN) {
          spirometry = spirometryPrompt[9];
          conclusion = conclusionPrompt[3];
        } else {
          spirometry = spirometryPrompt[7];
          conclusion = conclusionPrompt[6];
        }
      }
    } else {
      FEV1.Perc > 70
        ? (spirometry = spirometryPrompt[2])
        : FEV1.Perc > 60
        ? (spirometry = spirometryPrompt[3])
        : FEV1.Perc > 50
        ? (spirometry = spirometryPrompt[4])
        : FEV1.Perc > 35
        ? (spirometry = spirometryPrompt[5])
        : (spirometry = spirometryPrompt[6]);
      if (FVC.Pre >= FVC.LLN) {
        conclusion = conclusionPrompt[2];
      } else if (TLC.Pre >= TLC.LLN) {
        conclusion = conclusionPrompt[2];
      } else if (TLC.Pre < TLC.LLN) {
        conclusion = conclusionPrompt[4];
      } else {
        conclusion = conclusionPrompt[2] + " " + conclusionPrompt[6];
      }
    }
  }

  function clearData() {
    inputText = "";
    spirometry = spirometryPrompt[0];
    bronch = bronchPrompt[0];
    volume = volumePrompt[0];
    diffusing = diffusingPrompt[0];
    diffusingCorrect = diffusingCorrectPrompt[0];
    conclusion = conclusionPrompt[0];
    hyper = hyperPrompt[0];
    effort = effortPrompt[0];
    flow = flowPrompt[0];
  }

  let result;

  async function copy() {
    // console.log(result.innerText);
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
    type="text"
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
        {#each effortPrompt as item}
          <option value={item}>{item}</option>
        {/each}
      </select>
    </label>
    <label for="spirometry" class="label"
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

    <label for="flow loop" class="label"
      >Flow volume loop
      <select bind:value={flow} class="selection-box">
        {#each flowPrompt as item}
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
    </label>
  </div>
</div>
