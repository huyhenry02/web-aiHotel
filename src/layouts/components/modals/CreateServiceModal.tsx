import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Col, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { isEmpty } from 'lodash';
import { IService } from '../../../redux/types/service';
import { ICreateService } from '../../../redux/types/createService';
import { IUpdateService } from '../../../redux/types/updateService';

type ICreateServiceModal = {
  isShow: boolean;
  onClose: () => void;
  onCreateService: (payload: ICreateService) => void;
  onUpdateService: (payload: IUpdateService) => void;
  serviceData: IService;
};
const CreateServiceModal: React.FC<ICreateServiceModal> = ({
  isShow = false,
  onClose,
  onCreateService,
  onUpdateService,
  serviceData,
}) => {
  const [formCreateService, setFormCreateService] = useState<ICreateService>({
    id: 0,
    name: '',
    description: '',
    price: 0,
  });

  const handleClearValue = () => {
    setFormCreateService({
      name: '',
      description: '',
      price: 0,
    });
  };

  const handleCreateService = async () => {
    const serviceData: ICreateService = {
      name: formCreateService.name,
      description: formCreateService.description,
      price: formCreateService.price,
    };
    onCreateService(serviceData);
  };

  const handleUpdateService = () => {
    const payload: IUpdateService = {
      service_id: formCreateService.id,
      name: formCreateService.name,
      description: formCreateService.description,
      price: formCreateService.price,
    };
    onUpdateService(payload);
  };

  useEffect(() => {
    if (!isShow) {
      handleClearValue();
    }
  }, [isShow]);

  useEffect(() => {
    if (serviceData) {
      setFormCreateService({
        id: serviceData.id,
        name: serviceData.name,
        description: serviceData.description,
        price: Number(serviceData.price),
      });
    }
  }, [serviceData]);

  return (
    <>
      <Modal
        show={isShow}
        onHide={onClose}
        size={'lg'}
        backdrop="static"
        centered
      >
        <Modal.Header closeButton>
          {isEmpty(serviceData) ? (
            <Modal.Title>Create</Modal.Title>
          ) : (
            <Modal.Title>Update</Modal.Title>
          )}
          *
        </Modal.Header>
        <Modal.Body>
          <div className={'container-fluid'}>
            <Row className="mb-3">
              <Form.Group as={Col} md={6}>
                <Form.Label>Tên dịch vụ</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Tên dịch vụ"
                  value={formCreateService.name}
                  onChange={e =>
                    setFormCreateService({
                      ...formCreateService,
                      name: e.target.value,
                    })
                  }
                />
              </Form.Group>

              <Form.Group as={Col} md={6}>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Mô tả"
                  value={formCreateService.description}
                  onChange={e =>
                    setFormCreateService({
                      ...formCreateService,
                      description: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group as={Col} md={6}>
                <Form.Label>Price</Form.Label>
                <Form.Control
                  required
                  type="Number"
                  placeholder="Giá"
                  value={formCreateService.price}
                  onChange={e =>
                    setFormCreateService({
                      ...formCreateService,
                      price: Number(e.target.value),
                    })
                  }
                />
              </Form.Group>
            </Row>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Đóng
          </Button>
          {isEmpty(serviceData) ? (
            <Button variant="success" onClick={handleCreateService}>
              Tạo
            </Button>
          ) : (
            <Button variant="success" onClick={handleUpdateService}>
              Cập nhật
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CreateServiceModal;
