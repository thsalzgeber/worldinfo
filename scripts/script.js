// https://rapidapi.com/aptitudeapps/api/countries33

const jsonFileLocation = "json/population.json";

const locales = 'en-US';
const $countries = $('#countries');
const $countriesNumber = $('#countries-number');
const $totalPopulation = $('#total-population');
const $totalPopulationW = $('#total-populationw');
const $countriesPopulation = $('#countries-population');
const countriesArray = [];
let countriesPopulation = [];
let totalPopulation = 0;
let totalPopulationw = 0;

fetchCountries();

const settings = {
    async: false,
    crossDomain: true,
    url: 'https://restcountries.com/v3.1/all',
    method: 'GET',
};

$.ajax(settings).done(function (ajaxReturn) {
    // console.log(ajaxReturn);

    for (const r of ajaxReturn) {
        population = +r.population;
        totalPopulation += population;
        if (r.capital === undefined) {
            countriesArray.push(`${r.name.common} / "no capital" / ${population.toLocaleString(locales)} / ${r.cca2} / ${r.flags.png}`);
            continue;
        }
        countriesArray.push(`${r.name.common} / ${r.capital[0]} / ${population.toLocaleString(locales)} / ${r.cca2} / <img src="${r.flags.png}" height="20">`);
    }
    countriesArray.sort();
});

$countriesNumber.text(countriesArray.length);
$totalPopulation.text(totalPopulation.toLocaleString(locales));

async function fetchCountries() {
    try {
        const response = await fetch(jsonFileLocation);
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        countriesPopulation = data;
        // console.log(countriesPopulation);

    } catch (error) {
        console.error('Error fetching data:', error);
    }
    // countriesPopulation.sort();
    for (const r of countriesPopulation) {
        totalPopulationw += +r.population;
        $countriesPopulation.append(`${r.country} / ${r.population} <br>`);
    }
    $totalPopulationW.text(totalPopulationw.toLocaleString(locales));
}


for (const r of countriesArray) {
    $countries.append(`${r} <br>`);
}