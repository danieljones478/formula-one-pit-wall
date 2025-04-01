import React, { useEffect, useState } from "react";
import { fetchMeetingData } from "../../api/openF1Api";
import "./LastRaceCard.css";
import { Meetings } from "../../types/MeetingsType";
import SkeletonLoader from "../SkeletonLoader";

const LastRaceCard: React.FC = () => {
  const [raceData, setRaceData] = useState<Meetings | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const getNextRace = async () => {
      try {
        setLoading(true);
        const data = await fetchMeetingData(currentYear.toString());
        const nextRace = data.length > 0 ? data[data.length - 1] : null;

        setRaceData(nextRace);
      } catch (err) {
        setError("Failed to fetch next race data.");
      } finally {
        setLoading(false);
      }
    };

    getNextRace();
  }, []);

  if (error) {
    return <div className="LastRaceCard-error">{error}</div>;
  }

  return (
    <div className="LastRaceCard">
      <h2>Previous Race Weekend</h2>
      {raceData && !loading ? (
        <>
          <p className="LastRaceCard-title">{raceData.meeting_name}</p>
          <p className="LastRaceCard-country">{raceData.country_name}</p>
          <p className="LastRaceCard-date">
            Start Date:{" "}
            {raceData.date_start
              ? new Date(raceData.date_start).toLocaleDateString()
              : "Date not available"}
          </p>
        </>
      ) : (
        <SkeletonLoader lines={2} />
      )}
    </div>
  );
};

export default LastRaceCard;
