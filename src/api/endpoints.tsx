const BASE_URL = "http://localhost:8000";
const journalsURL = "/api/journals";
const authURL = "/auth/user";

interface AuthAPI {
  registerUser: string;
  login: string;
  getUser: string;
}

interface JournalAPI {
  createJournal: string;
  getJournals: string;
  getJournalByID: (id: string | number) => string;
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
};

const API = { authAPI, journalAPI };

export default API;
