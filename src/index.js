import './css/styles.css';
import debounce from 'lodash.debounce';
import { fetchCountries } from './js/fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { refs } from './js/refs';

const DEBOUNCE_DELAY = 300;
refs.inputSerch.addEventListener('input',debounce(onInputName,DEBOUNCE_DELAY));


function onInputName(evt) {
    onCleanHtml()
    const inputValue = evt.target.value;
   
    if (inputValue === '') { 
        return;
    }
    const normalizeInputName = inputValue.trim();
    fetchCountries(normalizeInputName)
    .then(countries => onRenderMarkUp(countries))
    .catch(error => Notify.failure('Oops, there is no country with that name'));

};

function onRenderMarkUp(countries) {
    if (countries.length > 10) {
        Notify.info('Too many matches found. Please enter a more specific name')
    } else if (countries.length >= 2 && countries.length <= 10) {
        onRenderCountryList(countries)
    } else if (countries.length === 1) {
        onRenderOneCountry(countries);
    }
}

 function onRenderCountryList(countries) {
  const markup = countries
    .map(country => {
      return `<li>
      <img src="${country.flags.svg}" alt="Flag of ${
        country.name.official
      }" width="30" hight="20">
         <b>${country.name.official}</b>
                </li>`;
    })
    .join('');
  refs.countryList.innerHTML = markup;
}

 function onRenderOneCountry(countries) {
   const markup = countries.map((country) => {
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