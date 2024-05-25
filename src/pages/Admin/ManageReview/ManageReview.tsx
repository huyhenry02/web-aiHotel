import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import ArrowRightRoundedIcon from '@mui/icons-material/ArrowRightRounded';
import TableThree from '../../../layouts/components/table/TableThree';
import { manageReviewActions } from '../../../redux/slices/manageReview.slice';
import { connect } from 'react-redux';
import { IReview } from '../../../redux/types/Review/review';
import { isEmpty } from 'lodash';
import Pagination from '@mui/material/Pagination';
import { IPaginateResponse } from '../../../redux/types/page';

type IManageReviewComponent = {
  getListReviews: (payload: { per_page: number; page: number }) => void;
  reviews: IReview[];
  metaState: IPaginateResponse;
};
const ManageReview: React.FC<IManageReviewComponent> = ({
  getListReviews,
  reviews,
  metaState,
}) => {
  const [listReviewsData, setReviewSData] = useState<object[]>([]);
  const [metaData, setMetaData] = useState<IPaginateResponse>({});
  const [currentPage, setCurrentPage] = useState<number>(1);
  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setCurrentPage(value);
  };
  const buildReviewData = (data: IReview[]) => {
    let newData: object[] = [];
    if (!isEmpty(data)) {
      newData = data.map(r => {
        return {
          id: r.id,
          hotel: r.hotel?.name,
          room_type: r.room_type?.name,
          room: r.room?.code,
          user: r.user?.name,
          content: r.content,
          rating: r.rating,
        };
      });
    }
    return newData;
  };
  useEffect(() => {
    getListReviews({
      per_page: 15,
      page: currentPage,
    });
    setMetaData(metaState);
    setReviewSData(buildReviewData(reviews));
  }, [reviews, metaState]);
  console.log('metaData', metaData);
  return (
    <>
      <Box component="section" sx={{ p: 2 }}>
        <h4 className={'d-flex align-items-center'}>
          <ArrowRightRoundedIcon /> Quản lý phản hồi
        </h4>
      </Box>
      <TableThree
        columns={[
          'STT',
          'Khách sạn',
          'Loại Phòng',
          'Phòng',
          'Khách hàng',
          'Nội dung',
          'Lượng sao',
        ]}
        rows={listReviewsData}
      />
      <div className={'d-flex justify-content-center'}>
        <Pagination
          count={metaData.total_pages}
          shape="rounded"
          onChange={handleChangePage}
        />
      </div>
    </>
  );
};
const mapStateToProps = ({ manageReview }) => ({
  reviews: manageReview.reviews,
  metaState: manageReview.paginate,
  isLoading: manageReview.isLoading,
  isError: manageReview.isError,
  message: manageReview.message,
});

const mapDispatchToProps = dispatch => {
  return {
    getListReviews: payload =>
      dispatch({
        type: `${manageReviewActions.getListReviewPending}_saga`,
        payload: payload,
      }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ManageReview);
