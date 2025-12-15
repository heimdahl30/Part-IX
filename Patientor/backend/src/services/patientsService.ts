import { patientEntries } from "../data/patients";
import {
  Patients,
  NoSSNPatient,
  NewPatientEntry,
  NewEntryDataWithoutId,
  Entry,
} from "../types";
import { patientData } from "../data/patients";
import { v1 as uuid } from "uuid";

const identifier = uuid();
const patients: Patients[] = patientEntries;

export const getPatients = (): NoSSNPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

export const getOnePatient = (id: string): Patients => {
  console.log(id);
  const patientEntry = patientData.find((patient) => patient.id === id);
  if (patientEntry) {
    return patientEntry;
  } else {
    throw new Error("Patient id does not exist");
  }
};

export const addPatient = (entry: NewPatientEntry): NoSSNPatient => {
  const newPatientEntry = {
    id: identifier,
    ...entry,
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

export const addEntry = (
  entryObj: NewEntryDataWithoutId,
  id: string
): Entry => {
  const patientEntryAdd = getOnePatient(id);
  const newEntry = {
    id: identifier,
    ...entryObj,
  };
  patientEntryAdd.entries?.push(newEntry);
  return newEntry;
};
