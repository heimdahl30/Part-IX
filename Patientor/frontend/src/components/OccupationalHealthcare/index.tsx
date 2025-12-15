import type { OccupationalHealthcareEntry } from "../../types";
import MedicalServicesSharpIcon from "@mui/icons-material/MedicalServicesSharp";

const OccupationalHealthcareEntry = ({
  entry,
}: {
  entry: OccupationalHealthcareEntry;
}) => {
  return (
    <>
      <p>
        {entry.date} <MedicalServicesSharpIcon /> {entry.employerName}
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
      {entry.sickLeave && (
        <p>
          {" "}
          sick leave from {entry.sickLeave.startDate} to{" "}
          {entry.sickLeave.endDate}
        </p>
      )}
    </>
  );
};

export default OccupationalHealthcareEntry;
