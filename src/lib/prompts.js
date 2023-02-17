export const effortPrompt = [
  "",
  "Adequate effort, results reproducible.",
  "Inadequate effort, results are not reproducible.",
  "FVC maneuver did not extend beyond 6 seconds.",
];
export const spirometryPrompt = [
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
export const bronchPrompt = [
  "",
  "There is a significant response to bronchodilator inhalation based on FEV1 and FVC. ",
  "There is no significant response to bronchodilator inhalation; however, this does not preclude benefit from use of a bronchodilator.",
];
export const flowPrompt = [
  "",
  "Flow-volume loop does not suggest any fixed airway obstruction.",
  "Flow-volume loop is suggestive of a variable intrathoracic  obstruction. Consider direct airway inspection if clinically appropriate.",
  "Flow-volume loop is suggestive of a  variable extrathoracic  obstruction. Consider direct airway inspection if clinically appropriate.",
  "Flow-volume loop is suggestive of a  fixed obstruction. Consider direct airway inspection if clinically appropriate.",
];
export const volumePrompt = [
  "",
  "Normal lung volumes.",
  "Mild restrictive defect based on reduced TLC and FEV1.",
  "Moderate restrictive defect based on reduced TLC and FEV1.",
  "Moderately severe restrictive defect based on reduced TLC and FEV1.",
  "Severe restrictive defect based on reduced TLC and FEV1.",
  "Very severe restrictive defect based on reduced TLC and FEV1.",
];
export const hyperPrompt = [
  "",
  "Increased TLC indicates hyperinflation.",
  "Increased RV and RV/TLC indicates air trapping.",
];
export const diffusingPrompt = [
  "",
  "Normal diffusing capacity.",
  "Mild reduction in diffusing capacity.",
  "Moderate reduction in diffusing capacity.",
  "Severe reduction in diffusing capacity.",
  "Diffusing capacity is elevated.",
];
export const diffusingCorrectPrompt = [
  "",
  "The diffusing capacity is corrected using hemoglobin.",
  "The diffusing capacity is uncorrected.",
];
export const conclusionPrompt = [
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