import React, { useState } from "react";
import apiClient from "../api/apiClient";
import API from "../api/endpoints";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  LinearProgress,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import GeneralError from "../components/Alerts/Error";
import GeneralSuccess from "../components/Alerts/Success";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorAlert, setErrorAlert] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery("(max-width: 600px)");

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);
  const handleMouseDownPassword = (event: React.MouseEvent) => {
    event.preventDefault();
  };

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await apiClient.post<{
        token: string;
        role: string;
      }>(API.authAPI.login, { email, password });

      console.log("ROLE", response.data.role);

      // Store the token securely
      sessionStorage.setItem("token", response.data.token);

      // Determine the redirect route based on the user's role
      const roleRoutes: any = {
        ADMIN: "/get-users",
        USER: "/calendar",
      };
      const redirectTo = roleRoutes[response.data.role] || "/calendar";

      // Show success alert and navigate after a delay
      setSuccessAlert(true);
      setSuccessMsg("Login Successfully!");
      setTimeout(() => {
        navigate(redirectTo);
      }, 2000);
    } catch (err: any) {
      console.error("Login failed:", err);
      setErrorAlert(true);
      setErrorMsg(
        err.response?.data?.detail || "An unexpected error occurred."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <LinearProgress className="absolute top-0 left-0 w-full" />}
      <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
        <GeneralSuccess
          open={successAlert}
          onClose={() => setSuccessAlert(false)}
          autoHideDuration={4000}
          msg={successMsg}
        />
        <GeneralError
          open={errorAlert}
          onClose={() => setErrorAlert(false)}
          autoHideDuration={4000}
          Errmsg={errorMsg}
        />
        <Box
          className="shadow-lg p-6 rounded-lg border bg-white"
          style={{ width: isSmallScreen ? "100%" : "400px" }}
        >
          <Typography variant="h4" className="font-bold text-center mb-4">
            JournalApp
          </Typography>
          <Typography variant="h6" className="text-center mb-6">
            Login
          </Typography>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <TextField
              type="email"
              label="Email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              type={showPassword ? "text" : "password"}
              label="Password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {error && <Typography color="error">{error}</Typography>}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
              className="py-2"
            >
              {loading ? "Logging in..." : "Log in"}
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => navigate("/signup")}
            >
              Sign up
            </Button>
          </form>
        </Box>
      </div>
    </>
  );
};

export default LoginPage;
