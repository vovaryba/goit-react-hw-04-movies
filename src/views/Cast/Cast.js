import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as moviesAPI from '../../services/movies-api';
import styles from './Cast.module.css';

function Cast() {
  const { slug } = useParams();
  const movieId = slug.match(/[a-z0-9]+$/)[0];
  const [cast, setCast] = useState(null);

  useEffect(() => {
    moviesAPI.fetchMovieCast(movieId).then(movie => setCast(movie.cast));
  }, [movieId]);

  return (
    <>
      {cast && (
        <ul className={styles.actors}>
          {cast.map(actor => (
            <li key={actor.id} className={styles.actor}>
              <img
                className={styles.profile}
                src={`https://image.tmdb.org/t/p/original${actor.profile_path}`}
                alt={actor.name}
              />
              <span className={styles.name}>{actor.name}</span>
              <br />
              Role: {actor.character}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default Cast;
