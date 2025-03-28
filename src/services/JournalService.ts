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

// Define the request payload type
export interface JournalCreateRequest {
  title: string;
  body: string;
  journal_category?: string; // Optional category
  //   created_at?: string; // Optional, defaults to current date on the backend
}

// Function to fetch journal entries by date
// Function to fetch journal entries by date
export const getJournalsByDate = async (
  date: string
): Promise<JournalListResponse> => {
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

// Function to create a new journal entry
export const createJournal = async (
  data: JournalCreateRequest
): Promise<any> => {
  console.log("data", data);
  try {
    const response = await apiClient.post(API.journalAPI.createJournal, data);

    console.log("response:->", response.data.data);
    return response.data.data; // Return the parsed response data
  } catch (error) {
    console.error("Error creating journal entry:", error);
    throw error; // Re-throw the error for handling in the component
  }
};

// Update an existing journal entry
// Update an existing journal entry
export const updateJournal = async (id: string, data: any) => {

    console.log("id", id)

    console.log("journal data", data)
  try {
    const response = await apiClient.put(
      API.journalAPI.updateJournalEntryByID(id),
      data
    );

    console.log("response data", response.data)
   
    return response.data; // Return the parsed response data

  } catch (error) {
    console.error("Error updating journal entry:", error);
    throw error; // Re-throw the error for handling in the component
  }
};







export const getJournalsByYear = async (
    year: string
  ): Promise<JournalListResponse> => {
    try {
      const response = await apiClient.get<JournalListResponse>(
        API.journalAPI.getJournalsByYear(year) // Use the endpoint function with the year parameter
      );
      return response.data; // Return the parsed response data
    } catch (error) {
      console.error("Error fetching journals by year:", error);
      throw error; // Re-throw the error for handling in the component
    }
  };


//delete journal
  export const deleteJournal = async (journalId: string): Promise<void> => {
    try {
      await apiClient.delete(API.journalAPI.deleteJournalByID(journalId)); // Use API endpoint function
    } catch (error) {
      console.error("Error deleting journal:", error);
      throw error; // Re-throw for handling in the component
    }
  };
  



//get summaries
  export const getSummaries = async () => {
    try {
      const response = await apiClient.get(API.journalAPI.getSummaries);
      return response.data;
    } catch (error) {
      console.error("Error fetching summaries:", error);
      throw error; // Re-throw for handling in the component
    }
  };



//get word frequency
  export const getWordFrequency = async () => {
    try {
      const response = await apiClient.get(API.journalAPI.getWordFrequency);
      return response.data;
    } catch (error) {
      console.error("Error fetching word frequency:", error);
      throw error;
    }
  };
  