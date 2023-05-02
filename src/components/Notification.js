import { Snackbar, Alert } from "@mui/material"
import { useState } from "react"

const Notification = ({ status, content, closeCallback }) => {
  const [open, setOpen] = useState(true)

  const handleClose = () => {
    setOpen(false)
    if (closeCallback) {
      closeCallback()
    }
  }

  return (
    <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} open={open} autoHideDuration={4000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={status} sx={{ width: '100%' }}>
        {content}
      </Alert>
    </Snackbar>
  )
}

export default Notification
