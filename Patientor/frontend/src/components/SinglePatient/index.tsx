import { getOnePatient, createEntry } from "../../services/patients.ts";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Divider } from "@mui/material";
import { Entry, NewEntryDataWithoutId } from "../../types";
import { HealthCheckRating } from "../../types";
import EntryDetails from "../EntryDetails/index";
import Button from "@mui/material/Button";
import { MultiValue } from "react-select";
import Select from "react-select";

interface Onepatient {
  id?: string;
  name?: string;
  dateOfBirth?: string;
  gender?: string;
  occupation?: string;
  ssn?: string;
  entries?: Entry[];
}

interface OptionType {
  value: HealthCheckRating;
  label: string;
}

interface CodesType {
  value: string;
  label: string;
}

const SinglePatient = () => {
  const { id } = useParams();
  console.log("param", id);
  const [searchedPatient, setSearchedPatient] = useState<Onepatient>({});
  const [showSelection, setShowSelection] = useState<Boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>("none");
  const [describe, setDescribe] = useState<string>("");
  const [dat, setDat] = useState<string>("");
  const [specialise, setSpecialise] = useState<string>("");
  const [rating, setRating] = useState<HealthCheckRating | string>("");
  const [employer, setEmployer] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [dischargeDate, setDischargeDate] = useState<string>("");
  const [criteria, setCriteria] = useState<string>("");
  const [error, setError] = useState<string>();
  const [selectedCodes, setSelectedCodes] = useState<MultiValue<CodesType>>([]);
  const [diagnosis, setDiagnosis] = useState<string[]>([]);

  const options: OptionType[] = [
    { value: 0, label: "Healthy" },
    { value: 1, label: "Low Risk" },
    { value: 2, label: "High Risk" },
    { value: 3, label: "Critical" },
  ];

  const diagnosisCodes: CodesType[] = [
    { value: "M24.2", label: "M24.2" },
    { value: "M51.2", label: "M51.2" },
    { value: "S03.5", label: "S03.5" },
    { value: "J10.1", label: "J10.1" },
    { value: "J06.9", label: "J06.9" },
    { value: "Z57.1", label: "Z57.1" },
    { value: "N30.0", label: "N30.0" },
    { value: "J03.0", label: "J03.0" },
    { value: "L60.1", label: "L60.1" },
    { value: "Z74.3", label: "Z74.3" },
    { value: "L20", label: "L20" },
    { value: "F43.2", label: "F43.2" },
    { value: "S62.5", label: "S62.5" },
    { value: "H35.29", label: "H35.29" },
  ];

  console.log("before", searchedPatient);

  useEffect(() => {
    getOnePatient(id as string).then((data) => setSearchedPatient(data));
  }, [id]);

  console.log("after", searchedPatient);

  const handleClick = () => {
    setShowSelection(!showSelection);
  };

  const handleSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  const handleCancel = () => {
    if (selectedOption === "HealthCheck") {
      setDescribe("");
      setDat("");
      setSpecialise("");
      setSelectedCodes([]);
      setRating(HealthCheckRating.Healthy);
    } else if (selectedOption === "OccupationalHealthcare") {
      setDescribe("");
      setDat("");
      setSpecialise("");
      setSelectedCodes([]);
      setEmployer("");
      setStartDate("");
      setEndDate("");
    } else {
      setDescribe("");
      setDat("");
      setSpecialise("");
      setSelectedCodes([]);
      setDischargeDate("");
      setCriteria("");
    }
  };

  const handleCodeChange = (selectedOptions: MultiValue<CodesType>) => {
    setSelectedCodes(selectedOptions);
    const selectionCodes = selectedOptions.map((option) => option.value);
    setDiagnosis(selectionCodes);
  };

  const handleEntrySubmission = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    let object: NewEntryDataWithoutId;
    if (selectedOption === "HealthCheck") {
      object = {
        description: describe,
        date: dat,
        specialist: specialise,
        healthCheckRating: rating as HealthCheckRating,
        ...(diagnosis.length > 0 && { diagnosisCodes: diagnosis }),
        type: "HealthCheck",
      };
    } else if (selectedOption === "OccupationalHealthcare") {
      object = {
        description: describe,
        date: dat,
        specialist: specialise,
        ...(diagnosis.length > 0 && { diagnosisCodes: diagnosis }),
        type: "OccupationalHealthcare",
        employerName: employer,
        ...(startDate &&
          endDate && { sickLeave: { startDate: startDate, endDate: endDate } }),
      };
    } else {
      object = {
        description: describe,
        date: dat,
        specialist: specialise,
        ...(diagnosis.length > 0 && { diagnosisCodes: diagnosis }),
        type: "Hospital",
        discharge: { date: dischargeDate, criteria: criteria },
      };
    }
    console.log("object", object);

    createEntry(object, searchedPatient.id as string)
      .then((data) => {
        const duplicate: Onepatient = { ...searchedPatient };
        duplicate.entries = duplicate.entries?.concat(data);
        setSearchedPatient(duplicate);
      })
      .catch((e: unknown) => {
        if (axios.isAxiosError(e)) {
          if (e?.response?.data && typeof e?.response?.data === "string") {
            const message = e.response.data.replace(
              "Something went wrong. Error: ",
              ""
            );
            console.error(message);
            setError(message);
          } else {
            setError("Unrecognized axios error");
          }
        } else {
          console.error("Unknown error", e);
          setError("Unknown error");
        }
      });
  };

  const onRatingChange = (event: {
    preventDefault: () => void;
    target: { value: string };
  }) => {
    event.preventDefault();
    if (typeof event.target.value === "string") {
      const value = event.target.value;
      const healthRating = Object.values(HealthCheckRating).find(
        (r) => r.toString() === value
      );
      if (healthRating) {
        setRating(healthRating);
      }
    }
  };

  if (Object.values(searchedPatient).length > 0) {
    return (
      <>
        <Divider hidden />
        <h2>{searchedPatient?.name}</h2>
        <div>
          <p>{searchedPatient?.gender}</p>
          <p>{searchedPatient?.dateOfBirth}</p>
          <p>{searchedPatient?.occupation}</p>
          <p>{searchedPatient?.ssn}</p>
        </div>
        <h3>entries</h3>
        {searchedPatient.entries?.map((entry, index) => {
          return (
            <div
              key={index}
              style={{
                border: "2px solid black",
                marginBottom: "7px",
                paddingLeft: "3px",
              }}
            >
              <EntryDetails entry={entry} />
              {error && <p>{error}</p>}
            </div>
          );
        })}
        <Button variant="contained" color="primary" onClick={handleClick}>
          Add an entry
        </Button>
        {showSelection && (
          <div>
            <label style={{ cursor: "pointer" }}>HealthCheck </label>
            <input
              type="radio"
              name="forms"
              value="HealthCheck"
              checked={selectedOption === "HealthCheck"}
              onChange={handleSelection}
              style={{ cursor: "pointer" }}
            />

            <label style={{ cursor: "pointer" }}>OccupationalHealthcare </label>
            <input
              type="radio"
              name="forms"
              value="OccupationalHealthcare"
              checked={selectedOption === "OccupationalHealthcare"}
              onChange={handleSelection}
              style={{ cursor: "pointer" }}
            />

            <label style={{ cursor: "pointer" }}>Hospital </label>
            <input
              type="radio"
              name="forms"
              value="Hospital"
              checked={selectedOption === "Hospital"}
              onChange={handleSelection}
              style={{ cursor: "pointer" }}
            />
          </div>
        )}

        {selectedOption === "HealthCheck" && showSelection && (
          <form onSubmit={handleEntrySubmission}>
            type <input type="text" value="HealthCheck" readOnly />
            description{" "}
            <input
              type="text"
              value={describe}
              onChange={(event) => setDescribe(event.target.value)}
              required
            />
            date{" "}
            <input
              type="date"
              value={dat}
              onChange={(event) => setDat(event.target.value)}
              required
            />
            specialist{" "}
            <input
              type="string"
              value={specialise}
              onChange={(event) => setSpecialise(event.target.value)}
              required
            />
            diagnosisCodes{" "}
            <Select
              isMulti
              name="diagnosisCodes"
              options={diagnosisCodes}
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={handleCodeChange}
              value={selectedCodes}
              placeholder="Select one or more..."
            />
            <label>healthCheckRating </label>
            <select value={rating} onChange={onRatingChange}>
              <option value="" disabled>
                Select an option
              </option>
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <button type="submit">Add</button>
            <button type="button" onClick={handleCancel}>
              Cancel
            </button>
          </form>
        )}
        {selectedOption === "OccupationalHealthcare" && showSelection && (
          <form onSubmit={handleEntrySubmission}>
            type <input type="text" value="OccupationalHealthcare" readOnly />
            description{" "}
            <input
              type="text"
              value={describe}
              onChange={(event) => setDescribe(event.target.value)}
              required
            />
            date{" "}
            <input
              type="date"
              value={dat}
              onChange={(event) => setDat(event.target.value)}
              required
            />
            specialist{" "}
            <input
              type="string"
              value={specialise}
              onChange={(event) => setSpecialise(event.target.value)}
              required
            />
            diagnosisCodes{" "}
            <Select
              isMulti
              name="diagnosisCodes"
              options={diagnosisCodes}
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={handleCodeChange}
              value={selectedCodes}
              placeholder="Select one or more..."
            />
            employerName{" "}
            <input
              type="string"
              value={employer}
              onChange={(event) => setEmployer(event.target.value)}
              required
            />
            sickLeave startDate{" "}
            <input
              type="date"
              value={startDate}
              onChange={(event) => setStartDate(event.target.value)}
            />
            sickLeave endDate{" "}
            <input
              type="date"
              value={endDate}
              onChange={(event) => setEndDate(event.target.value)}
            />
            <button type="submit">Add</button>
            <button type="button" onClick={handleCancel}>
              Cancel
            </button>
          </form>
        )}
        {selectedOption === "Hospital" && showSelection && (
          <form onSubmit={handleEntrySubmission}>
            type <input type="text" value="Hospital" readOnly />
            description{" "}
            <input
              type="text"
              value={describe}
              onChange={(event) => setDescribe(event.target.value)}
              required
            />
            date{" "}
            <input
              type="date"
              value={dat}
              onChange={(event) => setDat(event.target.value)}
              required
            />
            specialist{" "}
            <input
              type="string"
              value={specialise}
              onChange={(event) => setSpecialise(event.target.value)}
              required
            />
            diagnosisCodes{" "}
            <Select
              isMulti
              name="diagnosisCodes"
              options={diagnosisCodes}
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={handleCodeChange}
              value={selectedCodes}
              placeholder="Select one or more..."
            />
            discharge Date{" "}
            <input
              type="date"
              value={dischargeDate}
              onChange={(event) => setDischargeDate(event.target.value)}
              required
            />
            discharge Criteria{" "}
            <input
              type="string"
              value={criteria}
              onChange={(event) => setCriteria(event.target.value)}
              required
            />
            <button type="submit">Add</button>
            <button type="button" onClick={handleCancel}>
              Cancel
            </button>
          </form>
        )}
      </>
    );
  }
};

export default SinglePatient;
