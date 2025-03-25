import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import CalendarApp from "./components/Calendar";
import Button from "@mui/material/Button";
import { HashRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/SignUp";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* <LoginPage /> */}

      <HashRouter>
        <Routes>
          <Route index element={<LoginPage />} />

          <Route path="/cal" element={<CalendarApp />} />
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
