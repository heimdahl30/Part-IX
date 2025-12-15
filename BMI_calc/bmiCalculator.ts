interface Values {
  height: number;
  weight: number;
}

export const calculateBmi = (heightCm: number, weightKg: number): string => {
  const heightInMetres = heightCm / 100;
  const BMI = parseFloat(
    (weightKg / (heightInMetres * heightInMetres)).toFixed(2)
  );

  if (BMI <= 25 && BMI >= 19) {
    return "Normal range/weight";
  } else if (BMI < 19) {
    return "Underweight";
  } else if (BMI > 25 && BMI <= 30) {
    return "Overweight";
  } else if (BMI > 30 && BMI <= 35) {
    return "Moderately obese";
  } else if (BMI > 35 && BMI <= 40) {
    return "Severely obese";
  } else {
    return "Red Alert";
  }
};

if (require.main === module) {
  const parseArguments = (args: string[]): Values => {
    if (args.length < 4) throw new Error("Not enough arguments");
    if (args.length > 4) throw new Error("Too many arguments");

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
      return {
        height: Number(args[2]),
        weight: Number(args[3]),
      };
    } else {
      throw new Error("Provided values were not numbers!");
    }
  };

  try {
    const { height, weight } = parseArguments(process.argv);
    console.log(calculateBmi(height, weight));
  } catch (error: unknown) {
    let errorMessage = "Something bad happened.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    console.log(errorMessage);
  }
}
