import React, { useEffect } from 'react'
import { Alert as BootstrapAlert } from 'react-bootstrap'

const Alert = ({ show, msg, type, removeAlert }) => {

  useEffect(() => {
    const timeout = setTimeout(() => {
      removeAlert();
    }, 3000);
    return () => clearTimeout(timeout);
  }, [show]);

  return (
    show ? <BootstrapAlert className='alert pb-4' variant={type} onClose={() => removeAlert()} dismissible>{msg}</BootstrapAlert> : null
  );
}

export default Alert
