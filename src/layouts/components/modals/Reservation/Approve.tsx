import * as React from 'react';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { IReservation } from '../../../../redux/types/reservation';
import { IUpdateReservation } from '../../../../redux/types/dtos/updateReservation';

type IApprove = {
  open: boolean;
  onClose: () => void;
  onApprove: (updateReservationData: IReservation) => void;
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

const Approve: React.FC<IApprove> = ({
  open,
  onClose,
  onApprove,
  reservationId,
}) => {
  const handleApprove = () => {
    const updateReservationData: IUpdateReservation = {
      status: 'approved',
      reservation_id: reservationId,
    };
    onApprove(updateReservationData);
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
            Approve Reservation
          </StyledTypographyHeader>
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              Do you want to approve this reservation?
              <br />
              If you approve, the customer will receive a notification.
              <br />
              Please check the information carefully before approving then click
              the approve button.
            </Typography>
          </CardContent>
          <StyledCardActions>
            <Button
              variant="contained"
              size="small"
              color={'success'}
              onClick={handleApprove}
            >
              Approve
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

export default Approve;
