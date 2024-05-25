import { styled } from '@mui/material/styles';
import { Button, Card, Grid, Paper, Typography } from '@mui/material';

export const StyledButton = styled(Button)({
  marginLeft: '8px',
});
export const StyledButtonContainer = styled('div')({
  display: 'flex',
  justifyContent: 'flex-end',
  marginTop: '16px',
});
export const StyledCard = styled(Card)({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  padding: '16px',
  boxShadow: 'none',
});
export const StyleGirdItem = styled(Grid)({
  flex: '1 1 0',
  padding: '16px',
});
export const StyledTypographyTitle = styled(Typography)({
  textAlign: 'left',
});
export const StyledTypographyValue = styled(Typography)({
  textAlign: 'right',
});
export const StyleGirdContainerData = styled(Grid)({
  padding: '8px 16px',
});
export const StyleGirdCard = styled(Grid)({});
export const HeaderContainer = styled('div')({
  position: 'relative',
});
export const StyledItemService = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#F7F8FB',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
export const StyleButtonInvoice = styled(Button)({
  textAlign: 'right',
  marginTop: '16px',
});
export const StyledGridCode = styled(Grid)({
  marginTop: '16px',
  marginLeft: '16px',
});
export const StyledServiceCard = styled(Card)({
  width: '100%',
  marginTop: '16px',
  boxShadow: 'none',
});
