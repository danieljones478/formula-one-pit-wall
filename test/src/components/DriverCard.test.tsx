import React from "react";
import { render, screen } from "@testing-library/react";
import DriverCard from "../../../src/components/DriverCard";

describe("DriverCard Component", () => {
  test("renders skeleton loader when loading is true", () => {
    render(<DriverCard loading={true} />);
    const skeletonLoader = screen.getByRole("status", { name: "Loading..." });
    expect(skeletonLoader).toBeInTheDocument();
  });

  test("renders driver details when loading is false", () => {
    const mockDriver = {
      full_name: "Lewis Hamilton",
      team_name: "Mercedes",
      country_code: "GB",
      headshot_url: "https://example.com/lewis.jpg",
    };

    render(<DriverCard loading={false} driver={mockDriver} />);
    const driverName = screen.getByText("Lewis Hamilton");
    const driverTeam = screen.getByText("Team: Mercedes");
    const driverCountry = screen.getByText("Country: GB");
    const driverImage = screen.getByAltText("Lewis Hamilton headshot");

    expect(driverName).toBeInTheDocument();
    expect(driverTeam).toBeInTheDocument();
    expect(driverCountry).toBeInTheDocument();
    expect(driverImage).toBeInTheDocument();
  });
});
