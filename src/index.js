import './css/styles.css';
// import { fetchCountries } from './js/fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import NewApiService from './js/fetchCountries';

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box');
const ul = document.querySelector('.country-list');

const newApi = new NewApiService();

input.addEventListener('input', debounce(onSearch, 300));

function onSearch(event) {
  event.preventDefault();
  newApi.query = event.target.value;
  console.log(event.target.value);

  newApi.fetchArticles().then(data => {
    console.log(data);
    ul.innerHTML = '';
    if (data.length > 10) {
      return Notiflix.Notify.info(
        'Too many matches found. Please enter a more specific name.'
      );
    }

    if (data.length >= 2) {
      ul.innerHTML += makeMarkupErr(data);
    } else {
      ul.insertAdjacentHTML('beforeend', appendMakeMarkup(data));
    }
  });
}

function appendMakeMarkup(data) {
  return data
    .map(elem => {
      return `
      <li class="country"><img class="image" src="${
        elem.flags.svg
      }" alt="flag" width="50px">${elem.name}</li>
      <li class="item space">Capital:${elem.capital}</li>
    <li class="item">Population: ${elem.population}</li>
    <li class="item">Languages: ${elem.languages
      .map(elem => elem.name)
      .join(', ')}</li>
    `;
    })
    .join('');
}

function makeMarkupErr(data) {
  return data
    .map(elem => {
      return `<li class="item"><img class="image" src="${elem.flags.svg}" alt="flag" width="50px">${elem.name}</li>`;
    })
    .join(' ');
}
// ==================================================
