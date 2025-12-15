import { data } from "../data/diagnoses";
import { DiagnosisEntry } from "../types";

const diagnoses: DiagnosisEntry[] = data;

export const getDiagnoses = () => {
  return diagnoses;
};
