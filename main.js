"use strict";
//=======Year updater in footer========//
(function () {
  const data = new Date();
  const time = `${data.getFullYear()}`;
  el("#copyright").innerHTML = time;
})();
//=======Year updater in footer========//

movies.splice(50);

//=========Normalize movies==========//
const allMovies = movies.map((e) => {
  return {
    title: e.title,
    year: e.year,
    categories: e.categories,
    id: e.imdbId,
    rating: e.imdbRating,
    time: `${Math.trunc(e.runtime / 60)}h ${e.runtime % 60}m`,
    language: e.language,
    youtube: `https://www.youtube.com/embed/${e.youtubeId}`,
    summary: e.summary,
    smallImg: e.smallThumbnail,
    largeImg: e.bigThumbnail,
  };
});
//=========Normalize movies==========//

//==========Rendering movies to page=======//
function renderMovies() {
  allMovies.forEach((e) => {
    const card = createElement(
      "div",
      "card shadow p-2",
      `
              <img src="${e.largeImg}" class="card-img" alt="img">
              <div class="card-body">
                <h4 class="card-title">${e.title}</h4>
                <ul class="card-text">
                  <li><strong>Year: </strong>${e.year}</li>
                  <li><strong>Category: </strong>${e.categories}</li>
                  <li><strong>Rating: </strong>${e.rating}</li>
                </ul>
                <div class="btn-wrapper d-flex">
                  <a href="${e.youtube}" target="_blank" class="btn btn-danger me-2 youtube-btn">YouTube</a>
                  <a href="#" data-id=${e.id} class="btn btn-primary more-btn">Reade more</a>
                </div>
              </div>
            
        `
    );
    el(".wrapper").appendChild(card);
  });
}
renderMovies();
//==========Rendering movies to page=======//

//=======Dynamic categoies=======//
function dynamicCotegory() {
  let category = [];
  allMovies.forEach((e) => {
    e.categories.forEach((e) => {
      if (!category.includes(e)) {
        category.push(e);
      }
    });
  });
  category.sort();
  category.forEach((e) => {
    const option = createElement("option", "item-cotegory", e);
    el("#select").appendChild(option);
  });
}
dynamicCotegory();
//=======Dynamic categoies=======//

//==========Find film==========//
const findFilm = (str, rate, ctg) => {
  return allMovies.filter((e) => {
    return e.title.match(str) && e.rating >= rate && e.categories.includes(ctg);
  });
};

el("#search-btn").addEventListener("click", () => {
  el(".wrapper").innerHTML = `<span class="loader"></span>`;
  const searchValue = el("#name").value.toLowerCase().trim();
  const ratingValue = el("#rating").value;
  const searchText = new RegExp(searchValue, "gi");
  const categorySort = el("#select").value;
  const searchResult = findFilm(searchText, ratingValue, categorySort);
  const foundResult = createElement(
    "h4",
    "searchresult mt-1 text-success",
    `${searchResult.length} film found`
  );
  setTimeout(() => {
    el(".wrapper").innerHTML = "";
    renderSearchResult(searchResult);
    el(".result-display").appendChild(foundResult);
  }, 1000);
});

//==========Find film==========//

function renderSearchResult(data = []) {
  data.forEach((e) => {
    const card = createElement(
      "div",
      "card shadow p-2",
      `
                  <img src="${e.largeImg}" class="card-img" alt="img">
                  <div class="card-body">
                    <h4 class="card-title">${e.title}</h4>
                    <ul class="card-text">
                      <li><strong>Year: </strong>${e.year}</li>
                      <li><strong>Category: </strong>${e.categories}</li>
                      <li><strong>Rating: </strong>${e.rating}</li>
                    </ul>
                    <div class="btn-wrapper d-flex">
                      <a href="${e.youtube}" target="_blank" class="btn btn-danger me-2 youtube-btn">YouTube</a>
                      <a href="#" data-id=${e.id} class="btn btn-primary more-btn">Reade more</a>
                    </div>
                  </div>
                
            `
    );
    el(".wrapper").appendChild(card);
  });
}
//============ Modal window ==========//

function modalWindow(id) {
  el(".wrap").innerHTML = "";
  const filmItem = allMovies.filter((e) => {
    return e.id === id;
  });
  const data = filmItem[0];
  const contents = createElement(
    "div",
    "modal-contents",
    `
  <div class="modal-wrapper">
  <div class="modal-img">
    <img src="${data.smallImg}" alt="picture">
  </div>

  <ul class="about">
  <li><strong>Year:</strong> ${data.year}</li>
  <li><strong>Language:</strong> ${data.language}</li>
  <li><strong>Duration:</strong> ${data.time}</li>
  <li><strong>Rating:</strong> ${data.rating}</li>
</ul>
  
  
</div>
<div class="modal-info px-3">
  <h4 class="modal-title ">${data.title}</h4>
  <div class="modal-summary ">
  <p>${data.summary}</p>
  </div>
</div>
  `
  );

  el(".wrap").appendChild(contents);
}

el("#close-btn").addEventListener("click", () => {
  el(".modal-container").classList.add("d-none");
});

window.addEventListener("click", (e) => {
  if (e.target.classList.contains("more-btn")) {
    el(".modal-container").classList.remove("d-none");
    modalWindow(e.target.getAttribute("data-id"));
  }
});
//============ Modal window ==========//
