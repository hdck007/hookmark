import React from 'react';
import { useEffect } from 'react';
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';
import { BsChevronDoubleLeft, BsChevronDoubleRight } from 'react-icons/bs';
import ReactStars from 'react-rating-stars-component';
import { AiFillLike, AiFillDislike } from 'react-icons/ai';
import baseUrl from './constants';

const AverageRatings = ({ ratings }) => {
  return (
    <div
      style={{
        padding: '10px',
      }}
    >
      <p>
        <strong>Ratings for this content</strong>
      </p>
      {console.log("This site's ratings: ", Number(ratings))}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <span
          style={{
            fontSize: '16px',
          }}
        >
          {ratings}/5
        </span>
        &nbsp;
        <ReactStars
          edit={false}
          count={5}
          size={24}
          isHalf={true}
          value={Number(ratings)}
        />
      </div>
    </div>
  );
};

const CommentComponent = ({ comment, uuid }) => {
  const [isLiked, setIsLiked] = React.useState(false);

  useEffect(() => {
    setIsLiked(comment.isLiked);
  }, [comment.isLiked]);

  const handleLikeClick = async () => {
    console.log('This runs here', comment.id, uuid);
    if (uuid) {
      console.log('This runs here', comment.id, uuid);
      if (isLiked) {
        await fetch(`${baseUrl}/comment/${comment.id}/dislike/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: uuid,
          }),
        }).then((res) => {
          if (res.status === 200) {
            setIsLiked(false);
          }
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
        }).then((res) => {
          if (res.status === 200) {
            setIsLiked(true);
          }
        });
      }
    }
  };

  return (
    <div key={'comment' + comment.id}>
      <p>{comment.data}</p>
      <p
        style={{
          fontSize: '12px',
          color: 'gray',
          position: 'relative',
          bottom: '10px',
        }}
      >
        {new Date(comment.createdAt).toLocaleDateString('en-gb')}
      </p>
      <button
        style={{
          border: 'none',
          outline: 'none',
          background: 'transparent',
          cursor: 'pointer',
          color: isLiked ? 'blue' : 'gray',
        }}
      >
        <AiFillLike onClick={handleLikeClick} />
      </button>
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

const PostComments = ({ uuid, websiteId }) => {
  const [comment, setComment] = React.useState([]);
  const [rating, setRating] = React.useState(0);
  const [isRatingsLoading, setIsRatingsLoading] = React.useState(true);

  useEffect(() => {
    // get my ratings
    if (websiteId && uuid) {
      console.log('here it is');
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
            console.log("This my site's ratings: ", data.ratings);
            setRating(Number(data.ratings));
          }
          setIsRatingsLoading(false);
        });
    }
  }, [websiteId, uuid]);

  const handleSubmit = async (e) => {
    e.preventDefault();
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
    }).then((res) => {
      if (res.status === 200) {
        setComment('');
      }
    });

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
    }).then((res) => {
      if (res.status === 201) {
        alert('Thanks for your feedback!');
      } else {
        alert('Something went wrong!');
      }
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
      <p>
        <strong>What do you think about the content</strong>
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

const Root = ({ uuid }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };
  const [isRatingsLoading, setIsRatingsLoading] = React.useState(true);
  const [isCommentsLoading, setIsCommentsLoading] = React.useState(true);
  const [comments, setComments] = React.useState([]);
  const [ratings, setRatings] = React.useState(0);
  const [websiteId, setWebsiteId] = React.useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/website/', {
      method: 'POST',
      body: JSON.stringify({
        websites: [
          {
            url: window.location.href,
          },
        ],
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => setWebsiteId(data[0].id));
  }, [isOpen]);

  useEffect(() => {
    if (websiteId && uuid) {
      fetch(`http://localhost:3000/rating/${websiteId}`)
        .then((res) => res.json())
        .then((data) => {
          setRatings(Number(data));
          setIsRatingsLoading(false);
        });
      fetch(`http://localhost:3000/comment/${websiteId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: uuid,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setComments(data);
          setIsCommentsLoading(false);
        });
    }
  }, [websiteId, uuid]);

  return (
    <>
      <button
        style={{
          position: 'fixed',
          right: '20px',
          padding: '10px',
          bottom: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '50%',
          background: 'white',
          border: 'none',
          boxShadow: '1px 1px 3px rgba(0,0,0,0.5)',
          zIndex: 100000,
        }}
        onClick={toggleDrawer}
      >
        {isOpen ? <BsChevronDoubleRight /> : <BsChevronDoubleLeft />}
      </button>
      <Drawer
        style={{
          width: '300px',
          height: '80vh',
          top: '10vh',
          borderRadius: '20px 0 0 20px',
          display: 'flex',
          flexDirection: 'column',
        }}
        open={isOpen}
        onClose={toggleDrawer}
        direction="right"
        className="bla bla bla"
      >
        {isRatingsLoading ? (
          <span>Loading...</span>
        ) : (
          <AverageRatings ratings={ratings} />
        )}
        <hr />
        {isCommentsLoading ? (
          <span>Loading...</span>
        ) : (
          <Comments uuid={uuid} comments={comments} />
        )}
        <hr />
        <PostComments uuid={uuid} websiteId={websiteId} />
      </Drawer>
    </>
  );
};

export default Root;