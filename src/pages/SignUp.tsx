// import React, { useState } from "react";
// import apiClient from "../api/apiClient"; // Import API client
// import API from "../api/endpoints"; // Import API endpoints
// import { useNavigate } from "react-router-dom";
// import {
//   Box,
//   Button,
//   IconButton,
//   InputAdornment,
//   LinearProgress,
//   TextField,
//   Typography,
// } from "@mui/material";
// import { MdVisibility, MdVisibilityOff } from "react-icons/md";
// import GeneralSuccess from "../components/Alerts/Success";
// import GeneralError from "../components/Alerts/Error";

// const SignupPage: React.FC = () => {
//   const [formData, setFormData] = useState({
//     first_name: "",
//     last_name: "",
//     email: "",
//     password: "",
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [successAlert, setSuccessAlert] = useState(false);
//   const [successMsg, setSuccessMsg] = useState("");
//   const [errorAlert, setErrorAlert] = useState(false);
//   const [errorMsg, setErrorMsg] = useState("");
//   const navigate = useNavigate();

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     // Validate that no fields are empty
//     const { first_name, last_name, email, password } = formData;

//     if (!first_name.trim() || !last_name.trim() || !email.trim() || !password.trim()) {
//       setErrorAlert(true);
//       setErrorMsg("All fields are required. Please fill out the form completely.");
//       return; // Stop further execution if validation fails
//     }

//     setLoading(true);
//     setError(null);

//     try {
//       const response = await apiClient.post<{ token: string }>(
//         API.authAPI.registerUser,
//         formData
//       );
//       console.log("Signup Successful:", response.data);
//       sessionStorage.setItem("token", response.data.token);

//       setSuccessAlert(true);
//       setSuccessMsg("Signup Successful!");
//       setTimeout(() => {
//         navigate("/login");
//       }, 2000); // 2-second delay
//     } catch (err: any) {
//       setErrorAlert(true);
//       setErrorMsg(err.response?.data?.detail || "Signup failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       {loading && <LinearProgress />}

//       <GeneralSuccess
//         open={successAlert}
//         onClose={() => setSuccessAlert(false)}
//         autoHideDuration={4000}
//         msg={successMsg}
//       />

//       <GeneralError
//         open={errorAlert}
//         onClose={() => setErrorAlert(false)}
//         autoHideDuration={4000}
//         Errmsg={errorMsg}
//       />

//       <div className="relative h-screen bg-white select-none flex justify-center items-center">
//         <Box
//           sx={{ width: 400, padding: 4 }}
//           className="shadow-xl shadow-gray-400 rounded-lg border"
//         >
//           <Typography variant="h4" align="center" fontWeight="bold">
//             JournalApp
//           </Typography>
//           <Typography variant="subtitle1" align="center" gutterBottom>
//             Create Account
//           </Typography>
//           {error && <Typography color="error">{error}</Typography>}
//           <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
//             <TextField
//               type="text"
//               fullWidth
//               placeholder="First Name"
//               name="first_name"
//               value={formData.first_name}
//               onChange={handleChange}
//             />
//             <TextField
//               type="text"
//               fullWidth
//               placeholder="Last Name"
//               name="last_name"
//               value={formData.last_name}
//               onChange={handleChange}
//             />
//             <TextField
//               type="email"
//               fullWidth
//               placeholder="Email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//             />
//             <TextField
//               type={showPassword ? "text" : "password"}
//               fullWidth
//               placeholder="Password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               InputProps={{
//                 endAdornment: (
//                   <InputAdornment position="end">
//                     <IconButton onClick={() => setShowPassword(!showPassword)}>
//                       {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
//                     </IconButton>
//                   </InputAdornment>
//                 ),
//               }}
//             />
//             <Button
//               type="submit"
//               variant="contained"
//               color="primary"
//               fullWidth
//               disabled={loading}
//             >
//               {loading ? "Creating Account..." : "Create Account"}
//             </Button>
//           </form>
//         </Box>
//       </div>
//     </>
//   );
// };

// export default SignupPage;



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
import GeneralSuccess from "../components/Alerts/Success";
import GeneralError from "../components/Alerts/Error";

const SignupPage: React.FC = () => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorAlert, setErrorAlert] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await apiClient.post<{ token: string }>(
        API.authAPI.registerUser,
        formData
      );
      sessionStorage.setItem("token", response.data.token);
      setSuccessAlert(true);
      setSuccessMsg("Signup Successful!");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err: any) {
      setErrorAlert(true);
      setErrorMsg(err.response?.data?.detail || "Signup failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <LinearProgress />}

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

      <div className="flex justify-center items-center h-screen bg-white">
        <Box
          className="shadow-xl rounded-lg border p-6 sm:p-8"
          sx={{
            width: isMobile ? "90%" : 400,
          }}
        >
          <Typography variant="h4" align="center" fontWeight="bold">
            JournalApp
          </Typography>
          <Typography variant="subtitle1" align="center" gutterBottom>
            Create Account
          </Typography>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
            <TextField
              type="text"
              fullWidth
              placeholder="First Name"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              required
            />
            <TextField
              type="text"
              fullWidth
              placeholder="Last Name"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              required
            />
            <TextField
              type="email"
              fullWidth
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <TextField
              type={showPassword ? "text" : "password"}
              fullWidth
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
              {loading ? "Creating Account..." : "Create Account"}
            </Button>
            <Button variant="outlined" color="secondary" fullWidth onClick={() => navigate("/login")}>
              Back to Login
            </Button>
          </form>
        </Box>
      </div>
    </>
  );
};

export default SignupPage;
