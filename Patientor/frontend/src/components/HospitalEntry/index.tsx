import type { HospitalEntry } from "../../types";
import LocalHospitalSharpIcon from "@mui/icons-material/LocalHospitalSharp";

const HospitalEntry = ({ entry }: { entry: HospitalEntry }) => {
  return (
    <div>
      <p>
        {entry.date} <LocalHospitalSharpIcon />
      </p>
      <p>{entry.description}</p>
      <p>diagnosed by {entry.specialist}</p>
      {entry.diagnosisCodes && <p>code</p>}
      {entry.diagnosisCodes?.map((code, index) => {
        return (
          <ul key={index}>
            <li>{code}</li>
          </ul>
        );
      })}
      <p>{entry.discharge.date}</p>
      <p>discharge comment: {entry.discharge.criteria}</p>
    </div>
  );
};

export default HospitalEntry;
