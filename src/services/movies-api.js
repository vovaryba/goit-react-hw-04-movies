function fetchMovies(url, keyword, page = 1, api_key, per_page = 12) {
  return fetch(
    `${url}?q=${keyword}&page=${page}&key=${api_key}&image_type=photo&orientation=horizontal&per_page=${per_page}`,
  ).then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(
      new Error(`Нет картинки с кодовым словом ${keyword}`),
    );
  });
}

const api = { fetchMovies };

export default api;
