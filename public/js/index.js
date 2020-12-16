document.addEventListener("click", async function (e) {
  if (e.target.classList.contains("modal-detail")) {
    try {
      const movieDetail = await getMovieDetail(e.target.dataset.imdbid);
      updateUIDetail(movieDetail);
    } catch (error) {
      console.log(error);
    }
  } else if (e.target.classList.contains("search-button")) {
    try {
      const inputKeyword = document.querySelector(".input-keyword");
      const movie = await getMovie(inputKeyword.value);
      updateUI(movie);
      inputKeyword.value = "";
    } catch (Error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${Error}`,
      });
    }
  }
});

function getMovie(keyword) {
  return fetch(`https://searchmoviee.herokuapp.com/api/omdb/?s=${keyword}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.Response) throw new Error(data.Error);
      return data;
    });
}

function getMovieDetail(imdbid) {
  return fetch(`https://searchmoviee.herokuapp.com/api/omdb/?i=${imdbid}`)
    .then((res) => res.json())
    .then((data) => data);
}

function showMovie({ Poster, Title, Year, imdbID }) {
  if (Poster === "N/A")
    Poster =
      "https://safetyaustraliagroup.com.au/wp-content/uploads/2019/05/image-not-found.png";
  return `
  <div class="col-md-3 my-3">
    <div class="card">
      <img src="${Poster}" alt="image-not-available">
      <div class="card-body">
        <h5 class="card-title">${Title}</h5>
        <h6 class="card-subtittle mb-2 text-muted">${Year}</h6>
        <a href="#" class="btn btn-primary modal-detail" data-toggle="modal" data-target="#movieDetail" data-imdbid="${imdbID}">Show Detail</a>
        </div>
    </div>
  </div>
  `;
}

function showMovieDetail({
  Poster,
  Title,
  Year,
  Director,
  Actors,
  Plot,
  imdbRating,
}) {
  return `
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-3">
        <img src="${Poster}" class="img-fluid">
      </div>
      <div class="col-md">
        <ul class="list-group">
          <li class="list-group-item">
            <h4>${Title} (${Year})</h4>
          </li>
          <li class="list-group-item"><strong>Director: </strong>${Director}</li>
          <li class="list-group-item"><strong>Actors: </strong>${Actors}</li>
          <li class="list-group-item"><strong>Plot: </strong>${Plot}</li>
          <li class="list-group-item"><strong>IMDB Rating: </strong>${imdbRating}</li>
        </ul>
      </div>
    </div>
  </div>`;
}

function updateUI(movie) {
  const movieContainer = document.querySelector(".movie-container");
  movieContainer.innerHTML = movie.map((m) => showMovie(m)).join("");
}

function updateUIDetail(movieDetail) {
  const modalBody = document.querySelector(".modal-body");
  modalBody.innerHTML = showMovieDetail(movieDetail);
}
