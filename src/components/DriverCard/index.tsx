import React from "react";
import "./DriverCard.css";
import SkeletonLoader from "../SkeletonLoader";
import { DriverInfo } from "../../types/DriverInfo";

type DriverCardProps = {
  driver?: DriverInfo; // Optional because it won't be available during loading
  loading: boolean;
};

const DriverCard: React.FC<DriverCardProps> = ({ driver, loading }) => {
  if (loading) {
    return (
      <div className="driver-card">
        <SkeletonLoader lines={4} />
      </div>
    );
  }

  return (
    <div className="driver-card">
      <img
        src={driver?.headshot_url}
        alt={`${driver?.full_name} headshot`}
        className="driver-image"
      />
      <h3 className="driver-name">{driver?.full_name}</h3>
      <p className="driver-team">Team: {driver?.team_name}</p>
      <p className="driver-country">Country: {driver?.country_code}</p>
    </div>
  );
};

export default DriverCard;
