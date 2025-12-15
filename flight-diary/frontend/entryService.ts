import axios from "axios";
import type { Entries, NewEntry } from "./types";

export const getAll = () => {
  return axios
    .get<Entries[]>("http://localhost:3000/api/diaries/comments")
    .then((response) => response.data);
};

export const create = (object: NewEntry) => {
  return axios
    .post<Entries>("http://localhost:3000/api/diaries", object)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};
