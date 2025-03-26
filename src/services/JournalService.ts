// journalService.ts
import apiClient from "../api/apiClient";
import API from "../api/endpoints"; // Import the API endpoints


// the response type based on your API's response structure
export interface JournalResponse {
  id: number;
  title: string;
  content: string;
  created_at: string; // Adjust the type if using a Date object
}

export interface JournalListResponse {
  status: string;
  message: string;
  data: JournalResponse[];
  total: number;
}

// Function to fetch journal entries by date
// Function to fetch journal entries by date
export const getJournalsByDate = async (date: string): Promise<JournalListResponse> => {
    try {
      const response = await apiClient.get<JournalListResponse>(
        API.journalAPI.getJournalsByDate(date) // Use the endpoint function with the date parameter
      );
      return response.data; // Return the parsed response data
    } catch (error) {
      console.error("Error fetching journals by date:", error);
      throw error; // Re-throw the error for handling in the component
    }
  };