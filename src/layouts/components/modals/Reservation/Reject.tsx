import * as React from 'react';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Form from 'react-bootstrap/Form';
import { IReservation } from '../../../../redux/types/reservation';
import { IUpdateReservation } from '../../../../redux/types/dtos/updateReservation';
import { useState } from 'react';
import { IHotel } from '../../../../redux/types/hotel';

type IApprove = {
  open: boolean;
  onClose: () => void;
  onReject: (updateReservationData: IReservation) => void;
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
const Reject: React.FC<IApprove> = ({
  open,
  onClose,
  onReject,
  reservationId,
}) => {
  const [
    formRejectReservation,
    setFormRejectReservation,
  ] = useState<IReservation>({
    reject_reason: '',
  });
  const handleReject = () => {
    const updateReservationData: IUpdateReservation = {
      status: 'rejected',
      reservation_id: reservationId,
      reject_reason: formRejectReservation.reject_reason,
    };
    onReject(updateReservationData);
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
            Reject Reservation
          </StyledTypographyHeader>
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              Do you want to reject this reservation?
              <br />
              Please confirm reject reason then click the reject button.
            </Typography>
            <Form.Group className="mb-3">
              <Form.Control
                as="textarea"
                placeholder={'Reason...'}
                rows={3}
                value={formRejectReservation.reject_reason}
                onChange={e =>
                  setFormRejectReservation({
                    ...formRejectReservation,
                    reject_reason: e.target.value,
                  })
                }
              />
            </Form.Group>
          </CardContent>
          <StyledCardActions>
            <Button
              variant="contained"
              size="small"
              color={'success'}
              onClick={handleReject}
            >
              Reject
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

export default Reject;
