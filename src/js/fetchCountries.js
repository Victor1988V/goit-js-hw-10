export function fetchCountries(name) {
  fetch(
    'https://restcountries.com/v2/all?fields=name.official,capital,population,flags.svg,languages '
  )
    .then(response => {
      return response.json();
    })
    .then(name => {
      console.log(name);
    })
    .catch(error => {
      console.log(error);
    });
}
