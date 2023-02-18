
export function checkVolume(TLC, volumePrompt) {
  // checks total lung volumes
  if (TLC.Perc > 120) {
    return volumePrompt.highTLC
  }

  if (TLC.Pre >= TLC.LLN) {
    return volumePrompt.normal;
  }

  return TLC.Perc > 70
    ? volumePrompt.mild
    : TLC.Perc > 60
      ? volumePrompt.moderate
      : TLC.Perc > 50
        ? volumePrompt.modSevere
        : TLC.Perc > 35
          ? volumePrompt.severe
          : volumePrompt.verySevere

}

export function checkHyperinflation(RVTLC, FEVFVC, hyperPrompt) {
  if (RVTLC.Perc < 120) {
    return hyperPrompt.default;
  }

  if (FEVFVC.Pre >= FEVFVC.LLN) {
    // no hyperinflation in restrictive disease
    return hyperPrompt.default;
  }

  return hyperPrompt.airtrapping;

}

export function checkBronchodilator(FEV1, FVC, bronchPrompt) {
  if (!FEV1.PostVol) {
    return bronchPrompt.default;
  }

  if (FEV1.PostVol >= 0.2 && FEV1.PostPerc >= 12) {
    return bronchPrompt.significant;
  }

  if (FVC.PostVol >= 0.2 && FVC.PostPerc >= 12) {
    return bronchPrompt.significant;
  }

  if (FVC.PostVol > 0.17 || FVC.PostPerc > 11) {
    return bronchPrompt.borderline;
  }

  if (FEV1.PostVol > 0.17 || FEV1.PostPerc > 11) {
    return bronchPrompt.borderline;
  }

  return bronchPrompt.nonSignificant;
}

export function checkDLCO(DLCO, diffusingPrompt) {
  return DLCO.Perc > 110
    ? diffusingPrompt.high
    : DLCO.Pre > DLCO.LLN
      ? diffusingPrompt.normal
      : DLCO.Perc > 60
        ? diffusingPrompt.mild
        : DLCO.Perc > 40
          ? diffusingPrompt.moderate
          : diffusingPrompt.severe
}

export function checkSpirometry(FEVFVC, FEV1, FVC, TLC, spirometryPrompt) {
  // no obstruction
  if (FEVFVC.Pre >= FEVFVC.LLN) {

    // normal FVC and normal spirometry
    if (FVC.Pre >= FVC.LLN) {
      return spirometryPrompt.normal;
    }

    // Decreased FVC, needs lung volume
    if (!TLC.Pre) {
      return spirometryPrompt.VCReducedTLCNeeded;
    }

    // Decreased FVC, low lung volume
    if (TLC.Pre >= TLC.LLN) {
      return spirometryPrompt.VCReduced;
    }

    return spirometryPrompt.VCReduced
  }


  // obstructive disease
  return FEV1.Perc > 70
    ? spirometryPrompt.mild
    : FEV1.Perc > 60
      ? spirometryPrompt.moderate
      : FEV1.Perc > 50
        ? spirometryPrompt.modSevere
        : FEV1.Perc > 35
          ? spirometryPrompt.severe
          : spirometryPrompt.verySevere
}

export function checkConclusion(FEVFVC, FVC, TLC, conclusionPrompt) {

  // No obstruction
  if (FEVFVC.Pre >= FEVFVC.LLN) {

    // no lung volume
    if (!TLC.Pre) {
      // decreased FVC, needs lung volume
      if (FVC.Pre < FVC.LLN) {
        return conclusionPrompt.restrictiveNeedLungVolume;
      }

      return conclusionPrompt.normalSpirometry
    }

    // restrictive disease with decreased lung volume
    if (TLC.Pre < TLC.LLN) {
      return conclusionPrompt.restrictive;
    }

    // Normal lung volumes, decreased FVC, non specific
    if (FVC.Pre < FVC.LLN) {
      return conclusionPrompt.nonspecific;
    }

    return conclusionPrompt.normal
  }

  // has obstruction
  // no lung volume
  if (!TLC.Pre) {
    // decreased FVC, needs lung volumes
    if (FVC.Pre < FVC.LLN) {
      return conclusionPrompt.obstructiveSpirometry + " " + conclusionPrompt.FVCLow
    }
    return conclusionPrompt.obstructiveSpirometry
  }

  // restrictive disease with obstructive disease
  if (TLC.Pre < TLC.LLN) {
    return conclusionPrompt.combined;
  }

  return conclusionPrompt.obstructive

}