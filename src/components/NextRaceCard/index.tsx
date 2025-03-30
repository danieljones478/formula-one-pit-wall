import React, { useEffect, useState } from "react";
import { fetchMeetingData } from "../../api/openF1Api";
import "./NextRaceCard.css";
import { Meetings } from "../../types/MeetingsType";
import SkeletonLoader from "../SkeletonLoader";

const NextRaceCard: React.FC = () => {
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
    return <div className="NextRaceCard-error">{error}</div>;
  }

  return (
    <div className="NextRaceCard">
      <h2>Next Race Weekend</h2>
      {raceData && !loading ? (
        <>
          <p className="NextRaceCard-title">{raceData.meeting_name}</p>
          <p className="NextRaceCard-country">{raceData.country_name}</p>
          <p className="NextRaceCard-date">
            Start Date:{" "}
            {raceData.date_start
              ? new Date(raceData.date_start).toLocaleDateString()
              : "Date not available"}
          </p>
        </>
      ) : (
        <SkeletonLoader lines={3} />
      )}
    </div>
  );
};

export default NextRaceCard;
