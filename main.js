"use strict";
//=======Year updater in footer========//
(function () {
  const data = new Date();
  const time = `${data.getFullYear()}`;
  el("#copyright").innerHTML = time;
})();
//=======Year updater in footer========//

movies.splice(9);

//=========Normalize movies==========//
const allMovies = movies.map((e) => {
  return {
    title: e.title,
    year: e.year,
    categories: e.categories,
    id: e.imdbId,
    rating: e.imdbRating,
    time: `${Math.trunc(e.runtime / 60)}h ${e.runtime % 60}m`,
    lnaguage: e.language,
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
                  <a href="#" class="btn btn-primary more-btn">Reade more</a>
                </div>
              </div>
            
        `
    );
    el('.wrapper').appendChild(card);
  });
}
renderMovies();
//==========Rendering movies to page=======//



//=======Dynamic categoies=======//
function dynamicCotegory(){
    let category = [];
    allMovies.forEach((e)=>{
        e.categories.forEach((e)=>{
            if(!category.includes(e)){
                category.push(e)
            }
        })
    })
    category.sort()
    category.forEach((e)=>{
        const option = createElement('option', 'item-cotegory', e);
        el('#select').appendChild(option);
    })
 }
dynamicCotegory();
//=======Dynamic categoies=======//



//==========Find film==========//
const findFilm = (str, rate)=>{
  return allMovies.filter((e)=>{
    return e.title.match(str && e.rating>= rate);
  })
}

el('#search-btn').addEventListener('click', ()=>{
    el('.wrapper').innerHTML="";
    const searchValue = el('#name').value.toLowerCase().trim();
    const ratingValue = el('#rating').value;
    const searchText = new RegExp(searchValue, "gi");
    const searchResult = findFilm(searchText);
    renderSearchResult(searchResult, ratingValue)
})

//==========Find film==========//


function renderSearchResult(data=[]){
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
                      <a href="#" class="btn btn-primary more-btn">Reade more</a>
                    </div>
                  </div>
                
            `
        );
        el('.wrapper').appendChild(card);
    })
}