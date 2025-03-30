import React from "react";
import "./DriverCard.css";
import SkeletonLoader from "../SkeletonLoader";
import { DriverInfo } from "../../types/DriverInfo";

type DriverCardProps = {
  driver?: DriverInfo;
  loading: boolean;
};

const DriverCard: React.FC<DriverCardProps> = ({ driver, loading }) => {
  if (loading) {
    return (
      <div className="driver-card">
        <SkeletonLoader lines={1} />
      </div>
    );
  }

  const teamColour = `#${driver?.team_colour}` || "#ccc";
  const gradientBackground = `linear-gradient(135deg, ${teamColour} 0%, ${teamColour}33 100%)`;

  return (
    <div className="driver-card" style={{ background: gradientBackground }}>
      <div className="driver-image-container">
        <img
          src={driver?.headshot_url}
          alt={`${driver?.full_name} headshot`}
          className="driver-image"
        />
      </div>
      <div className="driver-info">
        <h3 className="driver-name">{driver?.full_name}</h3>
        <p className="driver-team">Team: {driver?.team_name}</p>
      </div>
    </div>
  );
};

export default DriverCard;
