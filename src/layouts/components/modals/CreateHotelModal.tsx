import React, { useEffect, useState } from 'react';
import { IRoomType } from '../../../redux/types/roomType';
import { IHotel } from '../../../redux/types/hotel';
import { ICreateHotel } from '../../../redux/types/dtos/createHotel';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { isEmpty, isEqual } from 'lodash';
import { styled } from '@mui/material/styles';

type ICreateHotelModal = {
  isShow: boolean;
  action: 'create' | 'update';
  onClose: () => void;
  hotelDetail: IHotel | undefined;
  roomTypesData: IRoomType[];
  onCreateHotel: (payload: ICreateHotel) => void;
  onUpdateHotel: (payload: ICreateHotel) => void;
};

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const CreateHotelModal: React.FC<ICreateHotelModal> = ({
  isShow = false,
  action,
  onClose,
  hotelDetail,
  roomTypesData = [],
  onCreateHotel,
  onUpdateHotel,
}) => {
  const [formCreateHotel, setFormCreateHotel] = useState<ICreateHotel>({
    name: '',
    address: '',
    description: '',
    room_types: [],
    file: '',
  });
  const [base64Image, setBase64Image] = useState<string | undefined>('');

  const handleImageUpload = event => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setBase64Image(reader.result + '');
    };

    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (isShow) {
      if (action === 'update' && !isEmpty(hotelDetail)) {
        const roomTypeIds = hotelDetail?.room_types
          ?.map(type => type.id)
          .filter(id => id !== undefined) as number[];
        setFormCreateHotel({
          name: hotelDetail.name,
          address: hotelDetail.address,
          description: hotelDetail.description,
          room_types: roomTypeIds,
          file: hotelDetail?.file,
        });
        setBase64Image(hotelDetail?.file);
      }
    }
  }, [action, hotelDetail, isShow]);

  const handleSelectRoomTypes = (recordId: number | undefined) => {
    if (recordId) {
      if (formCreateHotel.room_types) {
        if (formCreateHotel.room_types.includes(recordId)) {
          setFormCreateHotel({
            ...formCreateHotel,
            room_types: formCreateHotel.room_types.filter(
              id => id !== recordId,
            ),
          });
        } else {
          setFormCreateHotel({
            ...formCreateHotel,
            room_types: [...formCreateHotel.room_types, recordId],
          });
        }
      }
    }
  };

  const handleClearValue = () => {
    setFormCreateHotel({
      name: '',
      address: '',
      description: '',
      room_types: [],
      file: '',
    });
    setBase64Image('');
  };

  const handleClose = () => {
    handleClearValue();
    onClose();
  };

  const handleCreateHotel = () => {
    const hotelData: ICreateHotel = {
      name: formCreateHotel.name,
      address: formCreateHotel.address,
      description: formCreateHotel.description,
      room_types: formCreateHotel.room_types,
      file: base64Image,
    };
    onCreateHotel(hotelData);
    handleClearValue();
    onClose();
  };

  const handleUpdateHotel = () => {
    const roomTypeIds = hotelDetail?.room_types
      ?.map(type => type.id)
      .filter(id => id !== undefined) as number[];
    if (
      hotelDetail?.name !== formCreateHotel.name ||
      hotelDetail?.address !== formCreateHotel.address ||
      hotelDetail?.description !== formCreateHotel.description ||
      !isEqual(roomTypeIds, formCreateHotel.room_types)
    ) {
      const hotelData: ICreateHotel = {
        hotel_id: hotelDetail?.id,
        name: formCreateHotel.name,
        address: formCreateHotel.address,
        description: formCreateHotel.description,
        room_types: formCreateHotel.room_types,
        file: base64Image,
      };
      onUpdateHotel(hotelData);
    }
    handleClearValue();
    onClose();
  };

  return (
    <>
      <Dialog
        open={isShow}
        onClose={handleClose}
        fullWidth={true}
        maxWidth={'md'}
      >
        <DialogTitle>
          {action === 'create' ? 'Thêm khách sạn mới' : 'Chỉnh sửa khách sạn'}
        </DialogTitle>
        <DialogContent>
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '100%' },
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  required
                  label="Tên khách sạn"
                  value={formCreateHotel.name}
                  onChange={e =>
                    setFormCreateHotel({
                      ...formCreateHotel,
                      name: e.target.value,
                    })
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  label="Địa chỉ"
                  value={formCreateHotel.address}
                  onChange={e =>
                    setFormCreateHotel({
                      ...formCreateHotel,
                      address: e.target.value,
                    })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Mô tả"
                  placeholder="giới thiệu về khách sạn..."
                  multiline
                  value={formCreateHotel.description}
                  onChange={e =>
                    setFormCreateHotel({
                      ...formCreateHotel,
                      description: e.target.value,
                    })
                  }
                />
              </Grid>
            </Grid>
          </Box>

          <Box alignItems="center" gap={4} p={2}>
            <div className={'mb-2'}>Chọn các loại phòng:</div>
            <Grid container spacing={2}>
              {roomTypesData.map(type => (
                <Grid item xs={3} key={type.id}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formCreateHotel.room_types?.includes(
                          type.id || 0,
                        )}
                      />
                    }
                    label={type?.name}
                    onChange={() => handleSelectRoomTypes(type?.id)}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>

          <Box alignItems="center" gap={4} p={2}>
            <Grid container spacing={2}>
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
              >
                Upload file
                <VisuallyHiddenInput type="file" onChange={handleImageUpload} />
              </Button>
            </Grid>

            <Grid container spacing={2}>
              {base64Image && (
                <div>
                  <img
                    src={base64Image}
                    alt="Uploaded"
                    style={{ maxWidth: '50%' }}
                  />
                </div>
              )}
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="text" color={'inherit'} onClick={handleClose}>
            Đóng
          </Button>
          {action === 'create' ? (
            <Button
              variant="contained"
              color={'primary'}
              onClick={handleCreateHotel}
            >
              Tạo mới
            </Button>
          ) : (
            ''
          )}
          {action === 'update' ? (
            <Button
              variant="contained"
              color={'warning'}
              onClick={handleUpdateHotel}
            >
              Lưu
            </Button>
          ) : (
            ''
          )}
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CreateHotelModal;
