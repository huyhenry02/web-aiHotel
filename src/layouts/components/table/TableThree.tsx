import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { isEmpty, map } from 'lodash';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

type ITableManage = {
  columns: string[];
  rows?: any[];
  actions?: { type: string }[];
  onAction?: (id: number, action: string) => void;
  useIdx?: boolean;
  shortValue?: boolean;
};

const TableThree: React.FC<ITableManage> = ({
  columns,
  rows,
  actions,
  shortValue = false,
  onAction,
}) => {
  const renderTagTd = (value, key, idx) => {
    if (key === 'id') {
      return (
        <TableCell style={{ width: '50px' }} align="center" key={idx}>
          {idx}
        </TableCell>
      );
    } else if (typeof value === 'string' && shortValue && value.length > 20) {
      return (
        <TableCell
          align="center"
          key={`${key}_${idx}`}
          title={value}
        >{`${value.slice(0, 20)}...`}</TableCell>
      );
    }

    if (key === 'image') {
      if (!isEmpty(value)) {
        return (
          <TableCell>
            <img src={value} alt="image" width={100} />
          </TableCell>
        );
      } else {
        return (
          <TableCell>
            <img
              src={
                'https://i.pinimg.com/564x/52/cb/32/52cb324761f157acf7ad05a4733ebbfe.jpg'
              }
              alt="image"
              width={100}
            />
          </TableCell>
        );
      }
    }

    return (
      <TableCell
        style={{
          maxWidth: '250px',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
        align="center"
        key={`${key}_${idx}`}
      >
        {value}
      </TableCell>
    );
  };

  const renderActions = (recordId, recordStatus = null) => {
    return map(actions, action => {
      switch (action.type) {
        case 'update':
          return (
            <IconButton
              key={`update${recordId}`}
              color={'warning'}
              className="me-1 ms-1"
              onClick={() => onAction && onAction(recordId, action.type)}
            >
              <DriveFileRenameOutlineIcon />
            </IconButton>
          );
        case 'delete':
          return (
            <IconButton
              key={`delete${recordId}`}
              color={'default'}
              className="me-1 ms-1"
              onClick={() => onAction && onAction(recordId, action.type)}
            >
              <DeleteIcon />
            </IconButton>
          );
        case 'detail':
          return (
            <IconButton
              key={`detail${recordId}`}
              color={'success'}
              className="me-1 ms-1"
              onClick={() => onAction && onAction(recordId, action.type)}
            >
              <VisibilityIcon />
            </IconButton>
          );
        default:
          return <></>;
      }
    });
  };

  return (
    <TableContainer component={Paper} sx={{ maxHeight: 1300 }}>
      <Table sx={{ minWidth: 650 }} stickyHeader>
        <TableHead>
          <TableRow>
            {columns.map((column, c_index) => (
              <TableCell align={'center'} key={c_index}>
                {column}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {!isEmpty(rows) &&
            map(rows, (row, i_index) => (
              <TableRow
                hover
                key={i_index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                {Object.keys(row).map(item => {
                  return renderTagTd(row[item], item, i_index + 1);
                })}
                {actions && !isEmpty(actions) && (
                  <TableCell style={{ textAlign: 'center' }}>
                    {renderActions(row.id, row.status)}
                  </TableCell>
                )}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableThree;
