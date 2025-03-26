import React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

interface GeneralErrorProps {
  open: boolean;
  onClose: (event?: React.SyntheticEvent | Event, reason?: string) => void;
  autoHideDuration?: number;
  Errmsg: string;
}

const GeneralError: React.FC<GeneralErrorProps> = ({
  open,
  onClose,
  autoHideDuration = 3000,
  Errmsg,
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert onClose={onClose} severity="error" sx={{ width: "100%" }}>
        {Errmsg}
      </Alert>
    </Snackbar>
  );
};

export default GeneralError;