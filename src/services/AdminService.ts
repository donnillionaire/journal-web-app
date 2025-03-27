
import apiClient from "../api/apiClient";
import API from "../api/endpoints"; // Import the API endpoints




//get all users
export const getUsers = async () => {
    try {
      const response = await apiClient.get(API.adminAPI.getUsers);
      return response.data;
    } catch (error) {
      console.error("Error fetching summaries:", error);
      throw error; // Re-throw for handling in the component
    }
  };
