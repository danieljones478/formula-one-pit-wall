import React, { useEffect, useState } from "react";
import { fetchMeetingData } from "../../api/openF1Api";
import { Meetings } from "../../types/MeetingsType";
import "./RaceData.css";

const RaceData: React.FC = () => {
  const [year, setYear] = useState<string>("2025");
  const [isLoading, setIsLoading] = useState(false);
  const [races, setRaces] = useState<Meetings[]>();
  const [error, setError] = useState<string>();

  const years = (back: number) => {
    const year = new Date().getFullYear();
    return Array.from({ length: back }, (v, i) => year - back + i + 1);
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setIsLoading(true);

        const meetings = await fetchMeetingData(year?.toString());

        setRaces(meetings);
      } catch (err) {
        setError("Failed to fetch initial data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialData();
  }, [year]);

  return (
    <div>
      <h2>Race Data</h2>
      <div className="filterYear">
        <select
          id="year-select"
          onChange={(e) => setYear(e.target.value)}
          value={year || ""}
        >
          <option value="" disabled>
            Choose a year
          </option>
          {years(10).map((previousYear) => (
            <option key={previousYear} value={previousYear}>
              {previousYear}
            </option>
          ))}
        </select>
      </div>
      {races?.length != 0 ? (
        <React.Fragment>
          <h3>Previous Races for {year?.toString()}</h3>
          <ol>
            {races?.map((race) => (
              <li key={race.meeting_key}>{race.location}</li>
            ))}
          </ol>
        </React.Fragment>
      ) : (
        <p>Unavailable to get races for the selected year...</p>
      )}
    </div>
  );
};

export default RaceData;
