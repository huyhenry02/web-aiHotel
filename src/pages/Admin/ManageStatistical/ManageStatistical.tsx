import Box from '@mui/material/Box';
import ArrowRightRoundedIcon from '@mui/icons-material/ArrowRightRounded';
import { BarChart } from '@mui/x-charts/BarChart';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { IInvoice } from '../../../redux/types/invoice';
import { manageInvoiceActions } from '../../../redux/slices/manageInvoice.slice';
import { IStatistical } from '../../../redux/types/statistical';
import { manageStatisticalActions } from '../../../redux/slices/managerStatistical.slice';
import { isEmpty } from 'lodash';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';

const typeOptions = ['day', 'month', 'year'];
const TYPE_OPTION = {
  DAY: 'day',
  MONTH: 'month',
  YEAR: 'year',
};

const ManageStatistical = () => {
  const dispatch = useDispatch();
  const invoicesState = useSelector(
    (state: RootState) => state.manageInvoice.invoices,
  );
  const listStatisticalState = useSelector(
    (state: RootState) => state.manageStatistical.statistical,
  );

  const [listInvoices, setListInvoices] = useState<IInvoice[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [columns, setColumns] = useState<number[]>([0]);
  const [rows, setRows] = useState<number[]>([0]);
  const [valueDate, setValueDate] = useState<Dayjs | null>(dayjs());
  const [typeDate, setTypeDate] = useState<string>(TYPE_OPTION.MONTH);

  const handleTotalPrice = (invoices: IInvoice[]) => {
    return invoices.reduce((accumulator, currentInvoice) => {
      return accumulator + Number(currentInvoice.total_price);
    }, 0);
  };

  const handleBuildData = (dataStatistical: IStatistical[]) => {
    if (!isEmpty(dataStatistical)) {
      const dataMap: Record<string, string> = {
        day: 'day',
        month: 'month',
        year: 'year',
      };
      const filteredColumns = dataStatistical
        .map(item => {
          const type = Object.keys(item).find(key => dataMap[key]);
          return type ? item[type as keyof IStatistical] : undefined;
        })
        .filter(Boolean) as number[];

      setColumns(filteredColumns);
      setRows(dataStatistical.map(item => item.count) as number[]);
    } else {
      setRows([0]);
      setColumns([0]);
    }
  };

  const handleDateChange = (newValue: Dayjs | null) => {
    let formattedDate;
    if (newValue !== null) {
      formattedDate = newValue.format('YYYY-MM-DD');
    }
    return formattedDate;
  };

  useEffect(() => {
    dispatch({
      type: `${manageInvoiceActions.getListInvoicePending}_saga`,
    });
  }, []);

  useEffect(() => {
    dispatch({
      type: `${manageStatisticalActions.getListStatisticalPending}_saga`,
      payload: {
        collection: 'reservation',
        start_date: handleDateChange(valueDate),
        type: typeDate,
      },
    });
  }, [valueDate, typeDate]);

  useEffect(() => {
    setTotalPrice(handleTotalPrice(invoicesState));
    setListInvoices(invoicesState);
  }, [invoicesState]);

  useEffect(() => {
    handleBuildData(listStatisticalState);
  }, [listStatisticalState]);

  return (
    <>
      <Box component="section" sx={{ p: 2 }}>
        <h4 className={'d-flex align-items-center'}>
          <ArrowRightRoundedIcon /> Thống kê doanh thu
        </h4>
      </Box>

      {/*<div>Tong bill: {listInvoices.length}</div>*/}
      {/*<div>Tong doanh thu: ${totalPrice}.00</div>*/}

      <div>
        <div className={'d-flex float-end'}>
          <DatePicker
            className={'me-2'}
            value={valueDate}
            onChange={newValue => setValueDate(newValue)}
            format={'YYYY/MM/DD'}
          />
          <Autocomplete
            className={'me-2'}
            value={typeDate}
            disableClearable
            sx={{ width: 300, marginBottom: 5 }}
            options={typeOptions}
            onChange={(event, newValue) => setTypeDate(newValue)}
            renderInput={params => (
              <TextField
                {...params}
                label="Chọn thống kê theo"
                InputProps={{
                  ...params.InputProps,
                  type: 'search',
                }}
              />
            )}
          />
        </div>
        <BarChart
          series={[{ data: rows }]}
          height={350}
          xAxis={[{ data: columns, scaleType: 'band' }]}
          margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
        />
      </div>
    </>
  );
};

export default ManageStatistical;
