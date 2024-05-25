import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

type ITableTwo = {
  columns: GridColDef[];
  rows: any[];
};

const TableTwo: React.FC<ITableTwo> = ({ rows, columns }) => {
  const customColumns: GridColDef[] = columns.map(column => {
    const { field, headerName, width, ...otherColumnProps } = column;
    if (field === 'actions') {
      return {
        field: 'actions',
        headerName: 'Actions',
        sortable: false,
        renderCell: params => (
          <>
            <IconButton
              color={'error'}
              onClick={() => handleButtonClick(params.row.id)}
            >
              <DeleteIcon />
            </IconButton>
          </>
        ),
        ...otherColumnProps,
      };
    }

    return {
      field,
      headerName,
      sortable: true,
      width: width ?? 200,
      align: 'center',
      ...otherColumnProps,
    };
  });

  const handleButtonClick = id => {
    alert(`Button clicked for row with ID: ${id}`);
  };

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={customColumns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        disableColumnFilter
      />
    </div>
  );
};

export default TableTwo;
