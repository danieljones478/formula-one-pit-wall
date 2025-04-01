import React, { useState, useEffect } from "react";
import {
  fetchDrivers,
  fetchTeamRadio,
  fetchMeetingData,
  fetchSessions,
} from "../../api/openF1Api";
import { DriverInfo } from "../../types/DriverInfo";
import { TeamRadio } from "../../types/TeamRadio";
import "./TeamRadio.css";

const TeamRadioPage: React.FC = () => {
  const [drivers, setDrivers] = useState<DriverInfo[]>([]);
  const [sessions, setSessions] = useState<any[]>([]);
  const [selectedDriver, setSelectedDriver] = useState<number | null>(null);
  const [meetingKey, setMeetingKey] = useState<number | null>(null);
  const [teamRadios, setTeamRadios] = useState<TeamRadio[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);

        // Fetch meetings for the current year
        const meetings = await fetchMeetingData(currentYear.toString());

        // Get the last meeting in the array
        const lastMeeting = meetings[meetings.length - 1];
        if (!lastMeeting) {
          throw new Error("No meetings found for the current year.");
        }

        const lastMeetingKey = lastMeeting.meeting_key;
        setMeetingKey(lastMeetingKey ?? null);

        // Fetch drivers using the last meeting key
        if (lastMeetingKey !== undefined) {
          const driversData = await fetchDrivers(lastMeetingKey);
          setDrivers(driversData);

          // Fetch sessions for the last meeting
          const sessionsData = await fetchSessions(lastMeetingKey);
          setSessions(sessionsData);
        } else {
          throw new Error("Meeting key is undefined.");
        }
      } catch (err) {
        setError("Failed to fetch initial data.");
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, [currentYear]);

  const handleDriverChange = async (driverNumber: number) => {
    setSelectedDriver(driverNumber);
    try {
      setLoading(true);
      const radios = await fetchTeamRadio(driverNumber, meetingKey || 1);
      setTeamRadios(radios);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch team radio messages.");
      setLoading(false);
    }
  };

  return (
    <div className="team-radio-page">
      <h1>Team Radio for Previous Race Weekend</h1>

      {error && <div className="error-message">{error}</div>}

      <div className="filters">
        <div className="filter">
          <label htmlFor="driver-select">Select Driver:</label>
          <select
            id="driver-select"
            onChange={(e) => handleDriverChange(Number(e.target.value))}
            value={selectedDriver || ""}
          >
            <option value="" disabled>
              Choose a driver
            </option>
            {drivers.map((driver) => (
              <option key={driver.driver_number} value={driver.driver_number}>
                {driver.full_name} ({driver.team_name})
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="loader">Loading...</div>
      ) : (
        <div className="team-radio-list">
          {teamRadios.map((radio, index) => {
            // Match the session using the session_key from the team radio
            const session = sessions.find(
              (s) => s.session_key === radio.session_key,
            );
            return (
              <div key={index} className="team-radio-item">
                <div className="session-info">
                  <span className="session-name">
                    {session?.session_name || "Unknown Session"}
                  </span>
                  <span className="session-type">
                    {session?.session_type || "Unknown Type"}
                  </span>
                </div>
                <audio controls>
                  <source src={radio.recording_url} type="audio/mpeg" />
                  <track
                    kind="captions"
                    srcLang="en"
                    label="English captions"
                    default
                  />
                  Your browser does not support the audio element.
                </audio>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TeamRadioPage;
