import type { HealthCheckEntry } from "../../types";
import HealthAndSafetySharpIcon from "@mui/icons-material/HealthAndSafetySharp";
import FavoriteSharpIcon from "@mui/icons-material/FavoriteSharp";

const HealthCheckEntry = ({ entry }: { entry: HealthCheckEntry }) => {
  if (entry.healthCheckRating === 0) {
    return (
      <>
        <p>
          {entry.date} <HealthAndSafetySharpIcon />
        </p>
        <p>{entry.description}</p>
        <FavoriteSharpIcon style={{ color: "green" }} />
        <p>diagnosed by {entry.specialist}</p>
        {entry.diagnosisCodes && <p>code</p>}
        {entry.diagnosisCodes?.map((code, index) => {
          return (
            <ul>
              <li key={index}>{code}</li>
            </ul>
          );
        })}
      </>
    );
  } else if (entry.healthCheckRating === 1) {
    return (
      <>
        <p>
          {entry.date} <HealthAndSafetySharpIcon />
        </p>
        <p>{entry.description}</p>
        <FavoriteSharpIcon style={{ color: "yellow" }} />
        <p>diagnosed by {entry.specialist}</p>
        {entry.diagnosisCodes && <p>code</p>}
        {entry.diagnosisCodes?.map((code, index) => {
          return (
            <ul>
              <li key={index}>{code}</li>
            </ul>
          );
        })}
      </>
    );
  } else if (entry.healthCheckRating === 2) {
    return (
      <>
        <p>
          {entry.date} <HealthAndSafetySharpIcon />
        </p>
        <p>{entry.description}</p>
        <FavoriteSharpIcon style={{ color: "orange" }} />
        <p>diagnosed by {entry.specialist}</p>
        {entry.diagnosisCodes && <p>code</p>}
        {entry.diagnosisCodes?.map((code, index) => {
          return (
            <ul key={index}>
              <li> key={code}</li>
            </ul>
          );
        })}
      </>
    );
  } else if (entry.healthCheckRating === 3) {
    return (
      <>
        <p>
          {entry.date} <HealthAndSafetySharpIcon />
        </p>
        <p>{entry.description}</p>
        <FavoriteSharpIcon style={{ color: "red" }} />
        <p>diagnosed by {entry.specialist}</p>
        {entry.diagnosisCodes && <p>code</p>}
        {entry.diagnosisCodes?.map((code, index) => {
          return (
            <ul>
              <li key={index}>{code}</li>
            </ul>
          );
        })}
      </>
    );
  }
};

export default HealthCheckEntry;
