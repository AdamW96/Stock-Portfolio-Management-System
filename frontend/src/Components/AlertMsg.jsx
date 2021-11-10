import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'

export default function AlertMsg (props) {
  let { alertType, alertContent } = props
  const [open, setOpen] = React.useState(false)
  React.useEffect(() => {
    if (alertType !== 'none' && window.alert !== false) {
      setOpen(true)
    }
  }, [props])

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    window.alert = false
    setOpen(false)
  }
  const alertPart =
    (alertType && alertType !== 'none')
      ? (
        <Alert
          onClose={handleClose}
          severity={`${alertType}`}
          sx={{ width: '100%' }}
        >
          {alertContent}
        </Alert>
        )
      : (<></>)

  return (
    <React.Fragment>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        key={'top' + 'center'}
      >
        {alertPart}
      </Snackbar>
    </React.Fragment>
  )
}
