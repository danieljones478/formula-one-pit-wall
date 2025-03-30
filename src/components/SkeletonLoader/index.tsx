import React from "react";
import "./SkeletonLoader.css";

type SkeletonLoaderProps = {
  /**
   * Number of lines to display in the skeleton loader.
   * @param {number} lines - The number of lines.
   * @returns {JSX.Element} - The skeleton loader component.
   */
  lines: number;
};

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ lines }) => {
  return (
    <div className="SkeletonLoader" role="status" aria-label="Loading...">
      <div className="skeleton-title"></div>
      {Array.from({ length: lines }).map((_, index) => (
        <div key={index} className="skeleton-line"></div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
