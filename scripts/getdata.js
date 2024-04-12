// https://restcountries.com/
// https://www.worldometers.info/world-population/population-by-country/

const jsonFileLocation = "json/population.json";
const apiUrl = 'https://restcountries.com/v3.1/all';

let apiArray = [];
let jsonArray = [];
let tableArray = [];
let tableArrayForSingle = [];
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
                'area': value.area,
                'countrycode': value.cca2,
                'flag': value.flags.png,
                'continents': value.continents,
                'region': value.region,
                'subregion': value.subregion,
                'maps': value.maps.googleMaps
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

    for (const r of jsonArray) {
        if (r.country === 'Czech Republic (Czechia)') r.country = 'Czechia';
        if (r.country === `Côte d'Ivoire`) r.country = 'Ivory Coast';
        if (r.country === `Congo`) r.country = 'Republic of the Congo';
        if (r.country === `State of Palestine`) r.country = 'Palestine';
        if (r.country === `Macao`) r.country = 'Macau';
        if (r.country === `Cabo Verde`) r.country = 'Cape Verde';
        if (r.country === `Sao Tome & Principe`) r.country = 'São Tomé and Príncipe';
        if (r.country === `St. Vincent & Grenadines`) r.country = 'Saint Vincent and the Grenadines';
        if (r.country === `U.S. Virgin Islands`) r.country = 'United States Virgin Islands';
        if (r.country === `Faeroe Islands`) r.country = 'Faroe Islands';
        if (r.country === `Saint Kitts & Nevis`) r.country = 'Saint Kitts and Nevis';
        if (r.country === `Turks and Caicos`) r.country = 'Turks and Caicos Islands';
        if (r.country === `Wallis & Futuna`) r.country = 'Wallis and Futuna';
        if (r.country === `Saint Barthelemy`) r.country = 'Saint Barthélemy';
        if (r.country === `Saint Pierre & Miquelon`) r.country = 'Saint Pierre and Miquelon';
        if (r.country === `Saint Helena`) r.country = 'Saint Helena, Ascension and Tristan da Cunha';
        if (r.country === `Holy See`) r.country = 'Vatican City';
    }

    mergeJsonApi();
}

function mergeJsonApi() {

    jsonArray.forEach(country1 => {
        const matchingItem = apiArray.find(country2 => country2.country === country1.country);

        if (matchingItem) {
            country1.capital = matchingItem.capital;
            country1.countrycode = matchingItem.countrycode;
            country1.currencies = matchingItem.currencies;
            country1.area = matchingItem.area;
            country1.flag = matchingItem.flag;
            country1.continents = matchingItem.continents;
            country1.subregion = matchingItem.subregion;
            country1.maps = matchingItem.maps;
        }
    });

    for (const r of jsonArray) {
        if (r.country === `Afghanistan`) r.flag = 'https://flagcdn.com/w320/af.png';
        population = +r.population;
        totalPopulation += population;
        tableArray.push({ name: r.country, code: r.countrycode, capital: r.capital, population: population, area: r.area, continents: r.continents, subregion: r.subregion });
        tableArrayForSingle.push({ name: r.country, code: r.countrycode, area: r.area.toLocaleString(locales), capital: r.capital, population: population.toLocaleString(locales), maps: r.maps, continents: r.continents, subregion: r.subregion, flag: r.flag });
    }

    writeData();
}