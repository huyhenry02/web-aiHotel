import { Button } from '@mui/material';
import { Image } from 'react-bootstrap';
import SendIcon from '@mui/icons-material/Send';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { manageReviewActions } from '../../redux/slices/manageReview.slice';
import Rating from '@mui/material/Rating';
import * as React from 'react';
import { IReview } from '../../redux/types/Review/review';
import Stack from '@mui/material/Stack';

type IReviewComponent = {
  roomId?: number;
  filterReviews: (payload: { room_id: number }) => void;
  reviews: IReview[];
  createReview: (payload: {
    room_id: number;
    content: string;
    rating: number;
  }) => void;
};
const Review: React.FC<IReviewComponent> = ({
  roomId,
  filterReviews,
  reviews,
  createReview,
}) => {
  const [formReview, setFormReview] = useState({
    room_id: roomId,
    content: '',
    rating: 0,
  });
  const handleChangeData = (col: string, val: string | number | undefined) => {
    setFormReview({
      ...formReview,
      [col]: val,
    });
  };
  const handleSubmit = () => {
    if (formReview.room_id) {
      createReview({
        room_id: formReview.room_id,
        content: formReview.content,
        rating: formReview.rating,
      });
      setFormReview({
        room_id: roomId,
        content: '',
        rating: 0,
      });
    }
  };
  useEffect(() => {
    if (roomId) {
      filterReviews({ room_id: roomId });
    }
  }, [roomId]);
  return (
    <div>
      {reviews.map((review, index) => (
        <div
          key={index}
          style={{
            display: 'flex',
            marginTop: '12px',
            borderBottom: '0.1rem solid #B3C8CF',
          }}
        >
          <Image
            src={
              'https://d11a6trkgmumsb.cloudfront.net/original/3X/d/8/d8b5d0a738295345ebd8934b859fa1fca1c8c6ad.jpeg'
            }
            roundedCircle
            fluid
            className={'image-main'}
            style={{ width: '50px', height: '50px' }}
          />
          <div style={{ marginLeft: '12px' }}>
            <div className="d-flex">
              <p style={{ fontWeight: 'bold' }}>{review.user?.name}</p>
              <p style={{ color: 'gray', marginLeft: '10px' }}>
                {review.created_at}
              </p>
            </div>
            <div className="content">
              <Rating
                name="read-only"
                value={review.rating}
                readOnly
                size="small"
              />
              <p>{review.content}</p>
            </div>
          </div>
        </div>
      ))}
      <div
        className="d-flex justify-content-between "
        style={{ marginTop: '12px' }}
      >
        <input
          placeholder="bình luận..."
          style={{
            border: '1px solid gray',
            borderRadius: '5px',
            outline: 'none',
            width: '100%',
            paddingLeft: '6px',
          }}
          onChange={e => handleChangeData('content', e.target.value)}
          value={formReview.content || ''}
        />
        <Button onClick={handleSubmit}>
          <SendIcon />
        </Button>
      </div>
      <Rating
        style={{ marginTop: '7px' }}
        name="size-small"
        size="small"
        onChange={e =>
          handleChangeData(
            'rating',
            Number((e.target as HTMLInputElement).value),
          )
        }
        value={formReview.rating || 0}
      />
    </div>
  );
};
const mapStateToProps = ({ manageReview }) => ({
  reviews: manageReview.reviews,
  isLoading: manageReview.isLoading,
  isError: manageReview.isError,
  message: manageReview.message,
});

const mapDispatchToProps = dispatch => {
  return {
    filterReviews: payload =>
      dispatch({
        type: `${manageReviewActions.filterReviewPending}_saga`,
        payload: payload,
      }),
    createReview: payload =>
      dispatch({
        type: `${manageReviewActions.createReviewPending}_saga`,
        payload: payload,
      }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Review);
