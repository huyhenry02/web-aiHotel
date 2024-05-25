import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Payment from '../../../pages/Payment/Payment';

const PaymentModal = ({ show, onClose, onSuccess, invoiceId }) => {
  return (
    <>
      <React.Fragment>
        <Dialog open={show} onClose={onClose} fullWidth={true} maxWidth={'md'}>
          <DialogTitle id="alert-dialog-title">
            {"Use Google's location service?"}
          </DialogTitle>
          <DialogContent>
            <Payment
              itemId={invoiceId}
              onClose={onClose}
              onSuccess={onSuccess}
            />
          </DialogContent>
        </Dialog>
      </React.Fragment>
    </>
  );
};

export default PaymentModal;
