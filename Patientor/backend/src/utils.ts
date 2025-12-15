import { NewPatientEntry, Gender, HealthCheckRating } from "./types";
import { z } from "zod";

export const newEntrySchema = z.object({
  name: z.string(),
  dateOfBirth: z.iso.date(),
  gender: z.enum(Gender),
  occupation: z.string(),
});

export const HealthCheckSchema = z.object({
  description: z.string(),
  date: z.string(),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()).optional(),
  healthCheckRating: z.enum(HealthCheckRating),
  type: z.literal("HealthCheck"),
});

export const OccupationalHealthcareSchema = z.object({
  description: z.string(),
  date: z.string(),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()).optional(),
  employerName: z.string(),
  type: z.literal("OccupationalHealthcare"),
  sickLeave: z.object({
    startDate: z.iso.date("Invalid start date format. Must be YYYY-MM-DD."),
    endDate: z.iso.date("Invalid end date format. Must be YYYY-MM-DD."),
  }),
});

export const HospitalSchema = z.object({
  description: z.string(),
  date: z.string(),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()).optional(),
  type: z.literal("Hospital"),
  discharge: z.object({
    date: z.iso.date("Invalid start date format. Must be YYYY-MM-DD."),
    criteria: z.string(),
  }),
});

const parseField = (variable: unknown): string => {
  if (!isString(variable)) {
    throw new Error(`Incorrect ${variable}`);
  }
  return variable;
};

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error("Incorrect date: " + date);
  }
  return date;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((gender) => gender.toString())
    .includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect gender: " + gender);
  }
  return gender;
};

const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }
  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "gender" in object &&
    "occupation" in object
  ) {
    const newEntry: NewPatientEntry = {
      name: parseField(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      gender: parseGender(object.gender),
      occupation: parseField(object.occupation),
    };
    return newEntry;
  }
  throw new Error("Incorrect data: some fields are missing");
};

export default toNewPatientEntry;
