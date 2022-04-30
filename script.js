const API_URL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=4b7dd0caaad5fa5c511bc762363e7e6c&page=1";

const IMG_PATH = "https://image.tmdb.org/t/p/w500";
const SEARCH_API =
  'https://api.themoviedb.org/3/search/movie?api_key=4b7dd0caaad5fa5c511bc762363e7e6c&query="';
const main = document.querySelector("#main");
const form = document.querySelector("#form");
const search = document.querySelector("#search");
//get inital movies
getMovies(API_URL);

async function getMovies(url) {
  const res = await fetch(url);
  const data = await res.json();
  showMovies(data.results);
  console.log(data.results);
}
function showMovies(movies) {
  main.innerHTML = "";
  movies.forEach((movie) => {
    const { original_title, poster_path, vote_average, overview } = movie;
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.innerHTML = `
    <img
      src="${IMG_PATH + poster_path}"
      alt="${original_title}"
    />
    <div class="movie-info">
      <h3>${original_title}</h3>
      <span class="${getClassByRate(vote_average)}">${vote_average}</span>
    </div>
    <div class="overview">
      <h3>Overview</h3>
      ${overview}
    </div>`;

    main.appendChild(movieEl);
  });
}
function getClassByRate(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value;

  if (searchTerm && searchTerm !== "") {
    getMovies(SEARCH_API + searchTerm);

    search.value = "";
  } else {
    window.location.reload();
  }
});
