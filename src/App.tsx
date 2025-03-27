import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import CalendarApp from "./components/Calendar";
import { HashRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/SignUp";
import SummariesPage from "./pages/Summaries";
import WordCloudComponent from "./components/WordCloud";
function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      {/* <LoginPage /> */}

      <HashRouter>
        <Routes>
          <Route index element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/calendar" element={<CalendarApp />} />
          <Route path="/summaries" element={<SummariesPage />} />
          <Route path="/word-cloud" element={<WordCloudComponent />} />
          
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
