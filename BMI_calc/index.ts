import express from "express";
import { body, validationResult } from "express-validator";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack");
});

app.get("/bmi", (req, res) => {
  const { height, weight } = req.query;

  const parsedHeight = Number(height);
  const parsedWeight = Number(weight);

  if (
    !height ||
    !weight ||
    isNaN(parsedHeight) ||
    isNaN(parsedWeight) ||
    parsedHeight <= 0 ||
    parsedWeight <= 0
  ) {
    res.status(400).json({ error: "malformatted parameters" });
  } else {
    res.json({
      weight: parsedWeight,
      height: parsedHeight,
      bmi: calculateBmi(parsedHeight, parsedWeight),
    });
  }
});

app.post(
  "/exercises",
  [
    body("daily_exercises").notEmpty().withMessage("Required"),
    body("target").notEmpty().withMessage("Required"),
  ],
  (req: any, res: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: "parameters missing" });
    }
    const { daily_exercises, target } = req.body;

    const filteredArray = daily_exercises.filter((item: any) => item > 0);
    if (!daily_exercises || !target || filteredArray.length === 0) {
      res.status(400).json({ error: "parameters missing" });
    } else {
      daily_exercises.unshift(target);
      const parsedArray = daily_exercises.map((item: any) => Number(item));
      if (!parsedArray.every((element: any) => isNaN(element) === false)) {
        res.status(400).json({ error: "malformatted parameters" });
      } else {
        res.json(calculateExercises(parsedArray));
      }
    }
  }
);

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
