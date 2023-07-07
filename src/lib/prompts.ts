
export const qualityPrompt = {
  default: "",
  AE: "Grade A-E.",
  U: "Grade-U (Usable, but not acceptable).",
  adequate: "Adequate effort, results reproducible.",
  inadequate: "Inadequate effort, results are not reproducible.",
  short: "FVC maneuver did not extend beyond 6 seconds.",
  notTrue: "Results may not reflect the true lung function."
};

export const flowPrompt = {
  default: "",
  normal: "Normal flow-volume loop.",
  obstruction: "Flow-volume loop suggests obstruction.",
  restriction: "Flow-volume loop suggests restriction.",
  mixed: "Flow-volume loop suggests a mixed disorder.",
  intrathoracic:
    "Flow-volume loop suggests variable intrathoracic obstruction.",
  extrathoracic:
    "Flow-volume loop suggests variable extra thoracic obstruction.",
  fixed:
    "Flow-volume loop suggests fixed large/central airway obstruction.",
  unilateral:
    "Flow-volume loop suggests unilateral main stem bronchial obstruction.",
};

export const spirometry = {
  default: "",
  normal: "Normal spirometry.",
  mild: "Mild obstructive defect based on FEV1 (Z-score -2.5 or higher).",
  moderate: "Moderate obstructive defect based on FEV1 (Z-score -2.5 to -4).",
  severe: "Severe obstructive defect based on FEV1 (Z-score less than -4).",
  restrictedMaybe:
    "Possible restriction or non-specific pattern is present (PRISM). Consider measurement of lung volumes.",
  nonspecific: "Non-specific pattern is seen (FEV1 and FVC reduced. Normal FEV1/FVC ratio and TLC).",
  restricted:
    "Restrictive lung defect suggested on spirometry based on lung volumes.",
  mixed: "Possible mixed obstruction and restriction is present. (Lung volumes needed to assess).",
  obstructionNonspecific: "Airflow obstruction with nonspecific reduction in vital capacity.",
  mildSum: "Mild obstructive defect.",
  moderateSum: "Moderate obstructive defect.",
  severeSum: "Severe obstructive defect.",
  mixedSum: "Possible mixed obstruction and restriction is present. (Lung volumes needed to assess).",
  nonspecificSum: "Non-specific pattern is seen.",
  result: "",
  summary: "",
};
export const possibleMixSum = {
  mild: "Mild obstructive defect based on FEV1 (Z-score -2.5 or higher). Consider lung volume studies to rule out restrictive disease.",
  moderate: "Moderate obstructive defect based on FEV1 (Z-score -2.5 to -4). Consider lung volume studies to rule out restrictive disease.",
  severe: "Severe obstructive defect based on FEV1 (Z-score less than -4). Consider lung volume studies to rule out restrictive disease.",
  mildSum: "Mild obstructive defect is present. Consider lung volume studies to rule out restrictive disease.",
  moderateSum: "Moderate obstructive defect is present. Consider lung volume studies to rule out restrictive disease.",
  severeSum: "Severe obstructive defect is present. Consider lung volume studies to rule out restrictive disease.",
  result: "",
  summary: "",
}
export const mixedSum = {
  mild: "Mild obstructive defect based on FEV1 (Z-score -2.5 or higher).",
  moderate: "Moderate obstructive defect based on FEV1 (Z-score -2.5 to -4).",
  severe: "Severe obstructive defect based on FEV1 (Z-score less than -4).",
  mildSum: "A mix of mild obstructive and restrictive defect is present.",
  moderateSum: "A mix of moderate obstructive and restrictive defect is present.",
  severeSum: "A mix of severe obstructive and restrictive defect is present.",
  result: "",
  summary: "",
}
export const bronch = {
  default: "",
  significant:
    "There is a significant response to bronchodilator inhalation (More than 10% increase in percent predicted FEV1 or FVC).",
  nonSignificant:
    "There is no significant response to bronchodilator inhalation; however, this does not preclude benefit from use of a bronchodilator.",
  borderline:
    "There is borderline response to bronchodilator inhalation based on FEV1 and FVC.",
  significantSum:
    "There is significant bronchodilator response.",
  nonSignificantSum:
    "There is no significant bronchodilator response.",
  borderlineSum:
    "There is borderline bronchodilator response.",
  result: "",
  summary: "",
};

export const volume = {
  default: "",
  normal: "Normal lung volumes.",
  mild: "Mild restrictive defect based on reduced TLC and FEV1 (Z-score -1.65 to -2.5).",
  moderate: "Moderate restrictive defect based on reduced TLC and FEV1 (Z-score -2.5 to -4).",
  severe: "Severe restrictive defect based on reduced TLC and FEV1 (Z-score less than -4).",
  highTLC: "Increased TLC indicates hyperinflation.",
  large: "Large lungs (elevated TLC, FRC, RV and normal FRC/TLC, RV/TLC).",
  hyper: "Hyperinflation is present (elevated TLC or FRC/TLC).",
  simpleRestrict: "Simple restriction is present (low TLC, FRC, RV and Normal FRC/TLC, RV/TLC).",
  complexRestrict: "Complex restriction is present (low TLC, FRC and elevated RV/TLC. RV normal/elevated).",
  mixed: "Mixed obstruction and restriction.",
  largeSum: "Large lung volumes.",
  hyperSum: "Hyperinflation is present.",
  mildSum: "Mild restrictive defect.",
  moderateSum: "Moderate restrictive defect.",
  severeSum: "Severe restrictive defect.",
  mixedSum: "Mixed obstruction and restriction are present.",
  result: "",
  summary: "",
};
export const airTrapping = {
  default: "",
  trapping: "Air trapping is present (RV/TLC elevated).",
  trappingSum: "Air trapping is present.",
  result: "",
  summary: "",
};
export const diffusing = {
  default: "",
  normal: "Normal diffusing capacity.",
  mild: "Mild reduction in diffusing capacity (Z-score -1.65 to -2.5).",
  moderate: "Moderate reduction in diffusing capacity (Z-score -2.5 to -4).",
  severe: "Severe reduction in diffusing capacity (Z-score less than -4).",
  high: "Abnormally high. May be seen with asthma, obesity, alveolar hemorrhage, erythrocytosis, or left to right shunting.",
  normalVA: "Reduced DLCO with normal VA. May be seen with pulmonary hypertension, pulmonary embolism, vasculitis, emphysema with preserved lung volumes, or anemia.",
  normalKCO: "Reduced DLCO, reduced VA, with low/normal DLCO/VA (KCO). May be seen with interstitial lung disease or emphysema.",
  highKCO: "Reduced DLCO, reduced VA, with high DLCO/VA (KCO). May be seen with submaximal effort, neuromuscular dysfunction, or after pneumonectomy.",
  mildSum: "Mild reduction in diffusing capacity.",
  moderateSum: "Moderate reduction in diffusing capacity.",
  severeSum: "Severe reduction in diffusing capacity.",
  highSum: "Abnormally high diffusing capacity.",
  result: "",
  summary: "",
};
export const diffusingCorrect = {
  default: "",
  corrected: "The diffusing capacity is corrected using hemoglobin.",
  uncorrected: "The diffusing capacity is uncorrected.",
  result: "",
};

export const summaryPrompt = {
  default: "",
  normal: "Normal PFTs.",
  normalSpirometry: "Normal spirometry.",
  obstructive: "Obstructive defect is indicated on this PFT.",
  obstructiveSpirometry: "Obstructive defect is indicated on this spirometry.",
  restrictive: "Restrictive defect is indicated on this PFT.",
  mixed:
    "Mixed obstructive and restrictive defect is indicated on this PFT.",
  nonspecific:
    "No evidence of airflow obstruction or restrictive disease. Reduced FEV1 and FVC with normal lung volumes represent a non-specific pattern.",
  restrictiveNeedLungVolume:
    "Restrictive defect suggested by spirometry. Recommend lung volume studies to confirm this.",
  FVCLow:
    "Vital capacity decreased. Recommend lung volume studies to evaluate for restrictive disease.",
  clinical: "Clinical correlation suggested.",
  PRISM: "Preserved Ratio Impaired Spirometry (PRISM) is present (Reduced FEV1, FVC, and normal FEV1/FVC). Recommend lung volumes to assess."
};
