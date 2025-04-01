import React from "react";
import { render, screen } from "@testing-library/react";
import * as api from "../../../src/api/openF1Api";
import LastRaceCard from "../../../src/components/LastRaceCard";

jest.mock("../../../src/api/openF1Api");

describe("LastRaceCard Component", () => {
  test("displays a skeleton loader while loading", async () => {
    jest.spyOn(api, "fetchMeetingData").mockImplementation(
      () =>
        new Promise(() => {
          /* Simulate loading */
        }),
    );

    render(<LastRaceCard />);

    const skeletonLoader = screen.getByRole("status", { name: "Loading..." });
    expect(skeletonLoader).toBeInTheDocument();
  });

  test("renders race details fetched from the API", async () => {
    const mockRaceData = [
      {
        meeting_key: 1,
        meeting_name: "Monaco Grand Prix",
        country_name: "Monaco",
        date_start: "2025-05-25",
      },
    ];

    jest.spyOn(api, "fetchMeetingData").mockResolvedValue(mockRaceData);

    render(<LastRaceCard />);

    const raceName = await screen.findByText("Monaco Grand Prix");
    const countryName = await screen.findByText("Monaco");
    const startDate = await screen.findByText("Start Date: 5/25/2025");

    expect(raceName).toBeInTheDocument();
    expect(countryName).toBeInTheDocument();
    expect(startDate).toBeInTheDocument();
  });

  test("displays an error message if the API call fails", async () => {
    jest
      .spyOn(api, "fetchMeetingData")
      .mockRejectedValue(new Error("API Error"));

    render(<LastRaceCard />);

    const errorMessage = await screen.findByText(
      "Failed to fetch next race data.",
    );
    expect(errorMessage).toBeInTheDocument();
  });
});
