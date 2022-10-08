<script>
  let effortPrompt = [
    "Adequate effort, results reproducible.",
    "Inadequate effort, results are not reproducible.",
    "FVC maneuver did not extend beyond 6 seconds.",
  ];
  let spirometryPrompt = [
    "Normal spirometry.",
    "Mild obstructive defect based on FEV1.",
    "Moderate obstructive defect based on FEV1. ",
    "Moderately severe obstructive defect based on FEV1. ",
    "Severe obstructive defect based on FEV1. ",
    "Very severe obstructive defect based on FEV1. ",
    "Vital capacity is reduced. This may be due to submaximal effort, air trapping, a restrictive ventilatory defect, or a nonspecific defect. Consider measurement of total lung capacity and postbronchodilator spirometry if clinically indicated. ",
    "Restrictive lung defect suggested on spirometry. Consider lung volume studies to confirm this. ",
  ];
  let bronchoPrompt = [
    "",
    "There is a significant response to bronchodilator inhalation based on FEV1 and FVC. ",
    "There is no significant response to bronchodilator inhalation; however, this does not preclude benefit from use of a bronchodilator.",
  ];
  let flowPrompt = [
    "Flow-volume loop does not suggest any fixed airway obstruction.",
    "Flow-volume loop is suggestive of a variable intrathoracic  obstruction. Consider direct airway inspection if clinically appropriate.",
    "Flow-volume loop is suggestive of a  variable extrathoracic  obstruction. Consider direct airway inspection if clinically appropriate.",
    "Flow-volume loop is suggestive of a  fixed obstruction. Consider direct airway inspection if clinically appropriate.",
  ];
  let volumePrompt = [
    "Normal lung volumes.",
    "Mild restrictive defect based on reduced TLC and FEV1.",
    "Moderate restrictive defect based on reduced TLC and FEV1.",
    "Moderately severe restrictive defect based on reduced TLC and FEV1.",
    "Severe restrictive defect based on reduced TLC and FEV1.",
    "Very severe restrictive defect based on reduced TLC and FEV1.",
    "Increased TLC indicates hyperinflation.",
    "Increased RV and RV/TLC indicates air trapping.",
  ];
  let diffusingPrompt = [
    "Normal diffusing capacity.",
    "Mild reduction in diffusing capacity.",
    "Moderate reduction in diffusing capacity.",
    "Severe reduction in diffusing capacity.",
    "Diffusing capacity is elevated.",
  ];
  let diffusingCorrectPrompt = [
    "The diffusing capacity is corrected using hemoglobin.",
    "The diffusing capacity is uncorrected.",
  ];
  let conclusionPrompt = [
    "Normal PFTs.",
    "Obstructive defect is indicated on this PFT.",
    "Restrictive defect is indicated on this PFT.",
    "Combined obstructive and restrictive defect is indicated on this PFT.",
    "No evidence of airflow obstruction or restrictive disease. Reduced FEV1 and FVC with normal lung volumes represent a non-specific pattern.",
    "Restrictive defect suggested by spirometry. Recommend lung volume studies to confirm this.",
    "Clinical correlation suggested.",
  ];

  let effort,
    spirometry,
    bronch,
    flow,
    volume,
    diffusing,
    diffusingCorrect,
    conclusion;
  let inputText;
  $: inputText == 0
    ? (effort = [effortPrompt[0], effortPrompt[2]])
    : (effort = [effortPrompt[0]]);
</script>

<textarea bind:value={inputText} />
<div class="w-1/2">
  <h3>Efforts</h3>

  <select bind:value={effort}>
    {#each effortPrompt as item}
      <option value={item}>{item}</option>
    {/each}
  </select>

  <h3>Spirometry</h3>

  <select bind:value={spirometry}>
    {#each spirometryPrompt as item}
      <option value={item}>{item}</option>
    {/each}
  </select>

  <select bind:value={bronch}>
    {#each bronchoPrompt as item}
      <option value={item}>{item}</option>
    {/each}
  </select>

  <select bind:value={diffusing}>
    {#each diffusingPrompt as item}
      <option value={item}>{item}</option>
    {/each}
  </select>

  <select bind:value={diffusingCorrect}>
    {#each diffusingCorrectPrompt as item}
      <option value={item}>{item}</option>
    {/each}
  </select>

  <select bind:value={flow}>
    {#each flowPrompt as item}
      <option value={item}>{item}</option>
    {/each}
  </select>

  <select bind:value={volume}>
    {#each volumePrompt as item}
      <option value={item}>{item}</option>
    {/each}
  </select>
</div>

<div class="w-full p-4 border-2 border-solid border-stone-800">
  <p>
    EFFORTS: <br />
    {effort}
  </p>
  <p>
    SPIROMETRY: <br />
    {spirometry}
    {bronch}
  </p>
  <p>
    FLOW VOLUME LOOPS: <br />
    {flow}
  </p>
  <p>
    LUNG VOLUMES: <br />
    {volume}
  </p>
  <p>
    DIFFUSING CAPACITY: <br />
    {diffusing}
    {diffusingCorrect}
  </p>
  <p>
    CONCLUSION: <br />
  </p>
</div>
