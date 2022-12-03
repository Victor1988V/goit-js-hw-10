import Notiflix from 'notiflix';

export default class NewApiService {
  constructor() {
    this.searchInput = '';
  }

  fetchArticles() {
    // console.log(this);
    return fetch(
      `https://restcountries.com/v2/name/${this.searchInput}?fields=name,capital,population,flags,languages`
    )
      .then(response => {
        if (!response.ok) {
          Notiflix.Notify.failure('Oops, there is no country with that name');
        }
        return response.json();
      })
      .catch(error => {
        console.log(error);
        return error.message;
      });
  }

  get query() {
    return this.searchInput;
  }

  set query(newQuery) {
    this.searchInput = newQuery;
  }
}

// const input = document.querySelector('#search-box');

// export function fetchCountries(name) {
//   fetch(
//     'https://restcountries.com/v2/name/name?fields=name.official,capital,population,flags.svg,languages'
//   )
//     .then(response => {
//       return response.json();
//     })
//     .then(name => {
//       console.log(name);
//     })
//     .catch(error => {
//       console.log(error);
//     });
// }
