import axios from "axios";
import { Meetings } from "../types/MeetingsType";
import { DriverInfo } from "../types/DriverInfo";

const BASE_URL = "https://api.openf1.org/v1";

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer YOUR_API_KEY`, // Replace with your actual API key
  },
});

/**
 * Provides information about meetings.
 * A meeting refers to a Grand Prix or testing weekend and usually includes multiple sessions (practice, qualifying, race, ...).
 *
 * Get Single Meeting
 * @param year - The year of the meeting.
 * @param countryName - The name of the country where the meeting is held.
 * @returns A promise that resolves to the meeting data.
 */
export const fetchMeetingData = async (
  year?: string,
  countryName?: string,
): Promise<Meetings[]> => {
  try {
    const params = new URLSearchParams();
    if (year) params.append("year", year);
    if (countryName) params.append("country_name", countryName);

    const response = await apiClient.get<Meetings[]>(
      `/meetings?${params.toString()}`,
    );
    return response.data;
  } catch (error) {
    throw Error(`Error fetching race data: ${error}`);
  }
};

/**
 * Provides information about drivers for current season.
 * @param meeting_key - The key of the meeting.
 * @returns A promise that resolves to the driver information.
 */

export const fetchDrivers = async (
  meeting_key: number,
): Promise<DriverInfo[]> => {
  try {
    const response = await apiClient.get<DriverInfo[]>(
      `/drivers?meeting_key=${meeting_key}`,
    );

    // Remove duplicates by driver_number
    const uniqueDrivers = response.data.filter(
      (driver, index, self) =>
        index ===
        self.findIndex((d) => d.driver_number === driver.driver_number),
    );

    return uniqueDrivers;
  } catch (error) {
    throw Error(`Error fetching drivers: ${error}`);
  }
};
