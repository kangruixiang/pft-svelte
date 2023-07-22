import type { Volume, Prompt } from "./global"

export function resetPrompt(prompt: Prompt) {
  prompt.result = prompt.default
  prompt.summary = prompt.default
}

function checkSeverity(checkVariable: number, prompt: Prompt, sumPrompt: Prompt) {
  if (checkVariable < -4.1) {
    sumPrompt.summary = prompt.severeSum
    return prompt.severe
  }

  if (checkVariable < -2.51) {
    sumPrompt.summary = prompt.moderateSum
    return prompt.moderate
  }

  sumPrompt.summary = prompt.mildSum
  return prompt.mild
}

export function checkVolume(TLC: Volume, FEV1: Volume, RVTLC: Volume, volume: Prompt, volumeSimple: Prompt, volumeComplex: Prompt) {

  const { hyper, large, normal, largeSum, hyperSum } = volume

  if (!TLC.Pre) {
    return
  }

  // checks total lung volumes
  if (TLC.Pre >= TLC.ULN) {
    if (RVTLC.Perc >= RVTLC.ULN) {
      volume.summary = hyperSum
      return hyper
    }

    volume.summary = largeSum
    return large
  }

  if (TLC.Pre >= TLC.LLN) {
    volume.summary = volume.normal
    return normal;
  }

  if (FEV1.ZPost) {
    if (RVTLC.Pre >= RVTLC.ULN) {
      return checkSeverity(FEV1.ZPost, volumeComplex, volume)
    }
    return checkSeverity(FEV1.ZPost, volumeSimple, volume)
  }

  if (RVTLC.Pre >= RVTLC.ULN) {
    return checkSeverity(FEV1.Z, volumeComplex, volume)
  }

  return checkSeverity(FEV1.Z, volumeSimple, volume)

}

export function checkTrapping(RVTLC: Volume, airTrapping: Prompt) {

  if (RVTLC.Pre > RVTLC.ULN) {
    airTrapping.summary = airTrapping.trappingSum
    return airTrapping.trapping;
  }

  return airTrapping.default;

}

export function checkBronchodilator(FEV1: Volume, FVC: Volume, bronch: Prompt) {

  const { significant, borderline, nonSignificant, significantSum, nonSignificantSum, borderlineSum } = bronch

  if (!FEV1.PostVol) {
    return bronch.default;
  }

  if (FEV1.PostPerc >= 10 || FVC.PostPerc >= 10) {
    bronch.summary = significantSum
    return significant;
  }

  if (FEV1.PostVol > 9 || FVC.PostPerc > 9) {
    bronch.summary = borderlineSum
    return borderline;
  }

  bronch.summary = nonSignificantSum
  return nonSignificant;
}

export function checkDLCO(DLCO: Volume, VA: Volume, DLVA: Volume, diffusing: Prompt) {

  const { high, normal, normalVA, highSum, highKCO, normalKCO } = diffusing

  if (DLCO.Pre > DLCO.ULN) {
    diffusing.summary = highSum
    return high
  }

  if (DLCO.Pre >= DLCO.LLN) {
    diffusing.summary = diffusing.default
    return normal
  }

  if (VA.Pre >= VA.LLN) {

    return checkSeverity(DLCO.Z, diffusing, diffusing) + " " + normalVA
  }

  if (DLVA.Pre > DLVA.ULN) {
    return checkSeverity(DLCO.Z, diffusing, diffusing) + " " + highKCO
  }

  return checkSeverity(DLCO.Z, diffusing, diffusing) + " " + normalKCO
}

export function checkSpirometry(FEVFVC: Volume, FEV1: Volume, FVC: Volume, TLC: Volume, spirometry: Prompt, mixedSum: Prompt, possibleMixSum: Prompt) {

  const { normal, restrictedMaybe, nonspecific, restricted, nonspecificSum } = spirometry

  // no obstruction
  if (FEVFVC.Pre >= FEVFVC.LLN) {

    // normal FVC and normal spirometry
    if (FVC.Pre > FVC.LLN) {
      spirometry.summary = normal
      return normal;
    }

    // Decreased FVC, needs lung volume
    if (!TLC.Pre) {
      spirometry.summary = restrictedMaybe
      return restrictedMaybe;
    }

    // Decreased FVC, normal lung volume
    if (TLC.Pre >= TLC.LLN) {
      spirometry.summary = nonspecificSum
      return nonspecific;
    }

    return restricted
  }

  if (!TLC.Pre) {
    return checkSeverity(FEV1.ZPost, possibleMixSum, possibleMixSum)
  }

  // mixed obstruction/restriction
  if (TLC.Pre < TLC.LLN) {
    return checkSeverity(FEV1.ZPost, mixedSum, mixedSum)
  }

  // if (FVC.Pre < FVC.LLN) {
  //   if (TLC.Perc < TLC.LLN) {
  //     return obstructionNonspecific
  //   }

  //   spirometry.summary = mixedSum
  //   return mixed
  // }


  // obstructive disease
  if (FEV1.ZPost) {
    return checkSeverity(FEV1.ZPost, spirometry, spirometry)
  }

  return checkSeverity(FEV1.Z, spirometry, spirometry)
}
