import axios from "axios";
import { Meetings } from "../types/MeetingsType";

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
  year: string,
  countryName: string,
): Promise<Meetings> => {
  try {
    const response = await apiClient.get<Meetings[]>(
      `/meetings?year=${year}&country_name=${countryName}`,
    );
    return response.data[0];
  } catch (error) {
    console.error("Error fetching race data:", error);
    throw error;
  }
};
