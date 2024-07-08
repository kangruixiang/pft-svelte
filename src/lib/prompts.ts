export const qualityPrompt = {
  adequate: "Adequate effort, results reproducible.",
  U: "Grade-U (Usable, but not acceptable).",
  variable: "Variable effort, results reproducible.",
  inadequate: "Inadequate effort, results are not reproducible.",
  short: "FVC maneuver did not extend beyond 6 seconds.",
  notTrue: "Results may not reflect the true lung function."
};

export const flowPrompt = {
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
  normal: "Normal spirometry.",
  normalSum: "Normal spirometry",
  mild: "Mild obstructive defect (FEV1 Z-score -2.5 or higher).",
  moderate: "Moderate obstructive defect (FEV1 Z-score -2.5 to -4).",
  severe: "Severe obstructive defect (FEV1 Z-score less than -4).",
  restrictedMaybe:
    "Possible restriction or non-specific pattern is present (lung volumes needed to assess).",
  nonspecific: "Non-specific pattern is seen (FEV1, FVC reduced; normal FEV1/FVC ratio and TLC).",
  restricted:
    "Restrictive lung defect based on lung volumes.",
  mixed: "Possible mixed obstruction and restriction is present (lung volumes needed to assess).",
  obstructionNonspecific: "Airflow obstruction with nonspecific reduction in vital capacity.",
  mildSum: "Mild obstructive ventilatory impairment",
  moderateSum: "Moderate obstructive ventilatory impairment",
  severeSum: "Severe obstructive ventilatory impairment",
  mixedSum: "Possible mixed obstructive and restrictive ventilatory impairment is present (lung volumes needed to assess)",
  nonspecificSum: "Non-specific pattern is seen",
  PRISM: "Preserved Ratio Impaired Spirometry (PRISM)",
  dysanapsis: "Mild obstructive defect vs dysanapsis (normal FEV1; normal or elevated FVC; reduced FEV1/FVC ratio).",
  dysanapsisSum: "Mild obstructive defect vs dysanapsis",
};
export const spirometryRestricted = {
  mild: "Mild restrictive defect (FEV1 Z-score -2.5 or higher) based on lung volumes.",
  moderate: "Moderate restrictive defect (FEV1 Z-score -2.5 to -4) based on lung volumes.",
  severe: "Severe restrictive defect (FEV1 Z-score less than -4) based on lung volumes.",
  mildSum: "Mild restrictive ventilatory impairment",
  moderateSum: "Moderate restrictive ventilatory impairment",
  severeSum: "Severe restrictive ventilatory impairment",
};
export const possibleMixSum = { // maybe not add consider lung volumes part
  mild: "Mild obstructive defect (FEV1 Z-score -2.5 or higher). Consider lung volume studies to rule out restrictive disease.",
  moderate: "Moderate obstructive defect (FEV1 Z-score -2.5 to -4). Consider lung volume studies to rule out restrictive disease.",
  severe: "Severe obstructive defect (FEV1 Z-score less than -4). Consider lung volume studies to rule out restrictive disease.",
  mildSum: "Mild obstructive ventilatory impairment is present. Consider lung volume studies to rule out restrictive disease.",
  moderateSum: "Moderate obstructive ventilatory impairment is present. Consider lung volume studies to rule out restrictive disease.",
  severeSum: "Severe obstructive ventilatory impairment is present. Consider lung volume studies to rule out restrictive disease.",
}
export const mixedSum = {
  mild: "Mix of mild obstructive and restrictive defect (reduced TLC and FEV1/FVC ratio; FEV1 Z-score -2.5 or higher).",
  moderate: "Mix of moderate obstructive and restrictive defect (reduced TLC and FEV1/FVC ratio; FEV1 Z-score -2.5 to -4).",
  severe: "Mix of severe obstructive and restrictive defect (reduced TLC and FEV1/FVC ratio; FEV1 Z-score less than -4).",
  mildSum: "A mix of mild obstructive and restrictive ventilatory impairment is present",
  moderateSum: "A mix of moderate obstructive and restrictive ventilatory impairment is present",
  severeSum: "A mix of severe obstructive and restrictive ventilatory impairment is present",
}
export const bronch = {
  significant:
    "There is a significant response to bronchodilator inhalation (more than 10% increase in percent predicted FEV1 or FVC).",
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
};

export const volume = {
  normal: "Normal lung volumes.",
  normalSum: ", normal lung volumes, and",
  highTLC: "Increased TLC indicates hyperinflation.",
  large: "Large lungs (elevated TLC, FRC, and RV; normal FRC/TLC and RV/TLC).",
  hyper: "Hyperinflation is present (elevated TLC or FRC/TLC).",
  largeSum: "Large lung volumes.",
  hyperSum: "Hyperinflation is present.",
  simpleRestrict: "Simple restriction (reduced TLC, FRC, and RV; normal FRC/TLC and RV/TLC).",
  complexRestrict: "Complex restriction (reduced TLC and FRC; elevated RV/TLC; normal or elevated RV).",
  mixed: "Mixed obstruction and restriction."
}

export const volumeSimple = {
  mild: "Mild simple restrictive defect (reduced TLC and normal RV/TLC; FEV1 Z-score -2.5 or higher).",
  moderate: "Moderate simple restrictive defect (reduced TLC and normal RV/TLC; FEV1 Z-score -2.5 to -4).",
  severe: "Severe simple restrictive defect (reduced TLC and normal RV/TLC; FEV1 Z-score less than -4).",
  mixed: "Mixed obstruction and restriction",
  mildSum: "Mild simple restrictive impairment",
  moderateSum: "Moderate simple restrictive impairment",
  severeSum: "Severe simple restrictive impairment",
};
export const volumeComplex = {
  mild: "Mild complex restrictive defect (reduced TLC and elevated RV/TLC; FEV1 Z-score -2.5 or higher).",
  moderate: "Moderate complex restrictive defect (reduced TLC and elevated RV/TLC; FEV1 Z-score -2.5 to -4).",
  severe: "Severe complex restrictive defect (reduced TLC and elevated RV/TLC; FEV1 Z-score less than -4).",
  mixed: "Mixed obstruction and restriction.",
  mildSum: "Mild complex restrictive impairment",
  moderateSum: "Moderate complex restrictive impairment",
  severeSum: "Severe complex restrictive impairment",
};
export const airTrapping = {
  trapping: "Gas trapping is present (RV/TLC elevated).",
  trappingSum: "Gas trapping is present.",
};
export const diffusing = {
  normal: "Normal diffusing capacity.",
  mild: "Mild reduction in diffusing capacity (DLCO Z-score -1.65 to -2.5).",
  moderate: "Moderate reduction in diffusing capacity (DLCO Z-score -2.5 to -4).",
  severe: "Severe reduction in diffusing capacity (DLCO Z-score less than -4).",
  high: "Abnormally high. May be seen with asthma, obesity, alveolar hemorrhage, erythrocytosis, or left to right shunting.",
  normalVA: "Reduced DLCO with normal VA. May be seen with pulmonary hypertension, pulmonary embolism, vasculitis, emphysema with preserved lung volumes, or anemia.",
  normalKCO: "Reduced DLCO, reduced VA, with low/normal DLCO/VA (KCO). May be seen with interstitial lung disease or emphysema.",
  highKCO: "Reduced DLCO, reduced VA, with high DLCO/VA (KCO). May be seen with submaximal effort, neuromuscular dysfunction, or after pneumonectomy.",
  normalSum: " with normal diffusing capacity.",
  mildSum: " with a mild gas transfer impairment.",
  moderateSum: " with a moderate gas transfer impairment.",
  severeSum: " with a severe gas transfer impairment.",
  highSum: " with abnormally high diffusing capacity.",
};
export const diffusingCorrect = {
  corrected: "The diffusing capacity is corrected using hemoglobin.",
  uncorrected: "The diffusing capacity is uncorrected.",
};
