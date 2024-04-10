// https://rapidapi.com/aptitudeapps/api/countries33
// https://www.worldometers.info/world-population/population-by-country/

const jsonFileLocation = "json/population.json";
const apiUrl = 'https://restcountries.com/v3.1/all';

let apiArray = [];
let jsonArray = [];
let tableArray = [];
let totalPopulation = 0;

function getCountryApi() {
    const settings = {
        async: false,
        crossDomain: true,
        url: apiUrl,
        method: 'GET',
    };

    $.ajax(settings).done(function (ajaxReturn) {
        const apiCountries = ajaxReturn.map(function (value) {
            return {
                'country': value.name.common,
                'capital': value.capital,
                'population': value.population,
                'countrycode': value.cca2,
                'flag': value.flags.png
            }
        });

        convertApiArray(apiCountries);
    });
}

function getLocalJson() {
    fetch(jsonFileLocation)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            } else {
                console.log("Network error: fetch failed");
            }
        })
        .then(function (data) {
            const jsonCountries = data.map(function (value) {
                return {
                    'country': value.country,
                    'population': value.population
                }
            });

            convertJsonArray(jsonCountries);
        })
        .catch(function (error) {
            console.log(`<p>${error}. Please try again.</p>`);
        });
}

function convertApiArray(apiCountries) {
    apiArray = [...apiCountries];
}

function convertJsonArray(jsonCountries) {
    jsonArray = [...jsonCountries];
    mergeJsonApi();
}

function mergeJsonApi() {

    jsonArray.forEach(country1 => {
        const matchingItem = apiArray.find(country2 => country2.country === country1.country);

        if (matchingItem) {
            country1.capital = matchingItem.capital;
            country1.countrycode = matchingItem.countrycode;
            country1.flag = matchingItem.flag;
        }
    });

    for (const r of jsonArray) {
        population = +r.population;
        totalPopulation += population;
        $countries.append(`${r.country} | ${r.capital} | ${population.toLocaleString(locales)} | ${r.countrycode} | ${r.flag}<br> `);
        tableArray.push({ name: r.country, code: r.countrycode, capital: r.capital, population: population.toLocaleString(locales) });
    }

    writeData();
}