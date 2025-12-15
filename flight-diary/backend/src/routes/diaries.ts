import express, { Request, Response } from "express";

import diaryService from "../services/diaryService";

import toNewDiaryEntry from "../utils";

const router = express.Router();

router.get("/", (_req: Request, res: Response) => {
  res.send(diaryService.getNonSensitiveEntries());
});

router.get("/comments", (_req: Request, res: Response) => {
  res.send(diaryService.getEntries());
});

router.get("/:id", (req: Request, res: Response) => {
  const diary = diaryService.findById(Number(req.params.id));

  if (diary) {
    res.send(diary);
  } else {
    res.sendStatus(404);
  }
});

router.post("/", (req: Request, res: Response) => {
  try {
    const newDiaryEntry = toNewDiaryEntry(req.body);
    const addedEntry = diaryService.addDiary(newDiaryEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
