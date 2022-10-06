import './css/styles.css';
var debounce = require('lodash.debounce');
import { fetchCountries } from './js/fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

const refs = {
    inputSerch: document.querySelector('input#search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info')
}

refs.inputSerch.addEventListener('input',debounce(onInputName,DEBOUNCE_DELAY));


function onInputName(evt) {
    evt.preventDefault();
    const inputValue = refs.inputSerch.value.trim();
    onCleanHtml();
    if (inputValue !== '') {
        fetchCountries(inputValue).then(foundData => {
            if (foundData > 10) {
                Notify.info("Too many matches found. Please enter a more specific name.")
            } else if (foundData === 0) {
                Notify.failure('"Oops, there is no country with that name"');
            } else if (foundData.length >= 2 && foundData.length <= 10) {
                onRenderCountryList(foundData)
            } else if (foundData === 1) {
                onRenderOneCountry(foundData);
            };
        })
    };
};
 function onRenderCountryList(countries) {
  const markup = countries
    .map(country => {
      return `<li>
      <img src="${country.flags.svg}" alt="Flag of ${
        country.name.official
      }" width="30" hight="20">
         <b>${country.name.official}</p>
                </li>`;
    })
    .join('');
  refs.countryList.innerHTML = markup;
}

function onRenderOneCountry(countries) {
      const markup = countries
        .map(country => {
          return `<li>
      <img src="${country.flags.svg}" alt="Flag of ${
            country.name.official
          }" width="30" hight="20">
         <b>${country.name.official}</b></p>
            <p><b>Capital</b>: ${country.capital}</p>
            <p><b>Population</b>: ${country.population}</p>
            <p><b>Languages</b>: ${Object.values(country.languages)} </p>
                </li>`;
        })
        .join('');
      refs.countryList.innerHTML = markup;
}
        function onCleanHtml() {
         refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = '';
   }