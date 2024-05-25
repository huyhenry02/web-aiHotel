import * as React from 'react';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

type ICheckOut = {
  open: boolean;
  onClose: () => void;
  onCheckOut: (reservationId: number) => void;
  reservationId: number | undefined;
};
const StyledModal = styled(Modal)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});
const StyledTypographyHeader = styled(Typography)({
  borderBottom: '1px solid #E0E0E0',
  padding: '8px 16px',
});
const StyledCardActions = styled(CardActions)({
  justifyContent: 'flex-end',
});

const CheckOut: React.FC<ICheckOut> = ({
  open,
  onClose,
  onCheckOut,
  reservationId,
}) => {
  const handleCheckOut = () => {
    if (reservationId !== undefined) {
      onCheckOut(reservationId);
    }
    onClose();
  };
  return (
    <div>
      <StyledModal
        keepMounted
        open={open}
        onClose={onClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Card sx={{ width: 800 }}>
          <StyledTypographyHeader gutterBottom variant="h6">
            Check Out Reservation
          </StyledTypographyHeader>
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              Do you want to check out this reservation?
              <br />
              Please check the information carefully before check out then click
              the check out button.
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Current Time: {new Date().toLocaleTimeString()}
            </Typography>
          </CardContent>
          <StyledCardActions>
            <Button
              variant="contained"
              size="small"
              color={'success'}
              onClick={handleCheckOut}
            >
              Check Out
            </Button>
            <Button
              variant="contained"
              size="small"
              color={'error'}
              onClick={onClose}
            >
              Cancel
            </Button>
          </StyledCardActions>
        </Card>
      </StyledModal>
    </div>
  );
};

export default CheckOut;
