const searchForm = document.getElementById('search-form');
const movieList = document.getElementById('movies');
const movieDetails = document.getElementById('details');
const BASE_URL = searchForm.action;
const API_KEY = '63ca5013';

searchForm.onsubmit = handleSearch;
movieList.onclick = handleMovieClick;

async function handleSearch(event) {
  event.preventDefault();

  const query = searchForm.s.value.trim();

  const results = await searchMovies(query);

  renderMovieCards(results);
}

async function handleMovieClick(event) {
  const card = event.target.closest('.movie');
  const movieId = card.dataset.id;

  if (!movieId) return;

  const movieData = await getMovieDetails(movieId);
  
  renderMovieDetails(movieData);
}

async function searchMovies(query) {
  const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=${query}`)
  const data = await response.json();

  return data.Search;
}

async function getMovieDetails(movieId) {
  const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&i=${movieId}`)
  const data = await response.json();

  return data;
}

function renderMovieCards(movies) {
  console.log(movies);

  const movieCards = movies.map(buildMovieCard);

  movieDetails.hidden = true;
  movieList.hidden = false;
  movieList.replaceChildren(...movieCards);
  movieList.scrollIntoView({ behavior: 'smooth' });
}

function renderMovieDetails(movie) {
  console.log(movie);

  const title = document.createElement('h3');
  const year = document.createElement('p');
  const image = document.createElement('img');
  const genre = document.createElement('p');
  const director = document.createElement('p');
  const writer = document.createElement('p');
  const actors = document.createElement('p');
  const description = document.createElement('p');

  movieDetails.hidden = false;
  movieList.hidden = true;

  title.textContent = movie.Title;
  year.textContent = 'Year: ' + movie.Year;

  if (movie.Poster && movie.Poster !== 'N/A') {
    image.src = movie.Poster;
  } else {
    image.src = 'no-poster.jpg';
  }
  image.alt = movie.Title;

  genre.textContent = 'Genre: ' + movie.Genre;
  director.textContent = 'Director: ' + movie.Director;
  writer.textContent = 'Writer: ' + movie.Writer;
  actors.textContent = 'Actors: ' + movie.Actors;
  description.textContent = movie.Plot;

  movieDetails.replaceChildren(title, year, image, genre, director, writer, actors, description);
  movieDetails.scrollIntoView({ behavior: 'smooth' });
}

function buildMovieCard(movie) {
  const card = document.createElement('li');
  const title = document.createElement('h4');
  const year = document.createElement('p');
  const image = document.createElement('img');

  card.classList.add('movie');
  card.dataset.id = movie.imdbID;

  title.textContent = movie.Title;
  title.title = movie.Title;
  year.textContent = movie.Year;

  if (movie.Poster && movie.Poster !== 'N/A') {
    image.src = movie.Poster;
  } else {
    image.src = 'no-poster.jpg';
  }
  image.alt = movie.Title;
  
  card.append(title, year, image);

  return card;
}
