import { useState, Suspense } from 'react';
import { Link, Route, useRouteMatch, useLocation } from 'react-router-dom';
import slugify from 'slugify';
import * as moviesAPI from '../../services/movies-api';

const makeSlug = string =>
  slugify(string, {
    lower: true,
  });

function MoviesView() {
  const location = useLocation();
  const { url } = useRouteMatch();
  const [movies, setMovies] = useState(null);
  const [query, setQuery] = useState('');

  const buttonClick = () => {
    moviesAPI.fetchMovieSearch(query).then(movies => setMovies(movies.results));
  };

  const handleTagChange = event => {
    setQuery(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();

    setQuery('');
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="SearchForm">
        <input
          value={query}
          onChange={handleTagChange}
          name="query"
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search movies"
        />
        <button
          type="submit"
          className="SearchForm-button"
          onClick={buttonClick}
        >
          <span className="SearchForm-button-label">Search</span>
        </button>
      </form>

      <Suspense fallback={<h1>Loading...</h1>}>
        <Route>
          <ul>
            {movies &&
              movies.map(movie => (
                <li key={movie.id}>
                  <Link
                    to={{
                      pathname: `${url}/${makeSlug(
                        `${movie.title} ${movie.id}`,
                      )}`,
                      state: {
                        from: { location, label: 'Back to search ' },
                      },
                    }}
                  >
                    {movie.title}
                  </Link>
                </li>
              ))}
          </ul>
        </Route>
      </Suspense>
    </>
  );
}

export default MoviesView;
