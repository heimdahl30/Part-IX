import { useState, useEffect } from "react";
import type { Entries, NewEntry } from "../types";
import { getAll, create } from "../entryService";
import axios from "axios";

const App = () => {
  const [date, setDate] = useState("");
  const [visibility, setVisibility] = useState("");
  const [weather, setWeather] = useState("");
  const [comment, setComment] = useState("");
  const [msg, setMsg] = useState("");
  const [allentries, setAllentries] = useState<Entries[]>([]);

  useEffect(() => {
    getAll().then((data) => setAllentries(data));
  }, []);

  const addEntry = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const entryObject: NewEntry = {
      date,
      visibility,
      weather,
      comment,
    };

    create(entryObject)
      .then((data) => setAllentries(allentries.concat(data)))
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          if (error.response) {
            setMsg(error.response.data);
            setTimeout(() => {
              setMsg("");
            }, 5000);
          }
        } else if (error instanceof Error) {
          setMsg(error.message);
          setTimeout(() => {
            setMsg("");
          }, 5000);
        }
      });

    setDate("");
    setVisibility("");
    setWeather("");
    setComment("");
  };

  if (msg) {
    return (
      <>
        <h2>Add new entry</h2>
        <p style={{ color: "red" }}>{msg}</p>
        <form onSubmit={addEntry}>
          <div>
            date{" "}
            <input
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
            />
          </div>
          <div>
            visibility great{" "}
            <input
              type="radio"
              name="filterVisibility"
              onChange={() => setVisibility("great")}
            />
            good
            <input
              type="radio"
              name="filterVisibility"
              onChange={() => setVisibility("good")}
            />
            ok
            <input
              type="radio"
              name="filterVisibility"
              onChange={() => setVisibility("ok")}
            />
            poor
            <input
              type="radio"
              name="filterVisibility"
              onChange={() => setVisibility("poor")}
            />
          </div>
          <div>
            weather sunny{" "}
            <input
              type="radio"
              name="filterWeather"
              onChange={() => setWeather("sunny")}
            />
            rainy
            <input
              type="radio"
              name="filterWeather"
              onChange={() => setWeather("rainy")}
            />
            cloudy
            <input
              type="radio"
              name="filterWeather"
              onChange={() => setWeather("cloudy")}
            />
            stormy
            <input
              type="radio"
              name="filterWeather"
              onChange={() => setWeather("stormy")}
            />
            windy
            <input
              type="radio"
              name="filterWeather"
              onChange={() => setWeather("windy")}
            />
          </div>
          <div>
            comment{" "}
            <input
              value={comment}
              onChange={(event) => setComment(event.target.value)}
            />
          </div>
          <button type="submit">add</button>
        </form>
        <h2>Diary entries</h2>
        {allentries.map((entry) => {
          return (
            <div key={entry.id}>
              <h3>{entry.date}</h3>
              <p style={{ marginBottom: "-15px" }}>
                visibility: {entry.visibility}
              </p>
              <p style={{ marginBottom: "-15px" }}>weather: {entry.weather}</p>
              <p>comment: {entry.comment}</p>
            </div>
          );
        })}
      </>
    );
  } else {
    return (
      <>
        <h2>Add new entry</h2>
        <form onSubmit={addEntry}>
          <div>
            date{" "}
            <input
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
            />
          </div>
          <div>
            visibility great{" "}
            <input
              type="radio"
              name="filterVisibility"
              onChange={() => setVisibility("great")}
            />
            good
            <input
              type="radio"
              name="filterVisibility"
              onChange={() => setVisibility("good")}
            />
            ok
            <input
              type="radio"
              name="filterVisibility"
              onChange={() => setVisibility("ok")}
            />
            poor
            <input
              type="radio"
              name="filterVisibility"
              onChange={() => setVisibility("poor")}
            />
          </div>
          <div>
            weather sunny{" "}
            <input
              type="radio"
              name="filterWeather"
              onChange={() => setWeather("sunny")}
            />
            rainy
            <input
              type="radio"
              name="filterWeather"
              onChange={() => setWeather("rainy")}
            />
            cloudy
            <input
              type="radio"
              name="filterWeather"
              onChange={() => setWeather("cloudy")}
            />
            stormy
            <input
              type="radio"
              name="filterWeather"
              onChange={() => setWeather("stormy")}
            />
            windy
            <input
              type="radio"
              name="filterWeather"
              onChange={() => setWeather("windy")}
            />
          </div>
          <div>
            comment{" "}
            <input
              value={comment}
              onChange={(event) => setComment(event.target.value)}
            />
          </div>
          <button type="submit">add</button>
        </form>
        <h2>Diary entries</h2>
        {allentries.map((entry) => {
          return (
            <div key={entry.id}>
              <h3>{entry.date}</h3>
              <p style={{ marginBottom: "-15px" }}>
                visibility: {entry.visibility}
              </p>
              <p style={{ marginBottom: "-15px" }}>weather: {entry.weather}</p>
              <p>comment: {entry.comment}</p>
            </div>
          );
        })}
      </>
    );
  }
};

export default App;
