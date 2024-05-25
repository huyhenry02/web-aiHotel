import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

type IConfirmModalComponent = {
  show: boolean;
  title: string;
  action: 'delete' | 'create';
  message?: string;
  data?: any;
  onConfirm: (recordId: number) => void;
  onClose: () => void;
};
const ConfirmModal: React.FC<IConfirmModalComponent> = ({
  show,
  title,
  action,
  message,
  data = {},
  onConfirm,
  onClose,
}) => {
  return (
    <React.Fragment>
      <Dialog
        open={show}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {message != ''
              ? message
              : 'Bạn có chắc muốn thực hiện hành động này?'}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant={'text'} onClick={onClose}>
            Quay lại
          </Button>
          {action === 'delete' ? (
            <Button
              color={'error'}
              onClick={() => onConfirm(data.id)}
              autoFocus
            >
              Xóa
            </Button>
          ) : (
            ''
          )}
          {action === 'create' ? (
            <Button
              color={'success'}
              onClick={() => onConfirm(data.id)}
              autoFocus
            >
              Tạo
            </Button>
          ) : (
            ''
          )}
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default ConfirmModal;
