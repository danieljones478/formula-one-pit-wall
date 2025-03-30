import React, { useEffect, useState } from "react";
import DriverCard from "../../components/DriverCard";
import { DriverInfo } from "../../types/DriverInfo";
import { fetchDrivers, fetchMeetingData } from "../../api/openF1Api";
import "./Drivers.css";

const Drivers: React.FC = () => {
  const [drivers, setDrivers] = useState<DriverInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const getDrivers = async () => {
      try {
        setLoading(true);
        const getMeeting = await fetchMeetingData(currentYear.toString());
        const nextRaceMeetingKey =
          getMeeting[getMeeting.length - 1]?.meeting_key;

        if (!nextRaceMeetingKey) {
          throw new Error("No meeting key found for the next race.");
        }

        const data = await fetchDrivers(nextRaceMeetingKey);
        setDrivers(data);
      } catch (error) {
        setError("Failed to fetch driver data.");
      } finally {
        setLoading(false);
      }
    };

    getDrivers();
  }, []);

  if (error) {
    return <div className="Drivers-error">{error}</div>;
  }

  return (
    <div>
      <h2>Drivers</h2>
      <div className="Drivers-list-container">
        {loading
          ? Array.from({ length: 6 }).map((_, index) => (
              <DriverCard key={index} loading={true} />
            ))
          : drivers.map((driver, index) => (
              <DriverCard key={index} driver={driver} loading={false} />
            ))}
      </div>
    </div>
  );
};

export default Drivers;
