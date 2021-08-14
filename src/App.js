import { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import AppBar from './components/AppBar/AppBar';

const HomeView = lazy(() =>
  import('./views/HomeView/HomeView.js' /* webpackChunkName: "home-view" */),
);
const MovieDetailView = lazy(() =>
  import(
    './views/MovieDetailView/MovieDetailView.js' /* webpackChunkName: "movie-detail-view" */
  ),
);
const MoviesView = lazy(() =>
  import(
    './views/MoviesView/MoviesView.js' /* webpackChunkName: "movies-view" */
  ),
);
const NotFoundView = lazy(() =>
  import(
    './views/NotFoundView/NotFoundView.js' /* webpackChunkName: "not-found-view" */
  ),
);

function App() {
  return (
    <>
      <AppBar />
      <Suspense fallback={<h1>Loading...</h1>}>
        <Switch>
          <Route path="/" exact>
            <HomeView />
          </Route>

          <Route path="/movies" exact>
            <MoviesView />
          </Route>

          <Route path="/movies/:slug">
            <MovieDetailView />
          </Route>

          <Route>
            <NotFoundView />
          </Route>
        </Switch>
      </Suspense>
    </>
  );
}

export default App;
