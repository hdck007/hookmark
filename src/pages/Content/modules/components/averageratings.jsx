import React from 'react';
import ReactStars from 'react-rating-stars-component';

const AverageRatings = ({ ratings }) => {
  return (
    <div
      style={{
        padding: '10px',
      }}
    >
      <p
        style={{
          fontWeight: 'bold',
          fontSize: '18px',
        }}
      >
        Ratings for this content
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

export default AverageRatings;
