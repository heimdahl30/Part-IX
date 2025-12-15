import type { CoursePart } from "../src/App";

interface MyCompType {
  courses: CoursePart[];
}

const Part = (props: MyCompType) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  return (
    <>
      {props.courses.map((part, index) => {
        switch (part.kind) {
          case "basic":
            return (
              <div key={index}>
                <h2>
                  {part.name} {part.exerciseCount}
                </h2>
                <i>{part.description}</i>
              </div>
            );
          case "group":
            return (
              <div key={index}>
                <h2>
                  {part.name} {part.exerciseCount}
                </h2>
                <p>project exercises {part.groupProjectCount}</p>
              </div>
            );

          case "background":
            return (
              <div key={index}>
                <h2>
                  {part.name} {part.exerciseCount}
                </h2>
                <i>{part.description}</i>
                <p>submit to {part.backgroundMaterial}</p>
              </div>
            );

          case "special":
            return (
              <div key={index}>
                <h2>
                  {part.name} {part.exerciseCount}
                </h2>
                <i>{part.description}</i>
                <p>
                  required skils: {part.requirements[0]} ,{" "}
                  {part.requirements[1]}
                </p>
              </div>
            );

          default:
            assertNever(part);
            break;
        }
      })}
    </>
  );
};
export default Part;
