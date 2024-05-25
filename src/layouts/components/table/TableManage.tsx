import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import { isEmpty, map } from 'lodash';
import { Button, Pagination } from 'react-bootstrap';
import { MdDelete } from 'react-icons/md';
import { FaEye, FaEdit } from 'react-icons/fa';
import './TableManage.scss';

type ITableManage = {
  headers: string[];
  data?: any[];
  actions?: { type: string }[];
  onAction?: (id: number, action: string) => void;
  useIdx?: boolean;
  shortValue?: boolean;
};
const TableManage: React.FC<ITableManage> = ({
  headers,
  data = [],
  actions = [],
  useIdx = false,
  shortValue = false,
  onAction,
}) => {
  const renderTagTd = (value, key, idx) => {
    let style = {};
    if (!isEmpty(actions)) {
      style = { textAlign: 'center', lineHeight: '34px' };
    }
    if (key === 'id' && useIdx) {
      return (
        <td key={idx} style={style}>
          {idx}
        </td>
      );
    } else if (typeof value === 'string' && shortValue && value.length > 20) {
      return (
        <td key={`${key}_${idx}`} title={value} style={style}>{`${value.slice(
          0,
          20,
        )}...`}</td>
      );
    }

    return (
      <td key={`${key}_${idx}`} style={style}>
        {value}
      </td>
    );
  };

  const renderActions = (recordId, recordStatus = null) => {
    return map(actions, action => {
      switch (action.type) {
        case 'edit':
          return (
            <Button
              key={`edit_${recordId}`}
              variant="danger"
              title="Edit"
              className="me-1 ms-1"
              onClick={() => onAction && onAction(recordId, action.type)}
            >
              <FaEdit />
            </Button>
          );
        case 'delete':
          return (
            <Button
              key={`delete${recordId}`}
              variant="secondary"
              title="Delete"
              className="me-1 ms-1"
              onClick={() => onAction && onAction(recordId, action.type)}
            >
              <MdDelete />
            </Button>
          );
        case 'detail':
          return (
            <Button
              key={`detail${recordId}`}
              variant="success"
              title="Detail"
              className="me-1 ms-1"
              onClick={() => onAction && onAction(recordId, action.type)}
            >
              <FaEye />
            </Button>
          );
        default:
          return <></>;
      }
    });
  };

  return (
    <div className="table">
      <hr></hr>
      <div>
        <Table hover style={{ borderRadius: '10px', border: 'none' }}>
          <thead>
            <tr>
              {headers.map((header, header_index) => (
                <th className="title" key={header_index}>
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {!isEmpty(data) &&
              map(data, (row, i_index) => (
                <tr className="data" key={i_index}>
                  {Object.keys(row).map(item => {
                    return renderTagTd(row[item], item, i_index + 1);
                  })}
                  {actions && !isEmpty(actions) && (
                    <td style={{ textAlign: 'center' }}>
                      {renderActions(row.id, row.status)}
                    </td>
                  )}
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default TableManage;
