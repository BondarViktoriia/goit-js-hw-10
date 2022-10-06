const BASE_URL = 'https://restcountries.com/v2/all?fields=';
export function fetchCountries(name) {
  return  fetch(`${BASE_URL}${name}.official,capital,population,flags,languages`)
     .then(response => {
      if (!response.ok) {
        if (response.status === 404) {
          return [];
        }
        throw new Error(response.status);
      }
      return response.json();
    })
    .catch(error => {
      console.error(error);
  });
}
