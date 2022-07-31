import React from 'react';
import ReactStars from 'react-rating-stars-component';
import Swal from 'sweetalert2';
import baseUrl from '../constants';

const PostComments = ({ uuid, websiteId, refetch }) => {
  const [comment, setComment] = React.useState([]);
  const [rating, setRating] = React.useState(0);
  const [isRatingsLoading, setIsRatingsLoading] = React.useState(true);
  const [tag, setTag] = React.useState();

  React.useEffect(() => {
    // get my ratings
    if (websiteId && uuid) {
      fetch(`${baseUrl}/rating/my/${websiteId}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          userId: uuid,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data?.ratings) {
            setRating(Number(data.ratings));
          }
          setIsRatingsLoading(false);
        })
        .catch((err) => {
          Swal.fire({
            title: 'Error',
            text: 'Something went wrong',
            icon: 'error',
          });
        });
    }
  }, [websiteId, uuid]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment) {
      await fetch(`${baseUrl}/comment/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: comment,
          websiteId,
          userId: uuid,
        }),
      })
        .then((res) => {
          if (res.status === 201) {
            setComment('');
          }
        })
        .catch((err) => {
          Swal.fire({
            title: 'Error',
            text: 'Something went wrong',
            icon: 'error',
          });
        });
    }
    if (tag) {
      await fetch(`${baseUrl}/tag/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: tag,
          websiteId,
          userId: uuid,
        }),
      })
        .then((res) => {
          if (res.status === 201) {
            setTag('');
          }
        })
        .catch((err) => {
          Swal.fire({
            title: 'Error',
            text: 'Something went wrong',
            icon: 'error',
          });
        });
    }
    await fetch(`${baseUrl}/rating/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ratings: rating,
        websiteId,
        userId: uuid,
      }),
    })
      .then((res) => {
        if (res.status === 201) {
          Swal.fire({
            title: 'Success',
            text: 'Your views about the post have been submitted',
            icon: 'success',
            confirmButtonText: 'OK',
          });
          refetch((prev) => prev + 1);
        } else {
          Swal.fire({
            title: 'Error',
            text: 'Your views about the post have not been submitted',
            icon: 'error',
            confirmButtonText: 'OK',
          });
        }
      })
      .catch((err) => {
        Swal.fire({
          title: 'Error',
          text: 'Something went wrong',
          icon: 'error',
        });
      });
  };

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  return (
    <form
      style={{
        padding: '10px',
      }}
      onSubmit={handleSubmit}
    >
      <p
        style={{
          fontWeight: 'bold',
          fontSize: '18px',
        }}
      >
        What do you think about the content
      </p>
      {isRatingsLoading ? (
        <div>Loading...</div>
      ) : (
        <ReactStars
          count={5}
          size={24}
          isHalf={true}
          edit={true}
          value={rating}
          onChange={(e) => setRating(e)}
        />
      )}
      <textarea
        style={{
          width: '100%',
          border: 'none',
          resize: 'none',
          borderBottom: '1px solid gray',
          padding: '5px',
        }}
        value={comment}
        type="text"
        placeholder="Enter a comment.."
        onChange={handleChange}
      />
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <button
          style={{
            border: 'none',
            outline: 'none',
            background: 'transparent',
            color: 'blue',
            fontSize: '14px',
            padding: '0px 5px',
            cursor: 'pointer',
          }}
          type="submit"
        >
          Post
        </button>
      </div>
    </form>
  );
};

export default PostComments;
