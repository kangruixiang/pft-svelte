export const effortPrompt = {
  default: "",
  adequate: "Adequate effort, results reproducible.",
  inadequate: "Inadequate effort, results are not reproducible.",
  short: "FVC maneuver did not extend beyond 6 seconds.",
};

export const spirometryPrompt = {
  default: "",
  normal: "Normal spirometry.",
  mild: "Mild obstructive defect based on FEV1.",
  moderate: "Moderate obstructive defect based on FEV1.",
  modSevere: "Moderately severe obstructive defect based on FEV1.",
  severe: "Severe obstructive defect based on FEV1.",
  verySevere: "Very severe obstructive defect based on FEV1.",
  VCReducedTLCNeeded:
    "Vital capacity is reduced. This may be due to submaximal effort, air trapping, a restrictive ventilatory defect, or a nonspecific defect. Consider measurement of total lung capacity and postbronchodilator spirometry if clinically indicated.",
  restricted:
    "Restrictive lung defect suggested on spirometry.",
  VCReduced:
    "Vital capacity is reduced. This may be due to submaximal effort, air trapping, a restrictive ventilatory defect, or a nonspecific defect.",
};
export const bronchPrompt = {
  default: "",
  significant:
    "There is a significant response to bronchodilator inhalation based on FEV1 and FVC.",
  nonSignificant:
    "There is no significant response to bronchodilator inhalation; however, this does not preclude benefit from use of a bronchodilator.",
  borderline:
    "There is borderline response to bronchodilator inhalation based on FEV1 and FVC.",
};
export const flowPrompt = {
  default: "",
  normal: "Flow-volume loop does not suggest any fixed airway obstruction.",
  intrathoracic:
    "Flow-volume loop is suggestive of a variable intrathoracic  obstruction. Consider direct airway inspection if clinically appropriate.",
  extrathoracic:
    "Flow-volume loop is suggestive of a  variable extrathoracic  obstruction. Consider direct airway inspection if clinically appropriate.",
  fixed:
    "Flow-volume loop is suggestive of a  fixed obstruction. Consider direct airway inspection if clinically appropriate.",
};
export const volumePrompt = {
  default: "",
  normal: "Normal lung volumes.",
  mild: "Mild restrictive defect based on reduced TLC and FEV1.",
  moderate: "Moderate restrictive defect based on reduced TLC and FEV1.",
  modSevere:
    "Moderately severe restrictive defect based on reduced TLC and FEV1.",
  severe: "Severe restrictive defect based on reduced TLC and FEV1.",
  verySevere: "Very severe restrictive defect based on reduced TLC and FEV1.",
  highTLC: "Increased TLC indicates hyperinflation.",
};
export const hyperPrompt = {
  default: "",
  highTLC: "Increased TLC indicates hyperinflation.",
  airtrapping: "Increased RV and RV/TLC indicates air trapping.",
};
export const diffusingPrompt = {
  default: "",
  normal: "Normal diffusing capacity.",
  mild: "Mild reduction in diffusing capacity.",
  moderate: "Moderate reduction in diffusing capacity.",
  severe: "Severe reduction in diffusing capacity.",
  high: "Diffusing capacity is elevated.",
};
export const diffusingCorrectPrompt = {
  default: "",
  corrected: "The diffusing capacity is corrected using hemoglobin.",
  uncorrected: "The diffusing capacity is uncorrected.",
};
export const conclusionPrompt = {
  default: "",
  normal: "Normal PFTs.",
  normalSpirometry: "Normal spirometry.",
  obstructive: "Obstructive defect is indicated on this PFT.",
  obstructiveSpirometry: "Obstructive defect is indicated on this spirometry.",
  restrictive: "Restrictive defect is indicated on this PFT.",
  combined:
    "Combined obstructive and restrictive defect is indicated on this PFT.",
  nonspecific:
    "No evidence of airflow obstruction or restrictive disease. Reduced FEV1 and FVC with normal lung volumes represent a non-specific pattern.",
  restrictiveNeedLungVolume:
    "Restrictive defect suggested by spirometry. Recommend lung volume studies to confirm this.",
  FVCLow:
    "Vital capacity decreased. Recommend lung volume studies to evaluate for restrictive disease.",
  clinical: "Clinical correlation suggested.",
};
