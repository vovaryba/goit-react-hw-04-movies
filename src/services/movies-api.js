const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = 'dc08feb60c6ae64654b90b4c6566ac10';

async function fetchWithErrorHandling(url = '', config = {}) {
  const response = await fetch(url, config);
  return response.ok
    ? await response.json()
    : Promise.reject(new Error('Not found'));
}

export function fetchTrendingMovies() {
  return fetchWithErrorHandling(
    `${BASE_URL}/trending/movie/day?api_key=${API_KEY}`,
  );
}

export function fetchMovieById(movieId) {
  return fetchWithErrorHandling(
    `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`,
  );
}

export function fetchMovieCast(movieId) {
  return fetchWithErrorHandling(
    `${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`,
  );
}

export function fetchMovieReviews(movieId) {
  return fetchWithErrorHandling(
    `${BASE_URL}/movie/${movieId}/reviews?api_key=${API_KEY}`,
  );
}

export function fetchMovieSearch(query) {
  return fetchWithErrorHandling(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&page=1`,
  );
}
