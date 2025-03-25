import React, { useState } from "react";
import apiClient from "../api/apiClient";
import API from "../api/endpoints";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);
  const handleMouseDownPassword = (event: React.MouseEvent) => {
    event.preventDefault();
  };

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await apiClient.post<{ access_token: string; token_type: string }>(
        API.authAPI.login,
        { email, password }
      );

      console.log("response",response.data.access_token)
      localStorage.setItem("token", response.data.access_token);
      alert("Login Successful!");
      navigate("/calendar")
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative h-screen bg-white select-none flex justify-center items-center">
      <Box className="shadow-xl p-6 rounded-lg border w-[400px]">
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
          <Button type="submit" variant="contained" color="primary" disabled={loading}>
            {loading ? "Logging in..." : "Log in"}
          </Button>
          <Button variant="outlined" color="secondary" onClick={() => navigate("/signup")}>Sign up</Button>
        </form>
      </Box>
    </div>
  );
};

export default LoginPage;

