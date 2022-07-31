import React from 'react';
import { AiFillLike } from 'react-icons/ai';
import Swal from 'sweetalert2';
import baseUrl from '../constants';

const CommentComponent = ({ comment, uuid }) => {
  const [isLiked, setIsLiked] = React.useState(false);

  React.useEffect(() => {
    setIsLiked(comment.isLiked);
  }, [comment.isLiked]);

  const handleLikeClick = async () => {
    if (uuid) {
      if (isLiked) {
        await fetch(`${baseUrl}/comment/${comment.id}/dislike/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: uuid,
          }),
        })
          .then((res) => {
            if (res.status === 200) {
              setIsLiked(false);
            }
          })
          .catch((err) => {
            Swal.fire({
              title: 'Error',
              text: 'Something went wrong',
              icon: 'error',
            });
          });
      } else {
        await fetch(`${baseUrl}/comment/${comment.id}/like/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: uuid,
          }),
        })
          .then((res) => {
            if (res.status === 200) {
              setIsLiked(true);
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
    }
  };

  return (
    <div key={'comment' + comment.id}>
      <p
        style={{
          fontSize: '14px',
        }}
      >
        {comment.data}
      </p>
      <p
        style={{
          fontSize: '12px',
          color: 'gray',
          position: 'relative',
          bottom: '10px',
        }}
      >
        {new Date(comment.createdAt).toLocaleDateString('en-gb')}
        &nbsp;&nbsp;
        <button
          style={{
            fontSize: '12px',
            border: 'none',
            outline: 'none',
            background: 'transparent',
            cursor: 'pointer',
            color: isLiked ? 'blue' : 'gray',
          }}
        >
          <AiFillLike onClick={handleLikeClick} />
        </button>
      </p>
    </div>
  );
};

const Comments = ({ comments, uuid }) => {
  return (
    <div
      style={{
        padding: '10px',
        flex: '1',
        overflowY: 'auto',
      }}
    >
      <p
        style={{
          position: 'sticky',
          top: '-10px',
          width: '100%',
          background: 'white',
          fontWeight: 'bold',
          fontSize: '18px',
          zIndex: 100,
        }}
      >
        Comments for this content
      </p>
      {Boolean(comments.length) &&
        comments.map((comment) => (
          <CommentComponent
            key={'comment' + comment.id + 'comp'}
            comment={comment}
            uuid={uuid}
          />
        ))}
      {!Boolean(comments.length) && <p>No comments yet</p>}
    </div>
  );
};

export default Comments;
