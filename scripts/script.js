// https://rapidapi.com/aptitudeapps/api/countries33
// https://www.worldometers.info/world-population/population-by-country/

const jsonFileLocation = "json/population.json";

const out01 = document.getElementById('data-output-01');

const locales = 'en-US';
const $countries = $('#countries');
const $oneCountry = $('#one-country');
const $countriesNumber = $('#countries-number');
const $totalPopulation = $('#total-population');
const $totalPopulationW = $('#total-populationw');
const $countriesPopulation = $('#countries-population');

let apiArray = [];
let jsonArray = [];
let countriesPopulation = [];
let totalPopulation = 0;
let totalPopulationw = 0;

init();

function init() {
    getLocalJson();
    getCountryApi();
}

function getCountryApi() {
    const settings = {
        async: false,
        crossDomain: true,
        url: 'https://restcountries.com/v3.1/all',
        method: 'GET',
    };

    $.ajax(settings).done(function (ajaxReturn) {

        // for (const r of ajaxReturn) {
        //     population = +r.population;
        //     totalPopulation += population;
        //     if (r.capital === undefined) {
        //         apiCountries.push(`${r.name.common} / "no capital" / ${population.toLocaleString(locales)} / ${r.cca2} / ${r.flags.png}`);
        //         continue;
        //     }
        //     apiCountries.push(`${r.name.common} / ${r.capital[0]} / ${population.toLocaleString(locales)} / ${r.cca2} / <img src="${r.flags.png}" height="20">`);
        // }
        // apiCountries.sort();

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
    // console.log("Api");
    // for (const r of apiArray) {
    //     population = +r.population;
    //     $countries.append(`${r.country} ${r.capital} ${population.toLocaleString(locales)} ${r.countrycode} ${r.flag}<br>`);
    // }
}

function convertJsonArray(jsonCountries) {
    jsonArray = [...jsonCountries];
    // console.log(tempArray);
    // console.log("Json");
    // for (const r of jsonArray) {
    //     population = +r.population;
    //     $countries.append(`${r.country} ${population.toLocaleString(locales)}<br>`);
    // }
    showOneCountry();
}
// console.log(jsonArray);

function showOneCountry() {

    for (const r of apiArray) {
        population = +r.population;
        $countries.append(`${r.country} ${r.capital} ${population.toLocaleString(locales)} ${r.countrycode} ${r.flag}<br>`);
    }
    $countries.append(`${"-".repeat(200)}<br>`);
    for (const r of jsonArray) {
        population = +r.population;
        $countries.append(`${r.country} ${population.toLocaleString(locales)}<br>`);
    }

    // for (const r of apiCountries) {
    //     console.log(r.name.common);
    //     // if (r.common.name.includes("India")) {
    //     //     console.log("found");
    //     // }
    // }

    // const uniquePairs = pairs => [...new Set(pairs.map(pair => JSON.stringify(pair)))].map(pair => JSON.parse(pair))

    // console.log(["Jenny", "Matilda", "Greta"].includes("Matilda")); // true


    // const intersection = jsonCountries(element => apiCountries(element) !== -1);
    // const intersection = [...new Set(jsonCountries.filter(element => apiCountries.includes(element)))];
    // console.log(uniquePairs);
}



