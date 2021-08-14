import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import slugify from 'slugify';
import * as moviesAPI from '../../services/movies-api';

const makeSlug = string =>
  slugify(string, {
    lower: true,
  });
function HomeView() {
  const location = useLocation();
  const [movies, setMovies] = useState(null);

  useEffect(() => {
    moviesAPI.fetchTrendingMovies().then(movies => setMovies(movies.results));
  }, []);

  return (
    <>
      <ul>
        {movies &&
          movies.map(movie => (
            <li key={movie.id}>
              <Link
                to={{
                  pathname: `/movies/${makeSlug(`${movie.title} ${movie.id}`)}`,
                  state: {
                    from: {
                      location,
                      label: 'Back to the main page',
                    },
                  },
                }}
              >
                {movie.title}
              </Link>
            </li>
          ))}
      </ul>
    </>
  );
}

export default HomeView;
