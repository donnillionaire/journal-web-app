import React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

interface GeneralSuccessProps {
  open: boolean;
  onClose: (event?: React.SyntheticEvent | Event, reason?: string) => void;
  autoHideDuration?: number;
  msg: string;
}

const GeneralSuccess: React.FC<GeneralSuccessProps> = ({
  open,
  onClose,
  autoHideDuration = 3000,
  msg,
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert onClose={onClose} severity="success" sx={{ width: ["60%", "100%"] }}>
        {msg}
      </Alert>
    </Snackbar>
  );
};

export default GeneralSuccess;
