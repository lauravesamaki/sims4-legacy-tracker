import { useState } from "react";
import { Snackbar, Alert } from "@mui/material";

export default function InstantMessage({message, severity}) {
    const [open, setOpen] = useState(true)

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <Snackbar
            open={open} 
            autoHideDuration={6000} 
            onClose={handleClose}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}>
                <Alert onClose={handleClose} severity={severity}>{message}</Alert>
        </Snackbar>
    )
}