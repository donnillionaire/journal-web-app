const BASE_URL = "http://localhost:8000";
const journalsURL = "/api/journals";
const authURL = "/auth/user";
const adminURL = "/auth/admin";


interface AuthAPI {
  registerUser: string;
  login: string;
  getUser: string;
}




interface AdminAPI {
  registerAdmin: string;
  login: string;
  getAdmin: string;
  getUsers: string
}

interface JournalAPI {
  createJournal: string;
  getJournals: string;
  getJournalByID: (id: string | number) => string;
  getJournalsByDate: (date: string) => string;
  updateJournalEntryByID: (date: string) => string;
  getJournalsByYear: (year: string) => string;
  deleteJournalByID: (id: string | number) => string;
  getJournalsByCategory: (category: string | number) => string;
  getSummaries: string;
  getWordFrequency: string;
 
}

const authAPI: AuthAPI = {
  registerUser: `${BASE_URL}${authURL}/register`,
  login: `${BASE_URL}${authURL}/login`,
  getUser: `${BASE_URL}${authURL}/profile`,
};





const journalAPI: JournalAPI = {
  createJournal: `${BASE_URL}${journalsURL}`,
  getJournals: `${BASE_URL}${journalsURL}`,
  getJournalByID: (id) => `${BASE_URL}${journalsURL}/${id}`, // ID now type-checked
  getJournalsByDate: (date) => `${BASE_URL}${journalsURL}/by-date/${date}`,
  updateJournalEntryByID: (id) => `${BASE_URL}${journalsURL}/${id}`, // ID now type-checked
  getJournalsByYear: (year) => `${BASE_URL}${journalsURL}?year=${year}`,
  getJournalsByCategory: (category) =>
    `${BASE_URL}${journalsURL}by-category/${category}`,
  getSummaries: `${BASE_URL}${journalsURL}/summaries`,
  getWordFrequency :`${BASE_URL}${journalsURL}/word-frequency`,
  deleteJournalByID: (id) => `${BASE_URL}${journalsURL}/${id}`,

};



const adminAPI: AdminAPI = {
  registerAdmin: `${BASE_URL}${adminURL}/register`,
  login: `${BASE_URL}${adminURL}/login`,
  getAdmin: `${BASE_URL}${adminURL}/profile`,
  getUsers: `${BASE_URL}${adminURL}/all-users`,
};

const API = { authAPI, journalAPI, adminAPI };

export default API;
