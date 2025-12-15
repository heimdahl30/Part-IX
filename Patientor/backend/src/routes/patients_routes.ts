import express, { Request, Response } from "express";
import { z } from "zod";
import {
  getPatients,
  addPatient,
  addEntry,
  getOnePatient,
} from "../services/patientsService";
import {
  newEntrySchema,
  HealthCheckSchema,
  OccupationalHealthcareSchema,
  HospitalSchema,
} from "../utils";
import {
  NewPatientEntry,
  Patients,
  NewEntryDataWithoutId,
  Entry,
  UserParams,
} from "../types";
const router = express.Router();

const newPatientParser = (req: Request, _res: Response, next: Function) => {
  try {
    newEntrySchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const newEntryParser = (req: Request, _res: Response, next: Function) => {
  if (req.body.type === "HealthCheck") {
    try {
      HealthCheckSchema.parse(req.body);
    } catch (error: unknown) {
      next(error);
    }
  } else if (req.body.type === "OccupationalHealthcare") {
    try {
      OccupationalHealthcareSchema.parse(req.body);
    } catch (error: unknown) {
      next(error);
    }
  } else {
    try {
      HospitalSchema.parse(req.body);
    } catch (error: unknown) {
      next(error);
    }
  }
  next();
};

router.get("/", (_req, res) => {
  res.json(getPatients());
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  console.log("router", id);
  res.send(getOnePatient(id));
});

const errorMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
  next: Function
) => {
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

router.post(
  "/",
  newPatientParser,
  (
    req: Request<unknown, unknown, NewPatientEntry>,
    res: Response<Patients>
  ) => {
    const addedPatient = addPatient(req.body);
    res.json(addedPatient);
  }
);

router.post(
  "/:id/entries",
  newEntryParser,
  (
    req: Request<unknown, unknown, NewEntryDataWithoutId>,
    res: Response<Entry>
  ) => {
    const params = req.params as UserParams;
    const id = params.id;
    console.log("request in router");
    const addedEntry = addEntry(req.body, id);
    res.json(addedEntry);
  }
);

router.use(errorMiddleware);

export default router;
