interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (hours: number[]): Result => {
  const target = hours[0]
  const hoursWithoutTarget = hours.slice(1)
  const totalHours = hoursWithoutTarget.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  }, 0);

  const dailyAvg = totalHours / hoursWithoutTarget.length;

  const trainedOnDays = hoursWithoutTarget.filter((item) => item !== 0);

  if (dailyAvg < ((7*target)/10)) {
    return {
      periodLength: hoursWithoutTarget.length,
      trainingDays: trainedOnDays.length,
      success: false,
      rating: 1,
      ratingDescription: "More training needed",
      target: Number(target),
      average: dailyAvg,
    };
  } else if (dailyAvg >= ((7*target)/10) && dailyAvg < target) {
    return {
      periodLength: hoursWithoutTarget.length,
      trainingDays: trainedOnDays.length,
      success: false,
      rating: 2,
      ratingDescription: "Almost there",
      target: Number(target),
      average: dailyAvg,
    };
  } else {
    return {
      periodLength: hoursWithoutTarget.length,
      trainingDays: trainedOnDays.length,
      success: true,
      rating: 3,
      ratingDescription: "You did it!",
      target: Number(target),
      average: dailyAvg,
    };
  }
};

if (require.main === module) {

  const calculateExercises = (hours: number[]): Result => {
  const totalHours = hours.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  }, 0);

  const dailyAvg = totalHours / hours.length;

  const trainedOnDays = hours.filter((item) => item !== 0);

  if (dailyAvg < 1.5) {
    return {
      periodLength: hours.length,
      trainingDays: trainedOnDays.length,
      success: false,
      rating: 1,
      ratingDescription: "More training needed",
      target: Number(process.argv[2]),
      average: dailyAvg,
    };
  } else if (dailyAvg >= 1.5 && dailyAvg < 2) {
    return {
      periodLength: hours.length,
      trainingDays: trainedOnDays.length,
      success: false,
      rating: 2,
      ratingDescription: "Almost there",
      target: Number(process.argv[2]),
      average: dailyAvg,
    };
  } else {
    return {
      periodLength: hours.length,
      trainingDays: trainedOnDays.length,
      success: true,
      rating: 3,
      ratingDescription: "You did it!",
      target: Number(process.argv[2]),
      average: dailyAvg,
    };
  }
};

const parseArgumentsExercise = (args: string[]): number[] => {
  if (args.length < 4) throw new Error("Not enough data points");

  let numbersArray = [];

  for (let i = 3; i < args.length; i++) {
    numbersArray.push(Number(args[i]));
  }

  return numbersArray;
};


try {
  console.log(calculateExercises(parseArgumentsExercise(process.argv)));
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
}


