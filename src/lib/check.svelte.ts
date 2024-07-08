import { tsvParse } from "d3"
import type DSVRowArray from "d3";
import type { Volume, Prompt, Grade } from "./types"
import {
  spirometry,
  bronch,
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

class Data {
  formattedData!: DSVRowArray.DSVRowArray
  FEV1!: Volume
  FVC!: Volume
  FEVFVC!: Volume
  FRC!: Volume
  TLC!: Volume
  RV!: Volume
  RVTLC!: Volume
  DLCOunc!: Volume
  DLCOcor!: Volume
  VA!: Volume
  DLVA!: Volume
  Grade!: Grade
  conclusion!: string;

  spirometrySum = $state("")
  spirometryResult = $state("")
  volumeSum = $state("")
  airTrappingSum = $state("")
  diffusingSum = $state("")
  bronchSum = $state("")
  volumeResult = $state("")
  airTrappingResult = $state("")
  diffusingResult = $state("")
  bronchResult = $state("")
  diffusingCorrectResult = $state("")


  setVariables(inputText: string) {
    if (!inputText) {
      console.log("No input");
      return;
    }

    const replaceInput = inputText.replace(/^\s*\n/gm, "");
    this.formattedData = tsvParse(replaceInput);

    this.FEV1Raw = this.formattedData.find((item) => item.Variable === "FEV1");
    this.FEV1 = {
      Pre: parseFloat(this.FEV1Raw.Pre) || null,
      LLN: parseFloat(this.FEV1Raw.LLN) || null,
      Z: parseFloat(this.FEV1Raw["Z Score"]) || null,
      Perc: parseFloat(this.FEV1Raw["% Pred-Pre"]) || null,
      PostVol: parseFloat(this.FEV1Raw["Vol-Change-Post"]) || null,
      PostPerc: parseFloat(this.FEV1Raw["% Change-Post"]) || null,
      ZPost: parseFloat(this.FEV1Raw["Z Score-Post"]) || null,
    };
    // if post bronchodilator and improved, then use postbronchodilator Z
    if (this.FEV1.ZPost && this.FEV1.ZPost > this.FEV1.Z) {
      this.FEV1.Z = this.FEV1.ZPost
    }

    this.FVCRaw = this.formattedData.find((item) => item.Variable === "FVC");
    this.FVC = {
      Pre: parseFloat(this.FVCRaw.Pre),
      LLN: parseFloat(this.FVCRaw.LLN),
      Z: parseFloat(this.FVCRaw["Z Score"]),
      Perc: parseFloat(this.FVCRaw["% Pred-Pre"]) || null,
      PostVol: parseFloat(this.FVCRaw["Vol-Change-Post"]) || null,
      PostPerc: parseFloat(this.FVCRaw["% Change-Post"]) || null,
      ZPost: parseFloat(this.FVCRaw["Z Score-Post"]) || null,
    };

    this.FEVFVCRaw = this.formattedData.find(
      (item) => item.Variable === "FEV1/FVC"
    );
    this.FEVFVC = {
      Pre: parseFloat(this.FEVFVCRaw.Pre),
      LLN: parseFloat(this.FEVFVCRaw.LLN),
      Z: parseFloat(this.FEVFVCRaw["Z Score"]),
      Perc: parseFloat(this.FEVFVCRaw["% Pred-Pre"]) || null,
      ZPost: parseFloat(this.FEVFVCRaw["Z Score-Post"]) || null,
    };

    this.FRCRaw =
      this.formattedData.find(
        (item) =>
          item.Variable === "FRC (Pleth)" || item.Variable === "FRC (N2)"
      ) || "";
    this.FRC = {
      Pre: parseFloat(this.FRCRaw.Pre) || null,
      LLN: parseFloat(this.FRCRaw.LLN) || null,
      ULN: parseFloat(this.FRCRaw.ULN) || null,
      Z: parseFloat(this.FRCRaw["Z Score"]),
      Perc: parseFloat(this.FRCRaw["% Pred-Pre"]) || null,
    };

    this.TLCRaw =
      this.formattedData.find((item) => item.Variable === "TLC (Pleth)") || "";
    this.TLC2Raw =
      this.formattedData.find((item) => item.Variable === "TLC (N2)") || "";
    this.TLC = {
      Pre: parseFloat(this.TLCRaw.Pre) || parseFloat(this.TLC2Raw.Pre) || null,
      LLN: parseFloat(this.TLCRaw.LLN) || parseFloat(this.TLC2Raw.LLN) || null,
      ULN: parseFloat(this.TLCRaw.ULN) || parseFloat(this.TLC2Raw.ULN) || null,
      Z:
        parseFloat(this.TLCRaw["Z Score"]) || parseFloat(this.TLC2Raw["Z Score"]) || null,
      Perc:
        parseFloat(this.TLCRaw["% Pred-Pre"]) ||
        parseFloat(this.TLC2Raw["% Pred-Pre"]) ||
        null,
    };

    this.RVRaw =
      this.formattedData.find((item) => item.Variable === "RV (Pleth)") ?? "";
    this.RV2Raw =
      this.formattedData.find((item) => item.Variable === "RV (N2)") ?? "";
    this.RV = {
      Pre: parseFloat(this.RVRaw.Pre) || parseFloat(this.RV2Raw.Pre) || null,
      LLN: parseFloat(this.RVRaw.LLN) || parseFloat(this.RV2Raw.LLN) || null,
      ULN: parseFloat(this.RVRaw.ULN) || parseFloat(this.RV2Raw.ULN) || null,
      Z: parseFloat(this.RVRaw["Z Score"]) || parseFloat(this.RV2Raw["Z Score"]) || null,
      Perc:
        parseFloat(this.RVRaw["% Pred-Pre"]) ||
        parseFloat(this.RV2Raw["% Pred-Pre"]) ||
        null,
    };

    this.RVTLCRaw =
      this.formattedData.find((item) => item.Variable === "RV/TLC (Pleth)") ?? "";
    this.RVTLC2Raw =
      this.formattedData.find((item) => item.Variable === "RV/TLC (N2)") ?? "";
    this.RVTLC = {
      Pre: parseFloat(this.RVTLCRaw.Pre) || parseFloat(this.RVTLC2Raw.Pre) || null,
      LLN: parseFloat(this.RVTLCRaw.LLN) || parseFloat(this.RVTLC2Raw.LLN) || null,
      ULN: parseFloat(this.RVTLCRaw.ULN) || parseFloat(this.RVTLC2Raw.ULN) || null,
      Z:
        parseFloat(this.RVTLCRaw["Z Score"]) ||
        parseFloat(this.RVTLC2Raw["Z Score"]) ||
        null,
      Perc:
        parseFloat(this.RVTLCRaw["% Pred-Pre"]) ||
        parseFloat(this.RVTLC2Raw["% Pred-Pre"]) ||
        null,
    };

    this.DLCOuncRaw =
      this.formattedData.find((item) => item.Variable === "DLCOunc") || "";
    this.DLCOunc = {
      Pre: parseFloat(this.DLCOuncRaw.Pre) || null,
      LLN: parseFloat(this.DLCOuncRaw.LLN) || null,
      ULN: parseFloat(this.DLCOuncRaw.ULN) || null,
      Z: parseFloat(this.DLCOuncRaw["Z Score"]),
      Perc: parseFloat(this.DLCOuncRaw["% Pred-Pre"]) || null,
    };

    this.DLCOcorRaw =
      this.formattedData.find((item) => item.Variable === "DLCOcor") || "";
    this.DLCOcor = {
      Pre: parseFloat(this.DLCOcorRaw.Pre) || null,
      LLN: parseFloat(this.DLCOcorRaw.LLN) || null,
      ULN: parseFloat(this.DLCOcorRaw.ULN) || null,
      Z: parseFloat(this.DLCOcorRaw["Z Score"]),
      Perc: parseFloat(this.DLCOcorRaw["% Pred-Pre"]) || null,
    };

    this.VARaw = this.formattedData.find((item) => item.Variable === "VA") || "";
    this.VA = {
      Pre: parseFloat(this.VARaw.Pre) || null,
      LLN: parseFloat(this.VARaw.LLN) || null,
      Z: parseFloat(this.VARaw["Z Score"]),
      Perc: parseFloat(this.VARaw["% Pred-Pre"]) || null,
    };

    this.DLVARaw = this.formattedData.find((item) => item.Variable === "Kco") || "";
    this.DLVA = {
      Pre: parseFloat(this.DLVARaw.Pre) || null,
      LLN: parseFloat(this.DLVARaw.LLN) || null,
      ULN: parseFloat(this.DLVARaw.ULN) || null,
      Z: parseFloat(this.DLVARaw["Z Score"]),
      Perc: parseFloat(this.DLVARaw["% Pred-Pre"]) || null,
    };

    this.GradeRaw = this.formattedData.find(
      (item) => item.Variable === "Test Grade (ATS - FVC, FEV1)"
    );
    this.Grade = {
      Pre: this.GradeRaw["Pre"] || null,
      Post: this.GradeRaw["Post"] || null,
      Statement:
        this.GradeRaw.Post == null || this.GradeRaw["Pre"] == this.GradeRaw["Post"]
          ? `Grade ${this.GradeRaw["Pre"]} study.`
          : `Grade ${this.GradeRaw["Pre"]} prebronchodilation and grade ${this.GradeRaw["Post"]} postbronchodilation.`,
    };


  }

  checkSeverity(checkVariable: number, prompt: Prompt) {

    if (checkVariable <= -4.0) {
      return { severity: prompt.severe, summary: prompt.severeSum }
    }

    if (checkVariable <= -2.51) {
      return {
        severity: prompt.moderate,
        summary: prompt.moderateSum
      }
    }

    return {
      severity: prompt.mild,
      summary: prompt.mildSum
    }
  }

  checkSpirometry() {

    // makes sure the variables exists
    if (!this.FVC.Pre || !this.FEV1.Pre || !this.FVC.LLN || !this.FEV1.LLN || !this.FEVFVC.Pre || !this.FEVFVC.LLN || !this.FEV1.Z) {
      return ''
    }

    // obtain prompts
    const { normal, normalSum, restrictedMaybe, nonspecific, restricted, nonspecificSum, PRISM, dysanapsis, dysanapsisSum } = spirometry

    // no obstruction
    if (this.FEVFVC.Pre >= this.FEVFVC.LLN) {

      // no lung volume
      if (!this.TLC.Pre || !this.TLC.LLN) {

        // normal FVC = normal spirometry
        if (this.FVC.Pre > this.FVC.LLN) {
          this.spirometryResult = normal
          this.spirometrySum = normalSum
          return;
        }

        // low FVC, no lung volume = PRISM
        this.spirometryResult = restrictedMaybe
        this.spirometrySum = PRISM
        return;
      }


      // normal lung volume
      if (this.TLC.Pre >= this.TLC.LLN) {

        // normal FVC = normal
        if (this.FVC.Pre > this.FVC.LLN) {
          this.spirometryResult = normal
          this.spirometrySum = normalSum
          return;
        }

        // low FVC, nonspecific
        this.spirometryResult = nonspecific
        this.spirometrySum = nonspecificSum
        return;
      }

      // low lung volume, normal FVC: only restriction. Does not distinguish simple vs complex
      // if (this.FVC.Pre >= this.FVC.LLN && this.TLC.Pre < this.TLC.LLN) {
      //   // restriction
      //   const result = this.checkSeverity(this.FEV1.Z, spirometryRestricted)
      //   this.spirometryResult = result.severity
      //   this.spirometrySum = result.summary
      //   return
      // }

      // low lung volume, low FVC
      // complex restriction
      // if (this.RVTLC.Pre! >= this.RVTLC.ULN!) {
      //   const result = this.checkSeverity(this.FEV1.Z, spirometryRestricted)
      //   this.spirometryResult = result.severity
      //   this.spirometrySum = result.summary
      //   return
      // }

      // simple restriction
      const result = this.checkSeverity(this.FEV1.Z, spirometryRestricted)
      this.spirometryResult = result.severity
      this.spirometrySum = result.summary
      return
    }

    // obstructive disease

    // low ratio, no lung volume or normal lung volumes 
    if (!this.TLC.Pre || this.TLC.Pre > this.TLC.LLN!) {
      // normal FEV = dysanapsis
      if (this.FEV1.Pre >= this.FEV1.LLN) {
        this.spirometryResult = dysanapsis
        this.spirometrySum = dysanapsisSum
        return
      }

      // low FEV = obstructive
      const result = this.checkSeverity(this.FEV1.Z, spirometry)
      this.spirometryResult = result.severity
      this.spirometrySum = result.summary
      return
    }

    // low ratio, low volume = mixed obstruction/restriction
    const result = this.checkSeverity(this.FEV1.Z, mixedSum)
    this.spirometryResult = result.severity
    this.spirometrySum = result.summary
    return

    // if (FVC.Pre < FVC.LLN) {
    //   if (TLC.Perc < TLC.LLN) {
    //     return obstructionNonspecific
    //   }

    //   spirometry.summary = mixedSum
    //   return mixed
    // }
  }

  checkVolume() {

    const { hyper, large, normal, normalSum, largeSum, hyperSum, simpleRestrict, complexRestrict } = volume

    // check to make sure variables exist
    if (!this.TLC.Pre || !this.TLC.ULN || !this.RVTLC.Perc || !this.RVTLC.ULN || !this.TLC.LLN) {
      this.volumeResult = ""
      this.volumeSum = ""
      return
    }

    // total lung capacity larger than ULN
    if (this.TLC.Pre >= this.TLC.ULN) {

      // elevated RV/TLC = hyperinflation
      if (this.RVTLC.Perc >= this.RVTLC.ULN) {
        this.volumeResult = hyper
        this.volumeSum = hyperSum
        return hyper
      }

      // normal RV/TLC = large lungs
      this.volumeResult = large
      this.volumeSum = largeSum
      return large
    }

    // normal lung volumes
    if (this.TLC.Pre >= this.TLC.LLN) {
      this.volumeResult = normal
      this.volumeSum = normalSum
      return normal;
    }

    //if (FVC.Pre >= FVC.LLN) {
    //volume.summary = volume.normal
    //return normal;
    //}

    this.spirometrySum = ''

    // low volume, if RV/TLC elevated, then complex restriction
    if (this.RVTLC.Pre! >= this.RVTLC.ULN) {
      const result = this.checkSeverity(this.FEV1.Z, volumeComplex)
      this.volumeResult = result.severity
      this.volumeSum = result.summary
      return
    }

    // low volue, otherwise simple restriction
    const result = this.checkSeverity(this.FEV1.Z, volumeSimple)
    this.volumeResult = result.severity
    this.volumeSum = result.summary
    return
  }

  checkTrapping() {

    // no RVTLC variable
    if (!this.RVTLC.Pre || !this.RVTLC.ULN) {
      this.airTrappingResult = ""
      this.airTrappingSum = ""
      return
    }

    // air trapping is present
    if (this.RVTLC.Pre > this.RVTLC.ULN) {
      this.airTrappingResult = airTrapping.trapping
      this.airTrappingSum = airTrapping.trappingSum
      return
    }

    this.airTrappingResult = ""
    return
  }

  checkBronchodilator() {

    const { significant, borderline, nonSignificant, significantSum, nonSignificantSum, borderlineSum } = bronch

    // no post bronchodilator volume
    if (!this.FEV1.PostVol) {
      this.bronchResult = ""
      this.bronchSum = ""
      return
    }

    // significant bronchodilator response
    if (this.FEV1.PostPerc! >= 10 || this.FVC.PostPerc! >= 10) {
      this.bronchResult = significant
      this.bronchSum = significantSum
      return
    }

    // borderline bronchodilator response
    if (this.FEV1.PostVol > 9 || this.FVC.PostPerc! > 9) {
      this.bronchResult = borderline
      this.bronchSum = borderlineSum
      return
    }

    // nonsignificant bronchodilator response
    this.bronchResult = nonSignificant
    this.bronchSum = nonSignificantSum
    return
  }

  checkDLCO(DLCO) {

    const { high, normal, normalVA, highSum, highKCO, normalKCO, normalSum } = diffusing

    // no DLCO
    if (!DLCO.Pre || !DLCO.ULN) {
      this.diffusingResult = ""
      this.diffusingSum = ""
      return
    }

    // elevated DLCO
    if (DLCO.Pre > DLCO.ULN) {
      this.diffusingResult = high
      this.diffusingSum = highSum
      return
    }

    // normal DLCO
    if (DLCO.Pre >= DLCO.LLN) {
      this.diffusingResult = normal
      this.diffusingSum = normalSum
      return
    }

    // low DLCO, normal VA
    if (this.VA.Pre >= this.VA.LLN) {

      const result = this.checkSeverity(DLCO.Z, diffusing)
      this.diffusingResult = result.severity + " " + normalVA
      this.diffusingSum = result.summary
      return
    }

    // low DLCO, elevated DLVA
    if (this.DLVA.Pre > this.DLVA.ULN) {
      const result = this.checkSeverity(DLCO.Z, diffusing)
      this.diffusingResult = result.severity + " " + highKCO
      this.diffusingSum = result.summary
      return
    }

    const result = this.checkSeverity(DLCO.Z, diffusing)
    this.diffusingResult = result.severity + " " + normalKCO
    this.diffusingSum = result.summary
    return
  }

  checkData() {

    this.checkSpirometry()
    this.checkVolume()
    this.checkTrapping();
    this.checkBronchodilator();

    // if there's corrected DLCO
    if (this.DLCOcor.Pre) {

      // "diffusing is corrected"
      this.diffusingCorrectResult = diffusingCorrect.corrected;

      // checks diffusing
      this.checkDLCO(this.DLCOcor);
    }

    // else if there's uncorrected DLCO
    else if (this.DLCOunc.Pre) {

      // "diffusing is uncorrected"
      this.diffusingCorrectResult = diffusingCorrect.uncorrected;

      // checks diffusing
      this.checkDLCO(this.DLCOunc);
    }

    if (possibleMixSum.summary || mixedSum.summary) {
      this.volumeSum = "";
      this.spirometrySum = "";
    }
  }

  clearData() {
    this.spirometryResult = "";
    this.spirometrySum = "";
    // possibleMixSum.result = "";
    // possibleMixSum.summary = null;
    // mixedSum.result = "";
    // mixedSum.summary = null;
    this.bronchResult = "";
    this.bronchSum = "";
    this.volumeResult = "";
    this.volumeSum = "";
    this.diffusingResult = "";
    this.diffusingSum = "";
    this.diffusingCorrectResult = "";
    this.airTrappingResult = "";
    this.airTrappingSum = "";
  }

}

export const data = new Data()






