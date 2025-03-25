// import React, { useState } from "react";
// import apiClient from "../api/apiClient"; // Import API client
// import API from "../api/endpoints"; // Import API endpoints
// import * as Yup from "yup";
// import { useNavigate } from "react-router-dom";

// import {
//   Box,
//   Button,
//   IconButton,
//   InputAdornment,
//   TextField,
//   Typography,
// } from "@mui/material";

// import {
//   MdAccountCircle,
//   MdEmail,
//   MdVisibility,
//   MdVisibilityOff,
// } from "react-icons/md";

// import { useFormik } from "formik";

// const LoginPage: React.FC = () => {
//   const [email, setEmail] = useState<string>("");
//   const [password, setPassword] = useState<string>("");
//   const [error, setError] = useState<string | null>(null);
//   const handleClickShowPassword = () => setShowPassword((show) => !show);
//   const [showPassword, setShowPassword] = React.useState(false);
//   const [openLoginSuccess, setOpenLoginSuccess] = React.useState(false);
//   const [openLoginFailed, setOpenLoginFailed] = React.useState(false);
//   const [loading, setLoading] = React.useState(false);
//   const navigate = useNavigate();

//   const handleLogin = async () => {
//     setLoading(true);
//     setError(null);

//     try {
//       const response = await apiClient.post<{ token: string }>(
//         API.authAPI.login,
//         { email, password }
//       );
//       console.log("Login Successful:", response.data);

//       // Store token in localStorage (optional)
//       localStorage.setItem("token", response.data.token);

//       alert("Login Successful!");
//     } catch (err: any) {
//       console.error("Login Error:", err.response?.data?.message || err.message);
//       setError(
//         err.response?.data?.message || "Login failed. Please try again."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleMouseDownPassword = (event: any) => {
//     event.preventDefault();
//   };

//   const validationSchema = Yup.object({
//     email: Yup.string().required("email is required"),
//     password: Yup.string().required("password is required"),
//   });

//   const formikSubmit = useFormik({
//     initialValues: {
//       email: "",
//       password: "",
//     },
//     validationSchema: validationSchema,
//     onSubmit: (values) => {
//       console.log("form data:-", values);

//       //   postLoginCreds(values.email.trim(), values.password.trim());
//     },
//   });

//   return (
//     <div className="relative h-screen bg-white select-none">
//       <div className="flex bg-white ">
//         <Box
//           sx={{ width: [390, 600] }}
//           style={myComponentStyle}
//           className="shadow-xl shadow-gray-400 rounded-lg border"
//         >
//           {/* <img src={LOGO} alt="componay_logo" style={company_logo} /> */}
//           <div className="header" style={Header}>
//             <Typography
//               sx={{ fontSize: [30, 48], fontWeight: "bold", color: "#000" }}
//             >
//               JournalApp
//             </Typography>

//             <div className="underline" style={underline}></div>
//             <Typography
//               className="text-sm"
//               sx={{ fontSize: [12, 20], color: "#000" }}
//             >
//               Login
//             </Typography>
//           </div>
//           <form
//             onSubmit={formikSubmit.handleSubmit}
//             className="flex flex-col w-full"
//           >
//             <div className="flex flex-col justify-center text-center gap-3 mt-8">
//               <div className="input">
//                 <TextField
//                   //   InputProps={{
//                   //     endAdornment: (
//                   //       <InputAdornment position="start">
//                   //         <MdEmail size={22} />
//                   //       </InputAdornment>
//                   //     ),
//                   //   }}
//                   type="email"
//                   // style={inputfield}
//                   sx={{ width: [550, 400] }}
//                   placeholder="email"
//                   name="email"
//                   value={formikSubmit.values.email}
//                   onChange={formikSubmit.handleChange}
//                   onBlur={formikSubmit.handleBlur}
//                   error={
//                     formikSubmit.touched.email &&
//                     Boolean(formikSubmit.errors.email)
//                   }
//                   helperText={
//                     formikSubmit.touched.email && formikSubmit.errors.email
//                   }
//                 />
//               </div>
//               <div className="input">
//                 <TextField
//                   type={showPassword ? "text" : "password"}
//                   name="password"
//                   // style={inputfield}
//                   sx={{ width: [320, 400] }}
//                   placeholder="password"
//                   InputProps={{
//                     endAdornment: (
//                       <InputAdornment position="end">
//                         <IconButton
//                           aria-label="toggle password visibility"
//                           onClick={handleClickShowPassword}
//                           onMouseDown={handleMouseDownPassword}
//                         >
//                           {showPassword ? (
//                             <MdVisibilityOff />
//                           ) : (
//                             <MdVisibility />
//                           )}
//                         </IconButton>
//                       </InputAdornment>
//                     ),
//                   }}
//                   value={formikSubmit.values.password}
//                   onChange={formikSubmit.handleChange}
//                   onBlur={formikSubmit.handleBlur}
//                   autoComplete="none"
//                   error={
//                     formikSubmit.touched.password &&
//                     Boolean(formikSubmit.errors.password)
//                   }
//                   helperText={
//                     formikSubmit.touched.password &&
//                     formikSubmit.errors.password
//                   }
//                 />
//               </div>
//             </div>

//             <div className="flex justify-center p-4">
//               <button className="min-w-[200px] px-4 py-2 rounded text-white bg-gray-900 hover:bg-blue-600 text-lg">
//                 Log in
//               </button>
//             </div>

//             <div className="flex justify-center mb-4">
//               <button className="min-w-[200px] px-4 py-2 rounded text-white bg-gray-900 hover:bg-blue-600 text-lg">
//                 Sign up
//               </button>
//             </div>

//             <div
//               style={{
//                 display: "flex",
//                 flexDirection: "column",
//                 alignItems: "center",
//               }}
//             >
//               {/* <div style={{ marginLeft: [15, 10], marginTop: 4 }}>
//                 <Typography
//                   className="hover:underline cursor-pointer"
//                   // onClick={handleNavigate_signup}
//                   sx={{ fontSize: [12, 18] }}
//                 >
//                   Sign Up if you don't Have an Account
//                 </Typography>
//               </div> */}
//             </div>
//           </form>
//         </Box>
//       </div>
//     </div>
//   );
// };

// const myComponentStyle = {
//   background: "",
//   // height: "760px",
//   alignItems: "center",
//   display: "flex",
//   padding: "10px",
//   margin: "auto",
//   marginTop: "120px",
//   // width: "600px",
//   flexDirection: "column",
//   padingBottom: "20px",
// };
// const Header = {
//   display: "flex",
//   flexDirection: "column",
//   alignItems: "center",
//   gap: "9px",
//   width: "100%",
//   marginTop: "30px",
// };

// const text = {
//   color: "#000",

//   fontSize: "48px",
//   fontWeight: "700",
// };
// const underline = {
//   width: "71px",
//   height: "6px",
//   background: "#000",
//   borderRadius: "9px",
// };
// const inputs = {
//   marginTop: "55px",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
//   flexDirection: "column",
//   gap: "25px",
// };
// const input = {
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
//   // width: "480px",
//   // height: "80px",
// };
// const icons = {
//   marginRight: "30px",
// };
// const inputfield = {
//   height: "50px",
//   width: "400px",
//   background: "transparent",
//   border: "none",
//   outline: "none",
//   color: "#797979",
//   fontSize: "19px",
// };
// const forgot_password = {
//   // paddingLeft: "70px",
//   // marginTop: "27px",
//   // color: "#797979",
//   // justifyContent:"center",
//   // alignItems: "center",
// };
// const spn = {
//   color: "#4c00b4",
// };
// const submit_container = {
//   // display: "flex",
//   // gap: "30px",
//   margin: "10px 110px",
//   display: "flex",
//   justifyContent: "center",
// };

// const submit_container_signup = {
//   // display: "flex",
//   // gap: "30px",
//   margin: "0px 10px",
//   display: "flex",
//   justifyContent: "center",
// };
// const submit = {
//   display: "flex",
//   background: "#215233",
//   justifyContent: "center",
//   alignItems: "center",
//   width: "220px",
//   height: "59px",
//   color: "#fff",
//   borderRadius: "50px",
//   fontSize: "19px",
//   fontWeight: "700",
//   cursor: "pointer",
// };
// const company_logo = {
//   width: "150px",
//   height: "150px",
//   marginTop: "20px",
//   //   borderRadius: 50,
//   // padingBottom: "30px",
//   // boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.1)",
// };

// export default LoginPage;





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
      const response = await apiClient.post<{ token: string }>(API.authAPI.login, {
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      alert("Login Successful!");
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
