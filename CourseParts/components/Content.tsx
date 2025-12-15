import type { CoursePart } from "../src/App";
import Part from "./Part";

interface MyComponentProps {
  courseParts: CoursePart[];
}

const Content = (props: MyComponentProps) => {
  return (
    <>
      <Part courses={props.courseParts} />
    </>
  );
};

export default Content;
