import { useState, useEffect, lazy, Suspense } from 'react';
import {
  useParams,
  NavLink,
  Route,
  useRouteMatch,
  useLocation,
  useHistory,
} from 'react-router-dom';
import * as moviesAPI from '../../services/movies-api';
import styles from './MovieDetailView.module.css';

const Cast = lazy(() =>
  import('../Cast/Cast.js' /* webpackChunkName: "cast" */),
);
const Reviews = lazy(() =>
  import('../Reviews/Reviews.js' /* webpackChunkName: "reviews" */),
);

function MovieDetailView() {
  const history = useHistory();
  const location = useLocation();
  const { url } = useRouteMatch();
  const { slug } = useParams();
  const movieId = slug.match(/[a-z0-9]+$/)[0];
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    if (movieId) {
      moviesAPI.fetchMovieById(movieId).then(setMovie);
    }
  }, [movieId]);

  const onGoBack = () => {
    history.push(location?.state?.from?.location ?? '/');
  };

  return (
    <>
      {movie && (
        <>
          <button type="button" onClick={onGoBack}>
            {location?.state?.from?.label ?? 'Go back'}
          </button>
          <div className={styles.main_information}>
            <img
              className={styles.poster}
              src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
              alt={movie.title}
            />
            <div>
              <h1>{movie.title}</h1>
              <p>Raiting: {movie.vote_average}</p>
              <h2>Overview</h2>
              <p>{movie.overview}</p>
              <h2>Genres</h2>
              <div className={styles.genres}>
                {movie.genres.map(genre => (
                  <p key={genre.id} className={styles.genre}>
                    {genre.name}
                  </p>
                ))}
              </div>
            </div>
          </div>
          <div>
            <p>Additional information</p>
            <ul>
              <NavLink
                to={{
                  pathname: `${url}/cast`,
                  state: {
                    from: location?.state?.from ?? '/movies',
                  },
                }}
              >
                Cast
              </NavLink>
              <br />
              <NavLink
                to={{
                  pathname: `${url}/reviews`,
                  state: {
                    from: location?.state?.from ?? '/movies',
                  },
                }}
              >
                Reviews
              </NavLink>
            </ul>
          </div>

          <Suspense fallback={<h1>Loading...</h1>}>
            <Route path="/movies/:slug/cast">
              <Cast />
            </Route>
            <Route path="/movies/:slug/reviews">
              <Reviews />
            </Route>
          </Suspense>
        </>
      )}
    </>
  );
}

export default MovieDetailView;
