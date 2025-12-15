import axios from "axios";
import {
  Patient,
  PatientFormValues,
  NewEntryDataWithoutId,
  Entry,
} from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);

  return data;
};

export const getOnePatient = async (id: string) => {
  console.log("id", id);
  const { data } = await axios.get<Patient>(
    `http://localhost:3001/patients/${id}`
  );
  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients`, object);

  return data;
};

export const createEntry = (object: NewEntryDataWithoutId, id: string) => {
  console.log("createEntry receiving requests");
  return axios
    .post<Entry>(`${apiBaseUrl}/patients/${id}/entries`, object)
    .then((response) => response.data);
};

export default {
  getAll,
  create,
};
