import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as moviesAPI from '../../services/movies-api';
import styles from './Reviews.module.css';

function Reviews() {
  const { slug } = useParams();
  const movieId = slug.match(/[a-z0-9]+$/)[0];
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    moviesAPI.fetchMovieReviews(movieId).then(movie => {
      if (movie.results.length === 0) {
        return;
      }

      setReviews(movie.results);
    });
  }, [movieId]);

  return (
    <>
      {reviews ? (
        <ul>
          {reviews.map(review => (
            <li key={review.id}>
              <span className={styles.author}>Author: {review.author}</span>
              <p className={styles.content}>{review.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>We don`t have any reviews for this movie.</p>
      )}
    </>
  );
}

export default Reviews;
