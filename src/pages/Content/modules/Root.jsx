import React from 'react';
import { useEffect } from 'react';
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';
import { BsChevronDoubleLeft, BsChevronDoubleRight } from 'react-icons/bs';
import baseUrl from './constants';
import Swal from 'sweetalert2';
import Comments from './components/comment';
import PostComments from './components/postcomments';
import AverageRatings from './components/averageratings';

const Root = ({ uuid }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };
  const [_, refetch] = React.useState(0);
  const [isRatingsLoading, setIsRatingsLoading] = React.useState(true);
  const [isCommentsLoading, setIsCommentsLoading] = React.useState(true);
  const [comments, setComments] = React.useState([]);
  const [ratings, setRatings] = React.useState(0);
  const [websiteId, setWebsiteId] = React.useState(null);

  useEffect(() => {
    fetch(`${baseUrl}/website/`, {
      method: 'POST',
      body: JSON.stringify({
        websites: [
          {
            url: window.location.href,
            key: window.location.href,
          },
        ],
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => setWebsiteId(data[0].id))
      .catch((err) => {
        Swal.fire({
          title: 'Error',
          text: 'Something went wrong',
          icon: 'error',
        });
      });
  }, [isOpen]);

  useEffect(() => {
    if (websiteId && uuid) {
      fetch(`${baseUrl}/rating/${websiteId}`)
        .then((res) => res.json())
        .then((data) => {
          setRatings(Number(data));
          setIsRatingsLoading(false);
        })
        .catch((err) => {
          Swal.fire({
            title: 'Error',
            text: 'Something went wrong',
            icon: 'error',
          });
        });
      fetch(`${baseUrl}/comment/${websiteId}`, {
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
          setComments(data);
          setIsCommentsLoading(false);
        })
        .catch((err) => {
          Swal.fire({
            title: 'Error',
            text: 'Your comments have not been submitted',
            icon: 'error',
            confirmButtonText: 'OK',
          });
        });
    }
  }, [websiteId, uuid, _]);

  return (
    <div id="side-drawer">
      <button
        id="side-drawer-button"
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
          zIndex: 1000000000000000000000000000,
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
          zIndex: 100000,
        }}
        open={isOpen}
        onClose={toggleDrawer}
        direction="right"
        id="side-drawer-content"
      >
        {isRatingsLoading ? (
          <span>Loading...</span>
        ) : (
          <AverageRatings ratings={ratings} />
        )}
        {isCommentsLoading ? (
          <span>Loading...</span>
        ) : (
          <Comments uuid={uuid} comments={comments} />
        )}
        <PostComments refetch={refetch} uuid={uuid} websiteId={websiteId} />
      </Drawer>
    </div>
  );
};

export default Root;
