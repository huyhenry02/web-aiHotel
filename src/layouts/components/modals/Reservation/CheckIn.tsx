import * as React from 'react';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { IUpdateReservation } from '../../../../redux/types/dtos/updateReservation';

type ICheckIn = {
  open: boolean;
  onClose: () => void;
  onCheckIn: (reservationId: number) => void;
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

const CheckIn: React.FC<ICheckIn> = ({
  open,
  onClose,
  onCheckIn,
  reservationId,
}) => {
  const handleCheckIn = () => {
    if (reservationId !== undefined) {
      onCheckIn(reservationId);
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
            Check In Reservation
          </StyledTypographyHeader>
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              Do you want to check in this reservation?
              <br />
              Please check the information carefully before check in then click
              the check in button.
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
              onClick={handleCheckIn}
            >
              Check In
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

export default CheckIn;
