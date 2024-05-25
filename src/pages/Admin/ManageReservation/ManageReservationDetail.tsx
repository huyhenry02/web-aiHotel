import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { manageReservationActions } from '../../../redux/slices/manageReservation.slice';
import {
  Typography,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Box,
  Stepper,
  Step,
  StepLabel,
  Stack,
} from '@mui/material';
import {
  StyledButton,
  StyledButtonContainer,
  StyledCard,
  StyleGirdItem,
  StyledTypographyTitle,
  StyledTypographyValue,
  StyleGirdContainerData,
  StyleGirdCard,
  HeaderContainer,
  StyledItemService,
  StyleButtonInvoice,
  StyledGridCode,
  StyledServiceCard,
} from './StyledManageHotelDetail';
import Approve from '../../../layouts/components/modals/Reservation/Approve';
import Reject from '../../../layouts/components/modals/Reservation/Reject';
import { IReservation } from '../../../redux/types/reservation';
import CheckOut from '../../../layouts/components/modals/Reservation/CheckOut';
import CheckIn from '../../../layouts/components/modals/Reservation/CheckIn';

const steps = ['pending', 'approved', 'processing', 'completed'];
const ManageReservationDetail = () => {
  const dispatch = useDispatch();
  const { reservation_id } = useParams();
  const [openApproved, setOpenApproved] = useState(false);
  const [openRejected, setOpenRejected] = useState(false);
  const [openCheckIn, setOpenCheckIn] = useState(false);
  const [openCheckOut, setOpenCheckOut] = useState(false);
  const handleRejected = () => setOpenRejected(true);
  const handleApproved = () => setOpenApproved(true);
  const handleISCheckIn = () => setOpenCheckIn(true);
  const handleISCheckOut = () => setOpenCheckOut(true);
  const handleCloseCheckIn = () => setOpenCheckIn(false);
  const handleCloseCheckOut = () => setOpenCheckOut(false);
  const handleCloseRejected = () => setOpenRejected(false);
  const handleCloseApproved = () => setOpenApproved(false);

  const reservationState = useSelector(
    (state: RootState) => state.manageReservation.reservation,
  );

  useEffect(() => {
    dispatch({
      type: `${manageReservationActions.getReservationPending}_saga`,
      payload: reservation_id,
    });
  }, [reservation_id]);
  const activeStep = steps.indexOf(reservationState.status ?? '');
  const handleUpdateReservation = (updateReservationData: IReservation) => {
    dispatch({
      type: `${manageReservationActions.updateReservationPending}_saga`,
      payload: updateReservationData,
    });
  };
  const handleCheckInReservation = (reservationId: number) => {
    dispatch({
      type: `${manageReservationActions.checkInReservationPending}_saga`,
      payload: reservationId,
    });
  };
  const handleCheckOutReservation = (reservationId: number) => {
    dispatch({
      type: `${manageReservationActions.checkOutReservationPending}_saga`,
      payload: reservationId,
    });
  };
  return (
    <>
      <>
        <Box sx={{ width: '100%' }}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map(label => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
        <HeaderContainer>
          <StyledButtonContainer>
            {reservationState.status === 'pending' && (
              <>
                <StyledButton
                  onClick={handleApproved}
                  variant="contained"
                  color="success"
                >
                  Approve
                </StyledButton>
                <StyledButton
                  onClick={handleRejected}
                  variant="contained"
                  color="error"
                >
                  Reject
                </StyledButton>
              </>
            )}
            {reservationState.status === 'approved' && (
              <>
                <StyledButton
                  variant="contained"
                  color="primary"
                  onClick={handleISCheckIn}
                >
                  Check In
                </StyledButton>
                <StyledButton
                  onClick={handleRejected}
                  variant="contained"
                  color="error"
                >
                  Reject
                </StyledButton>
              </>
            )}
            {reservationState.status === 'processing' && (
              <StyledButton
                variant="contained"
                color="primary"
                onClick={handleISCheckOut}
              >
                Check Out
              </StyledButton>
            )}
            {reservationState.status !== 'completed' && <></>}
          </StyledButtonContainer>
          {!(
            reservationState.status === 'pending' ||
            reservationState.status === 'approved' ||
            reservationState.status === 'rejected'
          ) && (
            <StyleButtonInvoice
              variant="outlined"
              href=""
              style={{ position: 'absolute', right: 0 }}
            >
              Invoice
            </StyleButtonInvoice>
          )}
        </HeaderContainer>
        <StyledGridCode item xs={12} sm={6}>
          <Typography variant="h5" gutterBottom>
            Code: {reservationState.code}
          </Typography>
        </StyledGridCode>

        <StyleGirdCard>
          <StyledCard>
            <StyleGirdItem item xs={6} sm={6}>
              <Card>
                <CardHeader title="Customer" />
                <CardContent style={{ height: '415px' }}>
                  <StyleGirdContainerData container>
                    <Grid item xs={4}>
                      <StyledTypographyTitle gutterBottom>
                        Name:
                      </StyledTypographyTitle>
                    </Grid>
                    <Grid item xs={8}>
                      <StyledTypographyValue gutterBottom>
                        {reservationState.user?.name}
                      </StyledTypographyValue>
                    </Grid>
                  </StyleGirdContainerData>
                  <StyleGirdContainerData container>
                    <Grid item xs={4}>
                      <StyledTypographyTitle gutterBottom>
                        Phone:
                      </StyledTypographyTitle>
                    </Grid>
                    <Grid item xs={8}>
                      <StyledTypographyValue gutterBottom>
                        {reservationState.user?.phone}
                      </StyledTypographyValue>
                    </Grid>
                  </StyleGirdContainerData>
                  <StyleGirdContainerData container>
                    <Grid item xs={4}>
                      <StyledTypographyTitle gutterBottom>
                        Email:
                      </StyledTypographyTitle>
                    </Grid>
                    <Grid item xs={8}>
                      <StyledTypographyValue gutterBottom>
                        {reservationState.user?.email}
                      </StyledTypographyValue>
                    </Grid>
                  </StyleGirdContainerData>
                  <StyleGirdContainerData container>
                    <Grid item xs={4}>
                      <StyledTypographyTitle gutterBottom>
                        Address:
                      </StyledTypographyTitle>
                    </Grid>
                    <Grid item xs={8}>
                      <StyledTypographyValue gutterBottom>
                        {reservationState.user?.address}
                      </StyledTypographyValue>
                    </Grid>
                  </StyleGirdContainerData>
                  <StyleGirdContainerData container>
                    <Grid item xs={4}>
                      <StyledTypographyTitle gutterBottom>
                        Age:
                      </StyledTypographyTitle>
                    </Grid>
                    <Grid item xs={8}>
                      <StyledTypographyValue gutterBottom>
                        {reservationState.user?.age}
                      </StyledTypographyValue>
                    </Grid>
                  </StyleGirdContainerData>
                  <StyleGirdContainerData container>
                    <Grid item xs={4}>
                      <StyledTypographyTitle gutterBottom>
                        Identification:
                      </StyledTypographyTitle>
                    </Grid>
                    <Grid item xs={8}>
                      <StyledTypographyValue gutterBottom>
                        {reservationState.user?.identification}
                      </StyledTypographyValue>
                    </Grid>
                  </StyleGirdContainerData>
                </CardContent>
              </Card>
            </StyleGirdItem>
            <StyleGirdItem item xs={6} sm={6}>
              <Card>
                <CardHeader title="Information" />
                <CardContent style={{ height: '415px' }}>
                  <StyleGirdContainerData container>
                    <Grid item xs={4}>
                      <StyledTypographyTitle gutterBottom>
                        Hotel:
                      </StyledTypographyTitle>
                    </Grid>
                    <Grid item xs={8}>
                      <StyledTypographyValue gutterBottom>
                        {reservationState.hotel?.name}
                      </StyledTypographyValue>
                    </Grid>
                  </StyleGirdContainerData>
                  <StyleGirdContainerData container>
                    <Grid item xs={4}>
                      <StyledTypographyTitle gutterBottom>
                        Room Type:
                      </StyledTypographyTitle>
                    </Grid>
                    <Grid item xs={8}>
                      <StyledTypographyValue gutterBottom>
                        {reservationState.room_type?.name}
                      </StyledTypographyValue>
                    </Grid>
                  </StyleGirdContainerData>
                  <StyleGirdContainerData container>
                    <Grid item xs={4}>
                      <StyledTypographyTitle gutterBottom>
                        Room Code:
                      </StyledTypographyTitle>
                    </Grid>
                    <Grid item xs={8}>
                      <StyledTypographyValue gutterBottom>
                        {reservationState.room?.code}
                      </StyledTypographyValue>
                    </Grid>
                  </StyleGirdContainerData>
                  {reservationState.status === 'rejected' && (
                    <StyleGirdContainerData container>
                      <Grid item xs={4}>
                        <StyledTypographyTitle gutterBottom>
                          Reject Reason:
                        </StyledTypographyTitle>
                      </Grid>
                      <Grid item xs={8}>
                        <StyledTypographyValue gutterBottom>
                          {reservationState.reject_reason}
                        </StyledTypographyValue>
                      </Grid>
                    </StyleGirdContainerData>
                  )}
                  <StyleGirdContainerData container>
                    <Grid item xs={4}>
                      <StyledTypographyTitle gutterBottom>
                        Start Date:
                      </StyledTypographyTitle>
                    </Grid>
                    <Grid item xs={8}>
                      <StyledTypographyValue gutterBottom>
                        {reservationState.start_date}
                      </StyledTypographyValue>
                    </Grid>
                  </StyleGirdContainerData>
                  <StyleGirdContainerData container>
                    <Grid item xs={4}>
                      <StyledTypographyTitle gutterBottom>
                        End Date:
                      </StyledTypographyTitle>
                    </Grid>
                    <Grid item xs={8}>
                      <StyledTypographyValue gutterBottom>
                        {reservationState.end_date}
                      </StyledTypographyValue>
                    </Grid>
                  </StyleGirdContainerData>
                  <StyleGirdContainerData container>
                    <Grid item xs={4}>
                      <StyledTypographyTitle gutterBottom>
                        Check in:
                      </StyledTypographyTitle>
                    </Grid>
                    <Grid item xs={8}>
                      <StyledTypographyValue gutterBottom>
                        {reservationState.check_in}
                      </StyledTypographyValue>
                    </Grid>
                  </StyleGirdContainerData>
                  <StyleGirdContainerData container>
                    <Grid item xs={4}>
                      <StyledTypographyTitle gutterBottom>
                        Check out:
                      </StyledTypographyTitle>
                    </Grid>
                    <Grid item xs={8}>
                      <StyledTypographyValue gutterBottom>
                        {reservationState.check_out}
                      </StyledTypographyValue>
                    </Grid>
                  </StyleGirdContainerData>
                  <StyleGirdContainerData container>
                    <Grid item xs={4}>
                      <StyledTypographyTitle gutterBottom>
                        Amount Person:
                      </StyledTypographyTitle>
                    </Grid>
                    <Grid item xs={8}>
                      <StyledTypographyValue gutterBottom>
                        {reservationState.amount_person}
                      </StyledTypographyValue>
                    </Grid>
                  </StyleGirdContainerData>
                </CardContent>
              </Card>
            </StyleGirdItem>
          </StyledCard>
          <StyledServiceCard>
            <StyleGirdItem item xs={12} sm={6}>
              <Card sx={{ marginTop: 2 }}>
                <CardHeader title="Service" />
                <CardContent>
                  <Stack direction="row" spacing={4}>
                    <StyledItemService>Service 1</StyledItemService>
                    <StyledItemService>Service 2</StyledItemService>
                    <StyledItemService>Service 3</StyledItemService>
                    <StyledItemService>Service 4</StyledItemService>
                    <StyledItemService>Service 5</StyledItemService>
                  </Stack>
                </CardContent>
              </Card>
            </StyleGirdItem>
          </StyledServiceCard>
        </StyleGirdCard>
      </>
      <Approve
        open={openApproved}
        onClose={handleCloseApproved}
        onApprove={handleUpdateReservation}
        reservationId={reservationState.id}
      />
      <Reject
        open={openRejected}
        onClose={handleCloseRejected}
        onReject={handleUpdateReservation}
        reservationId={reservationState.id}
      />
      <CheckIn
        open={openCheckIn}
        onClose={handleCloseCheckIn}
        reservationId={reservationState.id}
        onCheckIn={handleCheckInReservation}
      />
      <CheckOut
        open={openCheckOut}
        onClose={handleCloseCheckOut}
        reservationId={reservationState.id}
        onCheckOut={handleCheckOutReservation}
      />
    </>
  );
};

export default ManageReservationDetail;
